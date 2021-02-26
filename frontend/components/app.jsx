import React from "react";
import { Route } from 'react-router-dom';
import { AuthRoute } from "../util/route_util";
import HomeContainer from './home/home_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import demoContainer from './demo/demo_container';
import editUserContainer from './session/edit_form_container';
import dashboardContainer from './dashboard/dashboard_container';
import stockContainer from './stock/stock_container';

const App = () => (
  <div>
    <Route exact path="/" component={HomeContainer} />
    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
    <Route exact path ="/demo" component={demoContainer} />
    <Route exact path="/users/:userId/edit" component={editUserContainer} />
    <Route exact path="/users/:userId" component={dashboardContainer} />
    <Route exact path="/:stock" component={stockContainer} />
  </div>
);

export default App;