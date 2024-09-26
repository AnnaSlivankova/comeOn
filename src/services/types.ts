export type Player = {
  id: string
  name: string
  surname: string
  score: number
  rating: number
  time: number
  createdAt: string
  updatedAt: string
}

export type CreatePlayerDto = {
  name: string
  surname: string
  score: number
  time: number
}

export type Pagination<T> = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: T[]
}

export type QueryParams = {
  searchEmailTerm: string
  searchLoginTerm: string
  searchNameTerm: string
  searchSurnameTerm: string
  isAvailable: boolean
  sortBy: string
  sortDirection: 'asc' | 'desc'
  pageNumber: number
  pageSize: number
}
