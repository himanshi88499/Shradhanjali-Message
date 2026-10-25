-- ============================================================
-- શ્રદ્ધાંજલિ (Shradhanjali) - PostgreSQL / Supabase Database Schema
-- Production Ready Migration Script
-- ============================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'author',
    avatar TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Authors Table
CREATE TABLE IF NOT EXISTS authors (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role_title VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    avatar TEXT NOT NULL,
    socials JSONB DEFAULT '{}'::jsonb
);

-- 4. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    icon VARCHAR(64),
    display_order INT DEFAULT 1
);

-- 5. Tags Table
CREATE TABLE IF NOT EXISTS tags (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL
);

-- 6. Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    quote TEXT,
    featured_image TEXT NOT NULL,
    image_alt VARCHAR(255),
    category_id VARCHAR(64) REFERENCES categories(id) ON DELETE SET NULL,
    category_name VARCHAR(255),
    category_slug VARCHAR(255),
    author_id VARCHAR(64) REFERENCES authors(id) ON DELETE SET NULL,
    status VARCHAR(32) DEFAULT 'draft',
    reading_time VARCHAR(64) DEFAULT '5 મિનિટ વાંચો',
    views INT DEFAULT 0,
    tags JSONB DEFAULT '[]'::jsonb,
    message_cards JSONB DEFAULT '[]'::jsonb,
    show_table_of_contents BOOLEAN DEFAULT true,
    seo_title VARCHAR(255),
    seo_description TEXT,
    focus_keyword VARCHAR(255),
    canonical_url TEXT,
    robots_index BOOLEAN DEFAULT true,
    robots_follow BOOLEAN DEFAULT true,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Pages Table
CREATE TABLE IF NOT EXISTS pages (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    status VARCHAR(32) DEFAULT 'published',
    seo_title VARCHAR(255),
    seo_description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Menus Table
CREATE TABLE IF NOT EXISTS menu_items (
    id VARCHAR(64) PRIMARY KEY,
    menu_type VARCHAR(32) NOT NULL, -- 'header' or 'footer'
    label VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 1,
    is_external BOOLEAN DEFAULT false
);

-- 9. Media Table
CREATE TABLE IF NOT EXISTS media (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    alt_text VARCHAR(255),
    title VARCHAR(255),
    size BIGINT DEFAULT 0,
    mime_type VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(32) DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(64) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Indexes for Maximum Performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);
