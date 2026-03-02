export type PortableTextSpan = {
  _type: 'span'
  text: string
}

export type PortableTextBlock = {
  _type: 'block'
  _key?: string
  style?: string
  children?: PortableTextSpan[]
}

export type BaseDoc = {
  _id: string
  _type: 'guide' | 'comparison' | 'post'
  title: string
  slug: string
  excerpt: string
  body: PortableTextBlock[]
  publishedAt: string
  updatedAt?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    noIndex?: boolean
  }
}

export type GuideDoc = BaseDoc & {
  _type: 'guide'
  intent?: string
}

export type ComparisonDoc = BaseDoc & {
  _type: 'comparison'
  leftProduct: string
  rightProduct: string
  bestFor?: string[]
}

export type PostDoc = BaseDoc & {
  _type: 'post'
  category: string
}

export type AnyContentDoc = GuideDoc | ComparisonDoc | PostDoc
