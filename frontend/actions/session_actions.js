import {
    postUser,
    postSession,
    deleteSession
} from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

const receiveCurrentUser = (currentUser) => {
    return {
        action: RECEIVE_CURRENT_USER,
        currentUser
    }
}

const logoutCurrentUser = () => {
    return {
        action: LOGOUT_CURRENT_USER
    }
}

export const signup = (user) => dispatch => {
    return postUser(user).then(u => dispatch(receiveCurrentUser(u)))
}

export const login = (user) => dispatch => {
    return postSession(user).then(u => dispatch(receiveCurrentUser(u)))
}

export const logout = () => dispatch => {
    return deleteSession().then(() => dispatch(logoutCurrentUser()))
}