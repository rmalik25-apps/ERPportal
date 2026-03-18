import type {APIRoute} from 'astro'
import {getComparisons, getGuides, getPosts} from '../lib/sanity'

function getSiteOrigin(url: URL) {
  const configured = import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321'
  return configured.endsWith('/') ? configured.slice(0, -1) : new URL(configured, url).toString().replace(/\/$/, '')
}

function toAbsolute(origin: string, path: string) {
  return `${origin}${path}`
}

export const GET: APIRoute = async ({url}) => {
  const origin = getSiteOrigin(url)
  const [guides, comparisons, posts] = await Promise.all([getGuides(), getComparisons(), getPosts()])
  const staticRoutes = [
    {path: '/', lastmod: new Date().toISOString()},
    {path: '/guides/'},
    {path: '/compare/'},
    {path: '/blog/'},
    {path: '/about/'},
    {path: '/privacy/'},
    {path: '/disclosure/'},
  ]

  const dynamicRoutes = [
    ...guides.map((guide) => ({path: `/guides/${guide.slug}/`, lastmod: guide.updatedAt || guide.publishedAt})),
    ...comparisons.map((item) => ({path: `/compare/${item.slug}/`, lastmod: item.updatedAt || item.publishedAt})),
    ...posts.map((post) => ({path: `/blog/${post.slug}/`, lastmod: post.updatedAt || post.publishedAt})),
  ]

  const urls = [...staticRoutes, ...dynamicRoutes]
    .map(
      (entry) => `<url><loc>${toAbsolute(origin, entry.path)}</loc>${entry.lastmod ? `<lastmod>${new Date(entry.lastmod).toISOString()}</lastmod>` : ''}</url>`,
    )
    .join('')

  const body = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
