import React from "react";
import { Route } from 'react-router-dom';
// import { AuthRoute } from "../util/route_util";
import HomeContainer from './home/home_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => (
  <div>
    {/* <HomeContainer/>
    <Route path="/" component={HomeContainer} /> */}
    <Route path="/login" component={LoginFormContainer} />
    <Route path="/signup" component={SignupFormContainer} />
  </div>
);

export default App;