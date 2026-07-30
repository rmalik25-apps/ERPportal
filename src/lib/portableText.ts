import type {PortableTextBlock} from './types'
import {isInternalResearchLine} from './publicCopy'

export type RichContentBlock =
  | {type: 'heading'; text: string}
  | {type: 'paragraph'; text: string}
  | {type: 'list'; items: string[]}
  | {type: 'orderedList'; items: string[]}

export function blockToPlainText(block: PortableTextBlock): string {
  if (!block?.children) return ''
  return block.children.map((child) => child.text || '').join('')
}

export function blocksToPlainParagraphs(blocks: PortableTextBlock[]): string[] {
  return (blocks || []).map(blockToPlainText).filter(Boolean)
}

export function blocksToRichContent(blocks: PortableTextBlock[]): RichContentBlock[] {
  const lines = blocksToPlainParagraphs(blocks).filter((line) => !isInternalResearchLine(line))
  const content: RichContentBlock[] = []
  let currentList: string[] = []
  let currentOrderedList: string[] = []

  const flushList = () => {
    if (!currentList.length) return
    content.push({type: 'list', items: currentList})
    currentList = []
  }

  const flushOrderedList = () => {
    if (!currentOrderedList.length) return
    content.push({type: 'orderedList', items: currentOrderedList})
    currentOrderedList = []
  }

  const flushLists = () => {
    flushList()
    flushOrderedList()
  }

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushLists()
      content.push({type: 'heading', text: line.replace(/^##\s+/, '').trim()})
      continue
    }

    if (line.startsWith('• ')) {
      const item = line.replace(/^•\s+/, '').trim()
      const orderedItem = item.match(/^\d+\.\s+(.+)$/)
      if (orderedItem) {
        flushList()
        currentOrderedList.push(orderedItem[1].trim())
      } else {
        flushOrderedList()
        currentList.push(item)
      }
      continue
    }

    flushLists()
    content.push({type: 'paragraph', text: line})
  }

  flushLists()
  return content
}
