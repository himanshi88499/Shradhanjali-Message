import { MetadataRoute } from 'next';
import { getPosts, getCategories, getPages } from '@/lib/db';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shradhanjalimsg.com';
  const defaultDate = new Date('2026-04-12T10:00:00.000Z');
  const posts = getPosts('published');
  const categories = getCategories();
  const pages = getPages().filter((p) => p.status === 'published');

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : defaultDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: defaultDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const pageUrls = pages.map((page) => ({
    url: page.slug === 'home' ? baseUrl : `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt ? new Date(page.updatedAt) : defaultDate,
    changeFrequency: 'monthly' as const,
    priority: page.slug === 'home' ? 1.0 : 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: defaultDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: defaultDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: defaultDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...categoryUrls,
    ...postUrls,
    ...pageUrls,
  ];
}
