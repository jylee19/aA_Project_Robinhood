import { RECEIVE_PORTFOLIO } from '../actions/portfolio_actions';

const _nullPortfolio = {};

export default (state = _nullPortfolio, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_PORTFOLIO:
            return Object.assign({}, state, { [action.portfolio.id]: action.portfolio });
        default:
            return state;
    }

}