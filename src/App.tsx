import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Login from './containers/User';
import Register from './containers/User/UserForm'
import Dashboard from './containers/Dashboard';
import ProtectedRoute from "./protectedRoutes";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={withRouter(Login)} />
        <Route path="/login" component={withRouter(Login)} />
        <Route path="/register" component={withRouter(Register)} />
        <ProtectedRoute path="/dashboard" component={withRouter(Dashboard)} />
       </Switch>
    </BrowserRouter>
  );
}

export default App;
