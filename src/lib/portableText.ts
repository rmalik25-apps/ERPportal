import type {PortableTextBlock} from './types'

export function blockToPlainText(block: PortableTextBlock): string {
  if (!block?.children) return ''
  return block.children.map((child) => child.text || '').join('')
}

export function blocksToPlainParagraphs(blocks: PortableTextBlock[]): string[] {
  return (blocks || []).map(blockToPlainText).filter(Boolean)
}
