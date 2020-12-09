import React from "react";
import { Route } from 'react-router-dom';
import { AuthRoute } from "../util/route_util";
import HomeContainer from './home/home_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import demoContainer from './demo/demo_container';
import editUserContainer from './session/edit_form_container';

const App = () => (
  <div>
    <Route exact path="/" component={HomeContainer} />
    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
    <Route exact path ="/demo" component={demoContainer} />
    <Route path="/users/:userId/edit" component={editUserContainer} />
  </div>
);

export default App;