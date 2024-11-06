// export const API_URL = import.meta.env.VITE_VERCEL_API_URL
export const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_VERCEL_API_URL : import.meta.env.VITE_VERCEL_TESTING_API_URL

export const CONFIG = {
  GAME_TIME: 30,
  TOTAL_ELEMENTS: 9
}

export const PATH = {
  index: '/',
  game: '/game',
  players: '/players',
  users: '/users',
  not_found: '/404',
  login: '/login'
} as const