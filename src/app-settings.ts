export const API_URL = import.meta.env.VITE_VERCEL_API_URL

export const CONFIG = {
  GAME_TIME: 20,
  TOTAL_ELEMENTS: 12
}

export const PATH = {
  index: '/',
  players: '/players',
  not_found: '/404'
} as const