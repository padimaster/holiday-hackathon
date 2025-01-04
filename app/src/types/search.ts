export interface SearchResult {
  id: string;
  type: "user" | "post" | "tag";
  name: string;
  handle?: string;
  avatar?: string;
  description?: string;
  followers?: number;
}
