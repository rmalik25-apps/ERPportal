import type {APIRoute} from 'astro'

import {estimateReadTimeMinutes} from '../lib/contentMeta'
import {blocksToPlainParagraphs} from '../lib/portableText'
import {getComparisons, getGuides, getPosts} from '../lib/sanity'

export const GET: APIRoute = async () => {
  const [guides, comparisons, posts] = await Promise.all([getGuides(), getComparisons(), getPosts()])

  const items = [
    ...guides.map((guide) => ({
      title: guide.title,
      kind: guide.intent || 'Guide',
      section: 'Guide',
      href: `/guides/${guide.slug}/`,
      excerpt: guide.excerpt,
      publishedAt: guide.publishedAt,
      readTime: estimateReadTimeMinutes(guide),
      searchableText: [guide.title, guide.excerpt, ...blocksToPlainParagraphs(guide.body)].join(' '),
    })),
    ...comparisons.map((item) => ({
      title: item.title,
      kind: `${item.leftProduct} vs ${item.rightProduct}`,
      section: 'Comparison',
      href: `/compare/${item.slug}/`,
      excerpt: item.excerpt,
      publishedAt: item.publishedAt,
      readTime: estimateReadTimeMinutes(item),
      searchableText: [item.title, item.excerpt, item.leftProduct, item.rightProduct, ...blocksToPlainParagraphs(item.body)].join(' '),
    })),
    ...posts.map((post) => ({
      title: post.title,
      kind: post.category,
      section: 'Blog',
      href: `/blog/${post.slug}/`,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      readTime: estimateReadTimeMinutes(post),
      searchableText: [post.title, post.excerpt, post.category, ...blocksToPlainParagraphs(post.body)].join(' '),
    })),
  ]

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
