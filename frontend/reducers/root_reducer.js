import { combineReducers } from 'redux';
import userReducer from './users_reducer';
import sessionReducer from './session_reducer';

const rootReducer = combineReducers({
    user: userReducer,
    session: sessionReducer
});

export default rootReducer;