import {createClient} from '@sanity/client'
import groq from 'groq'

import {mockComparisons, mockGuides, mockPosts} from './mockContent'
import type {ComparisonDoc, GuideDoc, PostDoc} from './types'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2026-02-24'

export const sanityConfigured = Boolean(projectId)

const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null

function mapBase(doc: any) {
  return {
    _id: doc._id,
    _type: doc._type,
    title: doc.title,
    slug: doc.slug?.current || '',
    excerpt: doc.excerpt || '',
    body: doc.body || [],
    publishedAt: doc.publishedAt,
    updatedAt: doc.updatedAt,
    seo: doc.seo,
  }
}

function mapGuide(doc: any): GuideDoc {
  return {...mapBase(doc), _type: 'guide', intent: doc.intent}
}

function mapComparison(doc: any): ComparisonDoc {
  return {
    ...mapBase(doc),
    _type: 'comparison',
    leftProduct: doc.leftProduct || '',
    rightProduct: doc.rightProduct || '',
    bestFor: doc.bestFor || [],
  }
}

function mapPost(doc: any): PostDoc {
  return {...mapBase(doc), _type: 'post', category: doc.category || 'General'}
}

function mergeBySlug<T extends {slug: string}>(primary: T[], secondary: T[]) {
  const seen = new Set<string>()
  const merged: T[] = []
  for (const item of [...primary, ...secondary]) {
    if (!item.slug || seen.has(item.slug)) continue
    seen.add(item.slug)
    merged.push(item)
  }
  return merged
}

function shouldUseFallbackBody(body: any) {
  return !Array.isArray(body) || body.length < 8
}

function enrichGuide(doc: GuideDoc | undefined) {
  if (!doc) return doc
  const fallback = mockGuides.find((item) => item.slug === doc.slug)
  if (!fallback) return doc
  return {
    ...fallback,
    ...doc,
    body: shouldUseFallbackBody(doc.body) ? fallback.body : doc.body,
    excerpt: doc.excerpt || fallback.excerpt,
    seo: doc.seo || fallback.seo,
  }
}

function enrichComparison(doc: ComparisonDoc | undefined) {
  if (!doc) return doc
  const fallback = mockComparisons.find((item) => item.slug === doc.slug)
  if (!fallback) return doc
  return {
    ...fallback,
    ...doc,
    body: shouldUseFallbackBody(doc.body) ? fallback.body : doc.body,
    excerpt: doc.excerpt || fallback.excerpt,
    bestFor: doc.bestFor?.length ? doc.bestFor : fallback.bestFor,
    seo: doc.seo || fallback.seo,
  }
}

function enrichPost(doc: PostDoc | undefined) {
  if (!doc) return doc
  const fallback = mockPosts.find((item) => item.slug === doc.slug)
  if (!fallback) return doc
  return {
    ...fallback,
    ...doc,
    body: shouldUseFallbackBody(doc.body) ? fallback.body : doc.body,
    excerpt: doc.excerpt || fallback.excerpt,
    seo: doc.seo || fallback.seo,
  }
}

async function fetchOrFallback<T>(
  query: string,
  fallback: T,
  map?: (value: any) => any,
  params?: Record<string, unknown>,
): Promise<T> {
  if (!client) return fallback
  try {
    const data = await client.fetch(query, params)
    if (!data) return fallback
    if (!map) return data as T
    if (Array.isArray(data)) return data.map(map) as T
    return map(data) as T
  } catch {
    return fallback
  }
}

const guideProjection = groq`{
  _id, _type, title, slug, excerpt, intent, body, publishedAt, updatedAt, seo
}`

const comparisonProjection = groq`{
  _id, _type, title, slug, excerpt, body, leftProduct, rightProduct, bestFor, publishedAt, updatedAt, seo
}`

const postProjection = groq`{
  _id, _type, title, slug, excerpt, body, category, publishedAt, updatedAt, seo
}`

export async function getGuides() {
  const fetched = await fetchOrFallback<GuideDoc[]>(
    groq`*[_type == "guide"] | order(coalesce(updatedAt, publishedAt) desc) ${guideProjection}`,
    mockGuides,
    mapGuide,
  )
  return mergeBySlug(fetched.map(enrichGuide).filter(Boolean) as GuideDoc[], mockGuides)
}

export async function getGuideBySlug(slug: string) {
  const doc = await fetchOrFallback<GuideDoc | undefined>(
    groq`*[_type == "guide" && slug.current == $slug][0] ${guideProjection}`,
    mockGuides.find((item) => item.slug === slug),
    mapGuide,
    {slug},
  )
  return enrichGuide(doc)
}

export async function getComparisons() {
  const fetched = await fetchOrFallback<ComparisonDoc[]>(
    groq`*[_type == "comparison"] | order(coalesce(updatedAt, publishedAt) desc) ${comparisonProjection}`,
    mockComparisons,
    mapComparison,
  )
  return mergeBySlug(fetched.map(enrichComparison).filter(Boolean) as ComparisonDoc[], mockComparisons)
}

export async function getComparisonBySlug(slug: string) {
  const doc = await fetchOrFallback<ComparisonDoc | undefined>(
    groq`*[_type == "comparison" && slug.current == $slug][0] ${comparisonProjection}`,
    mockComparisons.find((item) => item.slug === slug),
    mapComparison,
    {slug},
  )
  return enrichComparison(doc)
}

export async function getPosts() {
  const fetched = await fetchOrFallback<PostDoc[]>(
    groq`*[_type == "post"] | order(coalesce(updatedAt, publishedAt) desc) ${postProjection}`,
    mockPosts,
    mapPost,
  )
  return mergeBySlug(fetched.map(enrichPost).filter(Boolean) as PostDoc[], mockPosts)
}

export async function getPostBySlug(slug: string) {
  const doc = await fetchOrFallback<PostDoc | undefined>(
    groq`*[_type == "post" && slug.current == $slug][0] ${postProjection}`,
    mockPosts.find((item) => item.slug === slug),
    mapPost,
    {slug},
  )
  return enrichPost(doc)
}
