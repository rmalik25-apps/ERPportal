import type {AnyContentDoc, PortableTextBlock} from './types'
import {blocksToRichContent} from './portableText'

const siteOrigin = (import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321').replace(/\/$/, '')

function toAbsoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path
  return `${siteOrigin}${path.startsWith('/') ? path : `/${path}`}`
}

const overrideMap: Record<string, {metaTitle: string; metaDescription: string}> = {
  'erp-selection-checklist-smb': {
    metaTitle: 'ERP Selection Checklist for SMBs: How to Shortlist the Right System',
    metaDescription:
      'Use this ERP selection checklist for SMBs to compare vendors, run better demos, reduce implementation risk, and choose the right ERP with more confidence.',
  },
  'how-to-run-erp-rfp': {
    metaTitle: 'How to Run an ERP RFP Without Wasting Months',
    metaDescription:
      'Learn how to run an ERP RFP that gets useful vendor responses, improves shortlist quality, and avoids unnecessary project delay for growing businesses.',
  },
  'what-is-an-erp-guide': {
    metaTitle: 'What Is an ERP? A Plain-English Guide for Growing Businesses',
    metaDescription:
      'What is an ERP? This plain-English guide explains what ERP software does, when businesses need it, and how to judge whether it is the right next step.',
  },
  'spreadsheet-to-erp-migration-guide': {
    metaTitle: 'Spreadsheet to ERP Migration Guide for Growing Businesses',
    metaDescription:
      'Moving from spreadsheets to ERP? Learn how to recognise the tipping point, prepare your data, and plan a safer migration path for a growing business.',
  },
  'business-central-vs-netsuite-growing-businesses': {
    metaTitle: 'Business Central vs NetSuite for SMBs: Fit, Costs, and Trade-Offs',
    metaDescription:
      'Compare Business Central vs NetSuite for SMBs across fit, implementation complexity, finance depth, operations support, and likely cost trade-offs.',
  },
  'myob-acumatica-vs-business-central': {
    metaTitle: 'MYOB Acumatica vs Business Central for Australian SMBs',
    metaDescription:
      'Compare MYOB Acumatica vs Business Central for Australian SMBs across finance, inventory, implementation fit, support model, and growth requirements.',
  },
  'odoo-vs-business-central': {
    metaTitle: 'Odoo vs Business Central: Which ERP Fits a Growing SMB?',
    metaDescription:
      'Compare Odoo vs Business Central for growing SMBs across flexibility, control, implementation risk, support overhead, and long-term platform fit.',
  },
  'erp-for-meat-processing-generic-vs-specialist': {
    metaTitle: 'ERP for Meat Processing: Generic ERP vs Specialist Platforms',
    metaDescription:
      'Explore ERP for meat processing, including the trade-offs between generic ERP and specialist platforms for traceability, yield, QA, and plant operations.',
  },
  'is-erp-rfp-really-required': {
    metaTitle: 'Is an ERP RFP Really Required? When to Use One and When to Skip It',
    metaDescription:
      'Find out whether an ERP RFP is really required, when it adds value, and when a lighter shortlist process is faster and more effective for SMB buyers.',
  },
}

const listPageMeta = {
  guides: {
    metaTitle: 'ERP Guides for SMBs: Selection, Migration, and Implementation',
    metaDescription:
      'Browse ERP guides for SMBs covering ERP selection, migration, implementation planning, partner choice, organisational change, and post-go-live improvement.',
  },
  compare: {
    metaTitle: 'ERP Software Comparisons for SMBs: Business Central, Odoo, NetSuite, and More',
    metaDescription:
      'Compare ERP software for SMBs across fit, implementation complexity, cost trade-offs, and industry suitability, including Business Central, Odoo, NetSuite, and more.',
  },
  blog: {
    metaTitle: 'ERP Blog for SMBs: Buyer Guidance, Release Notes, and Best Practices',
    metaDescription:
      'Read the ERP blog for SMB buyers covering implementation lessons, release updates, software comparisons, and practical ERP decision support.',
  },
  home: {
    metaTitle: 'ERP Search: ERP Guidance, Comparisons, and Shortlist Support for SMBs',
    metaDescription:
      'ERP Search helps finance, operations, and IT leaders make better ERP decisions with practical guidance on selection, implementation, upgrades, and improvement.',
  },
} as const

export function getListPageMeta(key: keyof typeof listPageMeta) {
  return listPageMeta[key]
}

export function getDocMeta(doc: AnyContentDoc) {
  const override = overrideMap[doc.slug]
  return {
    metaTitle: doc.seo?.metaTitle || override?.metaTitle || doc.title,
    metaDescription: doc.seo?.metaDescription || override?.metaDescription || doc.excerpt,
  }
}

export function buildBreadcrumbSchema(items: Array<{name: string; path: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  }
}

export function toSchemaUrl(path: string) {
  return toAbsoluteUrl(path)
}

export function extractFaqSchema(blocks: PortableTextBlock[] | undefined) {
  const content = blocksToRichContent(blocks || [])
  const faqIndex = content.findIndex((block) => block.type === 'heading' && /faq/i.test(block.text))
  if (faqIndex === -1) return null

  const questions: Array<{name: string; text: string}> = []
  for (let i = faqIndex + 1; i < content.length; i += 1) {
    const block = content[i]
    if (block.type === 'heading') break
    if (block.type !== 'list') continue

    for (const item of block.items) {
      const match = item.match(/^([^?]+\?)\s*(.+)$/)
      if (!match) continue
      questions.push({name: match[1].trim(), text: match[2].trim()})
    }
  }

  if (!questions.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((entry) => ({
      '@type': 'Question',
      name: entry.name,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.text,
      },
    })),
  }
}
