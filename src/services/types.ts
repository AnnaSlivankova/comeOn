//PLAYERS
export type Player = {
  id: string
  name: string
  surname: string
  userId:string
  totalScore: number
  gamesCount: number
  prevGamesScore: number
  createdAt: string
  updatedAt: string
}

export type Create1PlayerDto = {
  userId:string

  // name: string
  // surname: string
  gamesCount:number
  score: number
  time: number
}

export type CreatePlayerDto = {
  userId:string
}

export type UpdatePlayerDto = {
  score: number
  time: number
  userId:string
}

//USERS
export type LoginUserDto = {
  name: string
  surname: string
  password: string
}

export type User = {
  id: string
  name: string
  surname: string
  position: number
  rating: number
  createdAt: string
  updatedAt: string
}

//QUIZ
export type Question = {
  id: string;
  question: string;
  day: number;
  position: number;
  createdAt: string;
  updatedAt: string;
}
export type Answer = {
  userId: string;
  questionId: string;
  answer: string;
}
export type QuizInfo = {
  targetDate: string;
  bibleText: string;
}
export type RightAnswers = {
  question: string;
  answer: string;
  position: string;
}

//COMMON
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
