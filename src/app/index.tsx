import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
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
        <PrivateRoute exact path="/">        
          <Home/>           
        </PrivateRoute>
        <Route component={Login} />
      </Switch>
    </Router>
  </Provider>
);

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

function Users() {
  return <h1>Users</h1>;

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


