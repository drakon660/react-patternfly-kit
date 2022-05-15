import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { api } from './services/auth'
import authReducer from './features/auth/authSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export type AuthState = {
  // user: User | null
  token: string | null,
  userNamePasswordValid: boolean | null
}

export const store = configureStore({
  reducer: {    
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState : { auth: { token:localStorage.getItem("token"), userNamePasswordValid: null } }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;