import React, { useEffect } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function PrivateRoute({ children }) {
  const { user } = useAuth();  
  console.log("private  route");
  
  useEffect(()=>{
    console.log(user);
  },[user])


  // return (
    
    
  //       user ? (
  //         children
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: '/login',
  //             state: { from: location },
  //           }}
  //         />
  //       )
    
    
  // )

  if(user)
  {
    return         <Redirect
    to={{
      pathname: '/login',
      state: { from: location },
    }}
  />

  }

  return children;
}