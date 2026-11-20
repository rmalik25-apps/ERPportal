import type {APIRoute} from 'astro'
import {getComparisons, getGuides, getPosts} from '../lib/sanity'

const origin = 'https://erpsearch.com.au'
const xml = (value: string) => value.replace(/[<>&"']/g, (char) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
}[char]!))

// Each substantive revision is a distinct feed item so existing guides can
// appear in the newsletter when refreshed, not only when first published.
export const GET: APIRoute = async () => {
  const groups = await Promise.all([getGuides(), getComparisons(), getPosts()])
  const sections = ['guides', 'compare', 'blog']
  const now = Date.now()
  const items = groups.flatMap((docs, index) => docs.map((doc) => ({
    ...doc,
    url: `${origin}/${sections[index]}/${doc.slug}/`,
    date: new Date(doc.updatedAt || doc.publishedAt),
    section: sections[index],
  }))).filter((doc) => !doc.seo?.noIndex && Number.isFinite(doc.date.getTime()) && doc.date.getTime() <= now)
    .sort((a, b) => b.date.getTime() - a.date.getTime() || a.url.localeCompare(b.url))
    .slice(0, 20)

  const entries = items.map((doc) => `<item>
<title>${xml(doc.title)}</title>
<link>${xml(doc.url)}</link>
<guid isPermaLink="false">${xml(`${doc.url}#revision-${doc.date.toISOString()}`)}</guid>
<pubDate>${doc.date.toUTCString()}</pubDate>
<description>${xml(doc.excerpt)}</description>
<category>${doc.updatedAt && doc.updatedAt > doc.publishedAt ? 'Updated' : 'New'} ${doc.section === 'compare' ? 'comparison' : doc.section === 'guides' ? 'guide' : 'article'}</category>
</item>`).join('\n')

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>ERP Search Weekly Brief</title>
<link>${origin}/</link>
<description>Practical ERP guides, comparisons and buyer advice for Australia and New Zealand.</description>
<language>en-AU</language>
<atom:link href="${origin}/updates.xml" rel="self" type="application/rss+xml"/>
${items.length ? `<lastBuildDate>${items[0].date.toUTCString()}</lastBuildDate>` : ''}
${entries}
</channel></rss>`, {headers: {'Content-Type': 'application/rss+xml; charset=utf-8'}})
}
