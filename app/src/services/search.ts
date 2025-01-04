import { SearchResult } from "@/types/search";

export async function searchApi(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Search failed");
    return response.json();
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
}
