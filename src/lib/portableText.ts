import type {PortableTextBlock} from './types'

export type RichContentBlock =
  | {type: 'heading'; text: string}
  | {type: 'paragraph'; text: string}
  | {type: 'list'; items: string[]}

export function blockToPlainText(block: PortableTextBlock): string {
  if (!block?.children) return ''
  return block.children.map((child) => child.text || '').join('')
}

export function blocksToPlainParagraphs(blocks: PortableTextBlock[]): string[] {
  return (blocks || []).map(blockToPlainText).filter(Boolean)
}

export function blocksToRichContent(blocks: PortableTextBlock[]): RichContentBlock[] {
  const lines = blocksToPlainParagraphs(blocks)
  const content: RichContentBlock[] = []
  let currentList: string[] = []

  const flushList = () => {
    if (!currentList.length) return
    content.push({type: 'list', items: currentList})
    currentList = []
  }

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushList()
      content.push({type: 'heading', text: line.replace(/^##\s+/, '').trim()})
      continue
    }

    if (line.startsWith('• ')) {
      currentList.push(line.replace(/^•\s+/, '').trim())
      continue
    }

    flushList()
    content.push({type: 'paragraph', text: line})
  }

  flushList()
  return content
}
