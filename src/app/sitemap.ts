import { MetadataRoute } from 'next';

const BASE_URL = 'https://macc-fm.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/services', '/careers', '/clients', '/contact'];
  const locales = ['en', 'ar'];

  const sitemapEntries = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  return sitemapEntries;
}
