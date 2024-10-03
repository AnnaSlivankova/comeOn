// export const API_URL = import.meta.env.VITE_VERCEL_API_URL
export const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_VERCEL_API_URL : import.meta.env.VITE_VERCEL_TESTING_API_URL

export const CONFIG = {
  GAME_TIME: 30,
  TOTAL_ELEMENTS: 12
}

export const PATH = {
  index: '/',
  players: '/players',
  not_found: '/404'
} as const