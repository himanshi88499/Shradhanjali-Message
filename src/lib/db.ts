import fs from 'fs';
import path from 'path';
import { DatabaseSchema, Post, Category, Page, Author, User, SiteSettings, ContactSubmission, MediaItem, MenuItem } from './types';
import { initialDatabase } from './seedData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Memory cache to optimize file I/O
// Memory cache with mtime check to always keep data in sync
let cachedDb: DatabaseSchema | null = null;
let lastDbMtime = 0;

function ensureDbFile(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDatabase, null, 2), 'utf-8');
      cachedDb = JSON.parse(JSON.stringify(initialDatabase));
      lastDbMtime = fs.statSync(DB_FILE).mtimeMs;
      return cachedDb!;
    }

    const currentMtime = fs.statSync(DB_FILE).mtimeMs;
    if (cachedDb && currentMtime === lastDbMtime) {
      return cachedDb;
    }

    const data = fs.readFileSync(DB_FILE, 'utf-8');
    cachedDb = JSON.parse(data) as DatabaseSchema;
    lastDbMtime = currentMtime;

    // Ensure pages array is always populated and saved
    let needPersist = false;
    if (!cachedDb || !Array.isArray(cachedDb.pages) || cachedDb.pages.length === 0) {
      cachedDb.pages = JSON.parse(JSON.stringify(initialDatabase.pages));
      needPersist = true;
    } else {
      // Ensure seed pages and their default metadata exist if not customized
      initialDatabase.pages.forEach((seedPage) => {
        const found = cachedDb!.pages.find((p) => p.slug === seedPage.slug || p.id === seedPage.id);
        if (!found) {
          cachedDb!.pages.push(JSON.parse(JSON.stringify(seedPage)));
          needPersist = true;
        } else {
          if (!found.metadata) {
            found.metadata = JSON.parse(JSON.stringify(seedPage.metadata || {}));
            needPersist = true;
          } else if (seedPage.slug === 'about') {
            if (!found.metadata.teamMembers || found.metadata.teamMembers.length === 0) {
              found.metadata.teamMembers = JSON.parse(JSON.stringify(seedPage.metadata?.teamMembers || []));
              needPersist = true;
            }
            if (!found.metadata.teamTitle) {
              found.metadata.teamTitle = seedPage.metadata?.teamTitle || 'અમારી ટીમ';
              needPersist = true;
            }
            if (!found.metadata.teamSubtitle) {
              found.metadata.teamSubtitle =
                seedPage.metadata?.teamSubtitle ||
                'અહીં અમને આ વિશેષ કાર્યમાં મદદ કરનાર, પ્રેરણા આપનાર અને સાથ આપનાર અમારા તમામ ટીમ મેમ્બરની માહિતી છે.';
              needPersist = true;
            }
          }
        }
      });
    }

    if (needPersist) {
      fs.writeFileSync(DB_FILE, JSON.stringify(cachedDb, null, 2), 'utf-8');
      lastDbMtime = fs.statSync(DB_FILE).mtimeMs;
    }

    return cachedDb;
  } catch (err) {
    console.error('Error reading database file:', err);
    return initialDatabase;
  }
}

export function getDb(): DatabaseSchema {
  return ensureDbFile();
}

export function saveDb(data: DatabaseSchema): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    cachedDb = data;
    lastDbMtime = fs.statSync(DB_FILE).mtimeMs;
    return true;
  } catch (err) {
    console.error('Error saving database file:', err);
    return false;
  }
}

