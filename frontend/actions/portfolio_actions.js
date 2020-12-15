import * as PortfolioAPIUtil from '../util/portfolio_api_util';

export const RECEIVE_PORTFOLIO = 'RECEIVE_PORTFOLIO'

const receivePortfolio = (portfolio) => {
    return {
        type: RECEIVE_PORTFOLIO,
        portfolio
    }
}

export const makePortfolio = (portfolio) => dispatch => {
    return PortfolioAPIUtil.postPortfolio(portfolio).then(p => dispatch(receivePortfolio(p)))
}

export const showPortfolio = (portfolioId) => dispatch => {
    return PortfolioAPIUtil.fetchPortfolio(portfolioId).then(p => dispatch(receivePortfolio(p)))
}

