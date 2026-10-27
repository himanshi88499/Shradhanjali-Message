export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor' | 'author' | 'subscriber';
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface Author {
  id: string;
  name: string;
  roleTitle: string;
  bio: string;
  avatar: string;
  boxTitle?: string;
  socials?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  order: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface MessageCard {
  id: number;
  text: string;
  category?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // rich markdown / HTML
  quote?: string;
  featuredImage: string;
  imageAlt?: string;
  categoryId: string;
  categoryName?: string;
  categorySlug?: string;
  authorId: string;
  status: 'published' | 'draft' | 'scheduled' | 'trash';
  readingTime?: string;
  views: number;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  introHeading?: string;
  introText?: string;
  cardsH2Heading?: string;
  cardsParagraph?: string;
  messageCards?: MessageCard[];
  showTableOfContents?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
}

export interface PageValueCard {
  id: string | number;
  icon?: string;
  title: string;
  description: string;
}

export interface PageTeamMember {
  id: string | number;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface PageMetaSection {
  badge?: string;
  subtitle?: string;
  heroDescription?: string;
  heroImage?: string;
  heroImageAlt?: string;
  lastUpdatedText?: string;

  // About Page Widgets
  valueCards?: PageValueCard[];
  journeyTitle?: string;
  journeyText?: string;
  missionQuote?: string;
  teamTitle?: string;
  teamSubtitle?: string;
  teamMembers?: PageTeamMember[];
  ctaHeading?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;

  // Contact Page Widgets
  phoneTitle?: string;
  phoneNumber?: string;
  phoneHours?: string;
  emailTitle?: string;
  emailAddress?: string;
  emailResponseTime?: string;
  addressTitle?: string;
  addressText?: string;
  quickChannelsTitle?: string;
  quickChannelsSubtitle?: string;
  whatsappButtonText?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  facebookButtonText?: string;
  facebookUrl?: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'published' | 'draft';
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  metadata?: PageMetaSection;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  order: number;
  isExternal?: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  altText: string;
  title: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  copyrightText: string;
  heroBadge: string;
  heroHeading: string;
  heroSubtitle: string;
  heroQuote: string;
  searchPlaceholder: string;
  infoCardsTitle: string;
  infoCards: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
  }>;
  socials: {
    facebook: string;
    twitter: string;
    youtube: string;
    instagram: string;
    telegram?: string;
    whatsappNumber?: string;
  };
  technical: {
    gaMeasurementId?: string;
    adsensePublisherId?: string;
    enableAdPlacements?: boolean;
    allowIndexing?: boolean;
    adsTxt?: string;
    searchConsoleMetaTag?: string;
    customHeaderCode?: string;
    customFooterCode?: string;
  };
}

export interface DatabaseSchema {
  users: User[];
  authors: Author[];
  categories: Category[];
  tags: Tag[];
  posts: Post[];
  pages: Page[];
  headerMenu: MenuItem[];
  footerMenu: MenuItem[];
  media: MediaItem[];
  contactSubmissions: ContactSubmission[];
  settings: SiteSettings;
}
