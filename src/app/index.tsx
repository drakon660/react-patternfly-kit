import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
import { Login } from './features/auth/Login';
import { Provider } from 'react-redux';
import { store } from './store';
import { PrivateRoute } from './utils/PrivateRoute';
import { useAuth } from './hooks/useAuth';
import { useAppDispatch } from './hooks/store';
import { logoutUser } from './features/auth/authSlice';
//import { Login } from './features/auth/Login';

const App: React.FunctionComponent = () => (
  // <Provider store={store}>
  //   <Router>
  //     <Switch>
  //       <Route path="/login">
  //         <Login />
  //       </Route>
  //       {/* <PrivateRoute exact path="/"> */}

  //         <Route element={<Invoices/>} eact path="/invoices"></Route>
  //         <Route element={<Dashboard/>} exact path="/dashboard"></Route>
  //         {/* <AppLayout>
  //           <AppRoutes />
  //         </AppLayout> */}
  //       {/* </PrivateRoute> */}
  //     </Switch>
  //     {/* <Login/>
  //       // <AppLayout>
  //       //     <AppRoutes />
  //       // </AppLayout>     */}
  //   </Router>
  // </Provider>
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <RequireAuth>        
        {/* <RequireAuth> */}
           <AppLayout>
              <AppRoutes />
           </AppLayout>           
        {/* </RequireAuth> */}
        </RequireAuth>
        <Route component={Login} />
      </Switch>
    </Router>
  </Provider>
);

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    //return <Navigate to="/login" state={{ from: location }} replace />;    
    return <Redirect
    to={{
      pathname: '/login',
      state: { from: location },
    }}
  />
  }

  return children;
}

function Home() {  
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(logoutUser());  
  }

  React.useEffect(()=>{
    if(user)
      history.push("/");
  },[]);

  return <><h1>Dashboard</h1> <button onClick={logout}>logout</button> </>;
}


export default App;


