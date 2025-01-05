'use server'

import { SearchResult } from '@/types/search'
import { mockSearchData } from '@/lib/mock/search'

export async function searchContent(query: string): Promise<SearchResult[]> {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100))

  if (!query.trim()) {
    return []
  }

  const searchTerm = query.toLowerCase()

  // In a real app, this would be a database query
  return mockSearchData.filter(item => {
    const matchesTitle = item.title.toLowerCase().includes(searchTerm)
    const matchesDescription = item.description?.toLowerCase().includes(searchTerm)
    const matchesTags = item.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    const matchesAuthor = item.author?.name.toLowerCase().includes(searchTerm)
    const matchesHandle = item.handle?.toLowerCase().includes(searchTerm) ||
                         item.author?.handle.toLowerCase().includes(searchTerm)

    return matchesTitle || matchesDescription || matchesTags || matchesAuthor || matchesHandle
  })
}

// Optional: Type-specific search actions
export async function searchUsers(query: string): Promise<SearchResult[]> {
  const results = await searchContent(query)
  return results.filter(item => item.type === 'user')
}

export async function searchPills(query: string): Promise<SearchResult[]> {
  const results = await searchContent(query)
  return results.filter(item => item.type === 'pill')
}

export async function searchPaths(query: string): Promise<SearchResult[]> {
  const results = await searchContent(query)
  return results.filter(item => item.type === 'path')
}