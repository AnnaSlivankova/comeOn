import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {baseApi} from "./base-api.ts";
import {playersService} from "./players.service.ts";

export const store: any = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(baseApi.middleware),

})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)