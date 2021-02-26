import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_STOCK } from '../actions/stock_actions';

const _nullStock = {};

export default (state = _nullPortfolio, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_STOCK:
            return Object.assign({}, state, { [action.stock.id]: action.stock})
        default:
            return state;
    }
}