// ----------------- POSTS -----------------
export function getPosts(status?: 'published' | 'draft' | 'trash' | 'all'): Post[] {
  const db = getDb();
  let list = [...db.posts];
  if (status === 'published' || status === 'draft' || status === 'trash') {
    list = list.filter((p) => p.status === status);
  } else if (status !== 'all') {
    // Default excludes trash
    list = list.filter((p) => p.status !== 'trash');
  }
  return list.sort((a, b) => {
    const timeB = new Date(b.publishedAt || b.updatedAt || 0).getTime();
    const timeA = new Date(a.publishedAt || a.updatedAt || 0).getTime();
    return timeB - timeA;
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  const db = getDb();
  return db.posts.find((p) => p.slug === slug && p.status !== 'trash');
}

export function getPostById(id: string): Post | undefined {
  const db = getDb();
  return db.posts.find((p) => p.id === id);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  const db = getDb();
  const category = db.categories.find((c) => c.slug === categorySlug);
  if (!category) return [];
  return db.posts.filter((p) => p.categoryId === category.id && p.status === 'published');
}

export function searchPosts(query: string): Post[] {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  const db = getDb();
  return db.posts.filter(
    (p) =>
      p.status === 'published' &&
      (p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.messageCards?.some((m) => m.text.toLowerCase().includes(q)))
  );
}

function autoExtractExcerpt(content?: string, introText?: string, existingExcerpt?: string): string {
  if (existingExcerpt && existingExcerpt.trim()) return existingExcerpt.trim();
  const raw = (introText && introText.trim()) ? introText.trim() : (content || '');
  const clean = raw
    .replace(/:::card[\s\S]*?:::/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/#{1,6}\s+[^\n]*/g, '')
    .replace(/[*_~`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return '';
  return clean.length <= 150 ? clean : clean.slice(0, 147).trim() + '...';
}

export function savePost(post: Partial<Post> & { id?: string }): Post {
  const db = getDb();
  const index = db.posts.findIndex((p) => p.id === post.id);
  const now = new Date().toISOString();

  if (index >= 0) {
    const existing = db.posts[index];
    const derivedExcerpt = autoExtractExcerpt(post.content || existing.content, post.introText || existing.introText, post.excerpt || existing.excerpt);
    const updatedPost: Post = {
      ...existing,
      ...post,
      id: existing.id,
      excerpt: derivedExcerpt,
      authorId: post.authorId || existing.authorId || 'author-1',
      publishedAt: now, // Update date when post is updated as requested
      updatedAt: now,
      views: post.views !== undefined ? post.views : existing.views || 0,
      tags: post.tags || existing.tags || ['ભાવપૂર્ણ'],
      introHeading: post.introHeading !== undefined ? post.introHeading : existing.introHeading,
      introText: post.introText !== undefined ? post.introText : existing.introText,
      cardsH2Heading: post.cardsH2Heading !== undefined ? post.cardsH2Heading : existing.cardsH2Heading,
      cardsParagraph: post.cardsParagraph !== undefined ? post.cardsParagraph : existing.cardsParagraph,
      messageCards: post.messageCards !== undefined ? post.messageCards : existing.messageCards || [],
      showTableOfContents: post.showTableOfContents !== undefined ? post.showTableOfContents : existing.showTableOfContents ?? true,
    };
    db.posts[index] = updatedPost;
    saveDb(db);
    return updatedPost;
  } else {
    const derivedExcerpt = autoExtractExcerpt(post.content, post.introText, post.excerpt);
    const newPost: Post = {
      id: post.id || `post-${Date.now()}`,
      title: post.title || '',
      slug: post.slug || `post-${Date.now()}`,
      excerpt: derivedExcerpt,
      introHeading: post.introHeading || '',
      introText: post.introText || '',
      cardsH2Heading: post.cardsH2Heading || '',
      cardsParagraph: post.cardsParagraph || '',
      content: post.content || '',
      quote: post.quote || '',
      featuredImage: post.featuredImage || '/images/hero-candle.jpg',
      imageAlt: post.imageAlt || post.title || '',
      categoryId: post.categoryId || 'cat-1',
      categoryName: post.categoryName || 'શ્રદ્ધાંજલિ સંદેશ',
      categorySlug: post.categorySlug || 'shradhanjali',
      authorId: post.authorId || 'author-1',
      status: post.status || 'published',
      views: 0,
      publishedAt: now,
      updatedAt: now,
      tags: post.tags || ['ભાવપૂર્ણ'],
      messageCards: post.messageCards || [],
      showTableOfContents: post.showTableOfContents ?? true,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      focusKeyword: post.focusKeyword,
      canonicalUrl: post.canonicalUrl,
    };
    db.posts.unshift(newPost);
    saveDb(db);
    return newPost;
  }
}

export function deletePost(id: string, permanent = false): boolean {
  const db = getDb();
  const index = db.posts.findIndex((p) => p.id === id);
  if (index === -1) return false;

  if (permanent) {
    db.posts.splice(index, 1);
    saveDb(db);
    return true;
  }

  // Soft delete to trash
  db.posts[index].status = 'trash';
  db.posts[index].updatedAt = new Date().toISOString();
  saveDb(db);
  return true;
}

export function restorePost(id: string): boolean {
  const db = getDb();
  const index = db.posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  db.posts[index].status = 'draft';
  db.posts[index].updatedAt = new Date().toISOString();
  saveDb(db);
  return true;
}

// ----------------- CATEGORIES -----------------
export function getCategories(): Category[] {
  const db = getDb();
  return db.categories.sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const db = getDb();
  return db.categories.find((c) => c.slug === slug);
}

export function saveCategory(cat: Category): Category {
  const db = getDb();
  const index = db.categories.findIndex((c) => c.id === cat.id);
  if (index >= 0) {
    db.categories[index] = cat;
  } else {
    db.categories.push({
      ...cat,
      id: cat.id || `cat-${Date.now()}`,
      order: cat.order || db.categories.length + 1,
    });
  }
  saveDb(db);
  return cat;
}

export function deleteCategory(id: string): boolean {
  const db = getDb();
  db.categories = db.categories.filter((c) => c.id !== id);
  saveDb(db);
  return true;
}

// ----------------- PAGES -----------------
export function getPages(): Page[] {
  const db = getDb();
  return Array.isArray(db.pages) ? db.pages : [];
}

export function getPageBySlug(slug: string): Page | undefined {
  const pages = getPages();
  return pages.find((p) => p.slug === slug || p.id === slug);
}

export function savePage(page: Page): Page {
  const db = getDb();
  if (!Array.isArray(db.pages)) {
    db.pages = [];
  }
  const index = db.pages.findIndex((p) => p.id === page.id || p.slug === page.slug);
  const existing = index >= 0 ? db.pages[index] : undefined;

  const updatedPage: Page = {
    ...(existing || {}),
    ...page,
    metadata: {
      ...(existing?.metadata || {}),
      ...(page.metadata || {}),
    },
    id: page.id || existing?.id || `page-${page.slug || Date.now()}`,
    slug: page.slug || existing?.slug || 'page',
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    db.pages[index] = updatedPage;
  } else {
    db.pages.push(updatedPage);
  }
  saveDb(db);
  return updatedPage;
}

// ----------------- AUTHORS -----------------
export function getAuthors(): Author[] {
  const db = getDb();
  return db.authors;
}

export function getAuthorById(id?: string): Author | undefined {
  const db = getDb();
  if (!db.authors || db.authors.length === 0) return undefined;
  if (!id) return db.authors[0];
  return db.authors.find((a) => a.id === id) || db.authors[0];
}

export function saveAuthor(author: Author): Author {
  const db = getDb();
  if (!db.authors) db.authors = [];
  const targetId = author.id || 'author-1';
  const index = db.authors.findIndex((a) => a.id === targetId);
  if (index >= 0) {
    db.authors[index] = {
      ...db.authors[index],
      ...author,
      id: targetId,
      socials: {
        ...(db.authors[index].socials || {}),
        ...(author.socials || {}),
      },
    };
    saveDb(db);
    return db.authors[index];
  } else {
    const newAuthor: Author = {
      ...author,
      id: targetId,
    };
    db.authors.push(newAuthor);
    saveDb(db);
    return newAuthor;
  }
}

export function deleteAuthor(id: string): boolean {
  const db = getDb();
  if (!db.authors) return false;
  const index = db.authors.findIndex((a) => a.id === id);
  if (index === -1) return false;
  db.authors.splice(index, 1);
  saveDb(db);
  return true;
}

// ----------------- SETTINGS & MENUS -----------------
export function getSettings(): SiteSettings {
  const db = getDb();
  return db.settings;
}

export function updateSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = getDb();
  db.settings = {
    ...db.settings,
    ...settings,
    technical: {
      ...(db.settings.technical || {}),
      ...(settings.technical || {}),
    },
    socials: {
      ...(db.settings.socials || {}),
      ...(settings.socials || {}),
    },
  };
  saveDb(db);
  return db.settings;
}

export function getMenus(): { header: MenuItem[]; footer: MenuItem[] } {
  const db = getDb();
  return {
    header: db.headerMenu.sort((a, b) => a.order - b.order),
    footer: db.footerMenu.sort((a, b) => a.order - b.order),
  };
}

export function updateMenus(header: MenuItem[], footer: MenuItem[]) {
  const db = getDb();
  db.headerMenu = header;
  db.footerMenu = footer;
  saveDb(db);
}

// ----------------- CONTACT SUBMISSIONS -----------------
export function getContactSubmissions(): ContactSubmission[] {
  const db = getDb();
  return db.contactSubmissions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addContactSubmission(
  sub: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>
): ContactSubmission {
  const db = getDb();
  const newSub: ContactSubmission = {
    ...sub,
    id: `sub-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'unread',
  };
  db.contactSubmissions.unshift(newSub);
  saveDb(db);
  return newSub;
}

export function updateContactStatus(id: string, status: 'unread' | 'read' | 'replied'): boolean {
  const db = getDb();
  const sub = db.contactSubmissions.find((s) => s.id === id);
  if (sub) {
    sub.status = status;
    saveDb(db);
    return true;
  }
  return false;
}

// ----------------- USERS -----------------
export function getUsers(): User[] {
  const db = getDb();
  return db.users;
}

export function getUserByEmail(email: string): User | undefined {
  const db = getDb();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  const db = getDb();
  return db.users.find((u) => u.id === id);
}

export function saveUser(user: User): User {
  const db = getDb();
  const index = db.users.findIndex((u) => u.id === user.id);
  if (index >= 0) {
    db.users[index] = user;
  } else {
    db.users.push(user);
  }
  saveDb(db);
  return user;
}

export function deleteUser(id: string): boolean {
  const db = getDb();
  const initial = db.users.length;
  const user = db.users.find((u) => u.id === id);
  if (!user) return false;
  const adminCount = db.users.filter((u) => u.role === 'admin').length;
  if (user.role === 'admin' && adminCount <= 1) {
    return false;
  }
  db.users = db.users.filter((u) => u.id !== id);
  if (db.users.length !== initial) {
    saveDb(db);
    return true;
  }
  return false;
}

// ----------------- MEDIA -----------------
export function getMedia(): MediaItem[] {
  const db = getDb();
  if (!db.media) db.media = [];

  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      let changed = false;
      for (const f of files) {
        if (f.startsWith('.') || f === '.gitkeep') continue;
        const url = `/uploads/${f}`;
        if (!db.media.some((m) => m.url === url)) {
          const stats = fs.statSync(path.join(uploadsDir, f));
          const ext = path.extname(f).toLowerCase();
          const cleanTitle = f.replace(/^\d+-/, '').replace(/\.[^.]+$/, '');
          const item: MediaItem = {
            id: `med-${stats.birthtimeMs || Date.now()}-${f}`,
            name: f,
            url,
            altText: cleanTitle,
            title: cleanTitle,
            size: stats.size,
            mimeType: ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : ext === '.svg' ? 'image/svg+xml' : 'image/jpeg',
            createdAt: stats.birthtime?.toISOString() || new Date().toISOString(),
          };
          db.media.unshift(item);
          changed = true;
        }
      }
      if (changed) saveDb(db);
    }
  } catch (err) {
    console.error('Error syncing uploads to media list:', err);
  }

  return db.media;
}

export function saveMedia(item: MediaItem): MediaItem {
  const db = getDb();
  if (!db.media) db.media = [];
  const index = db.media.findIndex((m) => m.id === item.id);
  if (index >= 0) {
    db.media[index] = item;
  } else {
    db.media.unshift(item);
  }
  saveDb(db);
  return item;
}

export function deleteMedia(id: string): boolean {
  const db = getDb();
  if (!db.media) return false;
  const initial = db.media.length;
  db.media = db.media.filter((m) => m.id !== id);
  if (db.media.length !== initial) {
    saveDb(db);
    return true;
  }
  return false;
}
