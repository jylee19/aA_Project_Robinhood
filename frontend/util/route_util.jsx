import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const mSTP = state => ({
    loggedin: Boolean(state.session.id)
});

const Auth = ({ loggedin, path, component: Component }) => (
    <Route path={path} render={props => (loggedin ? <Redirect to="/" /> : <Component {...props} />)} />
)

export const AuthRoute = withRouter(connect(mSTP, null)(Auth));
