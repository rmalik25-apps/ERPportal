export const editorialTeamName = 'ERP Search editorial team'

export const editorialMethod = 'Independent buyer guidance for growing businesses'

export function getLastReviewedDate(updatedAt?: string, publishedAt?: string) {
  return updatedAt || publishedAt || ''
}
