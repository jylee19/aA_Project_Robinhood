import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const mSTP = state => ({
    loggedin: Boolean(state.session.id)
});

const Auth = ({ loggedin, id, path, component: Component }) => (
    // <Route path={path} render={props => ((loggedin && id != 1) ? <Redirect to={`/users/${id}`} /> : <Component {...props} />)} />
    <Route path={path} render={props => ((loggedin) ? <Redirect to={`/users`} /> : <Component {...props} />)} />
)

export const AuthRoute = withRouter(connect(mSTP)(Auth));

const Protected = ({ loggedin, id, path, component: Component }) => (
    <Route path={path} render={props => ((!loggedin) ? <Redirect to={`/login`} /> : <Component {...props} />)} />
)


export const ProtectedRoute = withRouter(connect(mSTP)(Protected));