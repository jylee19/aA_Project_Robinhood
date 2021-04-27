import React from "react";
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from '../store/store';
import HomeContainer from './home/home_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import demoContainer from './demo/demo_container';
import editUserContainer from './session/edit_form_container';
import dashboardContainer from './dashboard/dashboard_container';
import stockContainer from './stock/stock_container';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={HomeContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path ="/demo" component={demoContainer} />
      <ProtectedRoute exact path="/users/:userId/edit" component={editUserContainer} />
      <ProtectedRoute exact path="/users" component={dashboardContainer} />
      <ProtectedRoute exact path="/stocks/:stock" component={stockContainer} />
    </Switch>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    {/* </PersistGate> */}
  </div>
);

export default App;