import * as UserAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const SET_PORTFOLIO_ID = 'SET_PORTFOLIO_ID';

const receiveCurrentUser = (payload) => {
    return {
        type: RECEIVE_CURRENT_USER,
        payload
    }
}


const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER
    }
}

const setPortfolioId = (user) => {
    return {
        type: SET_PORTFOLIO_ID,
        user
    }
}


export const signup = (user) => dispatch => {
    return UserAPIUtil.postUser(user).then(payload => dispatch(receiveCurrentUser(payload)))
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

// export const updatePortfolioId = (user) => dispatch => {
//     return UserAPIUtil.updateUser(user).then(u => dispatch(setPortfolioId(u)))
// }

export const requestUser = (userId) => dispatch => {
    return UserAPIUtil.fetchUser(userId).then(u => dispatch(receiveCurrentUser(u)))
}

