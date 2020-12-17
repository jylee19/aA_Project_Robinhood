import * as PortfolioAPIUtil from '../util/portfolio_api_util';
import * as SessionAPIUtil from '../util/session_api_util';
import { RECEIVE_CURRENT_USER } from './session_actions';

export const RECEIVE_PORTFOLIO = 'RECEIVE_PORTFOLIO'

const receivePortfolio = (portfolio) => {
    return {
        type: RECEIVE_PORTFOLIO,
        portfolio
    }
}

const receiveCurrentUser = (user) => {
    return{
        type: RECEIVE_CURRENT_USER,
        user
    }
}


export const makePortfolio = (portfolio) => dispatch => {
    return PortfolioAPIUtil.postPortfolio(portfolio).then(p => dispatch(receivePortfolio(p)))
}

export const showPortfolio = (portfolioId) => dispatch => {
    return PortfolioAPIUtil.fetchPortfolio(portfolioId).then(p => dispatch(receivePortfolio(p)))
}

export const generatePortfolio = (user) => dispatch => {
    return SessionAPIUtil.postUser(user).then(u => dispatch(receiveCurrentUser(u)))
}
