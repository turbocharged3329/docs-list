export interface UserDocsItem {
  id: number
  name: string
  description?: string
  image?: string
  size?: number
}

export interface UserDocsGetQuery {
  search?: string
}
