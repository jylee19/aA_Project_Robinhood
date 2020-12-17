import { RECEIVE_PORTFOLIO } from '../actions/portfolio_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _nullPortfolio = {};

export default (state = _nullPortfolio, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_PORTFOLIO:
            return Object.assign({}, state, { [action.portfolio.id]: action.portfolio });
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.payload.portfolio.id]: action.payload.portfolio });
        default:
            return state;
    }

}