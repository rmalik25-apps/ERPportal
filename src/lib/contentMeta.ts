import {blocksToPlainParagraphs} from './portableText'
import type {BaseDoc} from './types'

export function estimateReadTimeMinutes(doc: Pick<BaseDoc, 'body' | 'excerpt'>) {
  const paragraphs = blocksToPlainParagraphs(doc.body || [])
  const text = [doc.excerpt || '', ...paragraphs].join(' ').trim()
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0
  return Math.max(1, Math.ceil(words / 180))
}

export function formatPublishDate(value: string) {
  return new Date(value).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).replace(/\s/g, '-')
}

export function sortByPublishedDateDesc<T extends {publishedAt: string}>(items: T[]) {
  return [...items].sort((a, b) => {
    const aTime = new Date(a.publishedAt).getTime()
    const bTime = new Date(b.publishedAt).getTime()
    return bTime - aTime
  })
}
