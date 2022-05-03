import React, { useEffect } from 'react'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const { user } = useAuth();  
  console.log("private  route");
  
  useEffect(()=>{
    console.log(user);
  },[user])


  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}