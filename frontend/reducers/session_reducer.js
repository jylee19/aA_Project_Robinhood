import { 
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER
} from '../actions/session_actions';

const _nullSession = {};

export default (state = _nullSession, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, { id: action.payload.user.id });
        case LOGOUT_CURRENT_USER:
            return _nullSession;
        default:
            return state;
    }
}