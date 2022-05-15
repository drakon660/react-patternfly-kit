import { useAppSelector } from '@app/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser, selectUserNamePasswordValid } from '../features/auth/authSlice'

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser)

  return useMemo(() => ({ user }), [user])
}

export const useUserNamePassword = () => {
  const userNamePassword = useAppSelector(selectUserNamePasswordValid)
  return useMemo(() => (userNamePassword), [userNamePassword])
}