export interface UserDocsItem {
  id: number
  name: string
  description?: string
  image: string | null
  size?: number
}

export interface UserDocsGetQuery {
  search?: string
}
