// export const API_URL = import.meta.env.VITE_VERCEL_API_URL
export const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_VERCEL_API_URL : import.meta.env.VITE_VERCEL_TESTING_API_URL

export const CONFIG = {
  GAME_TIME: 180,
  TOTAL_ELEMENTS: 50
}

export const PATH = {
  index: '/',
  game: '/game',
  players: '/players',
  users: '/users',
  not_found: '/404',
  login: '/login',
  quiz: '/quiz'
} as const