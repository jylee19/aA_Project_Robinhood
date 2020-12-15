import { combineReducers } from 'redux';
import userReducer from './users_reducer';
import portfolioReducer from './portfolios_reducer';

const entitiesReducer = combineReducers({
    user: userReducer,
    portfolio: portfolioReducer
});

export default entitiesReducer;