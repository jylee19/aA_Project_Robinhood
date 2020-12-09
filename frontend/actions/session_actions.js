import * as UserAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

const receiveCurrentUser = (user) => {
    return {
        type: RECEIVE_CURRENT_USER,
        user
    }
}

const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER
    }
}

export const signup = (user) => dispatch => {
    return UserAPIUtil.postUser(user).then(u => dispatch(receiveCurrentUser(u)))
}

export const login = (user) => dispatch => {
    return UserAPIUtil.postSession(user).then(u => dispatch(receiveCurrentUser(u)))
}

export const logout = () => dispatch => {
    return UserAPIUtil.deleteSession().then(() => dispatch(logoutCurrentUser()))
}

export const updateUserInfo = (user) => dispatch => {
    return UserAPIUtil.updateUser(user).then(u => dispatch(receiveCurrentUser(u)))
}

export const requestUser = (userId) => dispatch => {
    return UserAPIUtil.requestUser(userId).then(u => dispatch(receiveCurrentUser(u)))
}