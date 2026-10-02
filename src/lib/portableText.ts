import type {PortableTextBlock} from './types'
import {isInternalResearchLine} from './publicCopy'

export type RichContentBlock =
  | {type: 'heading'; text: string}
  | {type: 'paragraph'; text: string}
  | {type: 'quote'; text: string}
  | {type: 'list'; items: string[]}
  | {type: 'orderedList'; items: string[]}
  | {type: 'table'; headers: string[]; rows: string[][]}

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

  const parseTableCells = (line: string) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim())

  const isTableDivider = (line: string) =>
    parseTableCells(line).every((cell) => /^:?-{3,}:?$/.test(cell))

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    if (line.startsWith('## ')) {
      flushLists()
      content.push({type: 'heading', text: line.replace(/^##\s+/, '').trim()})
      continue
    }

    if (line.startsWith('> ')) {
      flushLists()
      content.push({type: 'quote', text: line.replace(/^>\s+/, '').trim()})
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

    const orderedLine = line.match(/^\d+\.\s+(.+)$/)
    if (orderedLine) {
      flushList()
      currentOrderedList.push(orderedLine[1].trim())
      continue
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      const nextLine = lines[i + 1]
      const previousBlock = content[content.length - 1]
      if (!isTableDivider(line) && nextLine?.startsWith('|') && isTableDivider(nextLine)) {
        flushLists()
        content.push({type: 'table', headers: parseTableCells(line), rows: []})
        continue
      }
      if (isTableDivider(line)) continue
      if (previousBlock?.type === 'table') {
        previousBlock.rows.push(parseTableCells(line))
        continue
      }
    }

    flushLists()
    content.push({type: 'paragraph', text: line})
  }

  flushLists()
  return content
}
