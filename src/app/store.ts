import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { api } from './services/auth'
import authReducer from './features/auth/authSlice'

export type AuthState = {
  // user: User | null
  token: string | null
}


export const store = configureStore({
  reducer: {    
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState : { auth: { token:localStorage.getItem("token") } }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
