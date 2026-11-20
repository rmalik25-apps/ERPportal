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
    timeZone: 'Australia/Sydney',
  }).replace(/\s/g, '-')
}

type ContentDates = Pick<BaseDoc, 'publishedAt' | 'updatedAt'>

export function getContentDate(doc: ContentDates) {
  const published = Date.parse(doc.publishedAt)
  const updated = Date.parse(doc.updatedAt || '')
  return Number.isFinite(updated) && (!Number.isFinite(published) || updated > published)
    ? doc.updatedAt!
    : doc.publishedAt
}

export function formatContentDate(doc: ContentDates) {
  const date = getContentDate(doc)
  const label = date === doc.publishedAt ? 'Published' : 'Updated'
  return `${label} ${formatPublishDate(date)}`
}

export function sortByContentDateDesc<T extends ContentDates>(items: T[]) {
  return [...items].sort((a, b) => {
    const aTime = Date.parse(getContentDate(a))
    const bTime = Date.parse(getContentDate(b))
    return bTime - aTime
  })
}
