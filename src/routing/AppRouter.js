import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/Auth/Login';
import Home from '../pages/Home';
import Signup from '../pages/Auth/Signup';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute path="/" component={Home} />
    </Switch>
  </Router>
);

export default AppRouter;
