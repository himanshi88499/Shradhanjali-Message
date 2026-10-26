import fs from 'fs';
import path from 'path';
import { DatabaseSchema, Post, Category, Page, Author, User, SiteSettings, ContactSubmission, MediaItem, MenuItem } from './types';
import { initialDatabase } from './seedData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Memory cache to optimize file I/O
let cachedDb: DatabaseSchema | null = null;

function ensureDbFile(): DatabaseSchema {
  if (cachedDb) return cachedDb;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDatabase, null, 2), 'utf-8');
      cachedDb = JSON.parse(JSON.stringify(initialDatabase));
      return cachedDb!;
    }

    const data = fs.readFileSync(DB_FILE, 'utf-8');
    cachedDb = JSON.parse(data) as DatabaseSchema;
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
    return true;
  } catch (err) {
    console.error('Error saving database file:', err);
    return false;
  }
}

// ----------------- POSTS -----------------
export function getPosts(status?: 'published' | 'draft'): Post[] {
  const db = getDb();
  const list = !status ? [...db.posts] : db.posts.filter((p) => p.status === status);
  return list.sort((a, b) => {
    const timeB = new Date(b.publishedAt || b.updatedAt || 0).getTime();
    const timeA = new Date(a.publishedAt || a.updatedAt || 0).getTime();
    return timeB - timeA;
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  const db = getDb();
  return db.posts.find((p) => p.slug === slug);
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

export function savePost(post: Partial<Post> & { id?: string }): Post {
  const db = getDb();
  const index = db.posts.findIndex((p) => p.id === post.id);
  const now = new Date().toISOString();

  if (index >= 0) {
    const existing = db.posts[index];
    const updatedPost: Post = {
      ...existing,
      ...post,
      id: existing.id,
      authorId: post.authorId || existing.authorId || 'author-1',
      publishedAt: now, // Update date when post is updated as requested
      updatedAt: now,
      views: post.views !== undefined ? post.views : existing.views || 0,
      tags: post.tags || existing.tags || ['ભાવપૂર્ણ'],
      introHeading: post.introHeading !== undefined ? post.introHeading : existing.introHeading,
      introText: post.introText !== undefined ? post.introText : existing.introText,
      messageCards: post.messageCards !== undefined ? post.messageCards : existing.messageCards || [],
      showTableOfContents: post.showTableOfContents !== undefined ? post.showTableOfContents : existing.showTableOfContents ?? true,
    };
    db.posts[index] = updatedPost;
    saveDb(db);
    return updatedPost;
  } else {
    const newPost: Post = {
      id: post.id || `post-${Date.now()}`,
      title: post.title || '',
      slug: post.slug || `post-${Date.now()}`,
      excerpt: post.excerpt || '',
      introHeading: post.introHeading || '',
      introText: post.introText || '',
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

export function deletePost(id: string): boolean {
  const db = getDb();
  const initialLen = db.posts.length;
  db.posts = db.posts.filter((p) => p.id !== id);
  if (db.posts.length !== initialLen) {
    saveDb(db);
    return true;
  }
  return false;
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
  return db.pages;
}

export function getPageBySlug(slug: string): Page | undefined {
  const db = getDb();
  return db.pages.find((p) => p.slug === slug);
}

export function savePage(page: Page): Page {
  const db = getDb();
  const index = db.pages.findIndex((p) => p.id === page.id || p.slug === page.slug);
  if (index >= 0) {
    db.pages[index] = { ...page, updatedAt: new Date().toISOString() };
  } else {
    db.pages.push({
      ...page,
      id: page.id || `page-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    });
  }
  saveDb(db);
  return page;
}

// ----------------- AUTHORS -----------------
export function getAuthors(): Author[] {
  const db = getDb();
  return db.authors;
}

export function getAuthorById(id?: string): Author | undefined {
  const db = getDb();
  if (!id) return db.authors[0];
  return db.authors.find((a) => a.id === id) || db.authors[0];
}

// ----------------- SETTINGS & MENUS -----------------
export function getSettings(): SiteSettings {
  const db = getDb();
  return db.settings;
}

export function updateSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = getDb();
  db.settings = { ...db.settings, ...settings };
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
  return db.media || [];
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
