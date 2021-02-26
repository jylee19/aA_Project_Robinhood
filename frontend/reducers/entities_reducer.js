import { combineReducers } from 'redux';
import userReducer from './users_reducer';
import portfolioReducer from './portfolios_reducer';
import stockReducer from './stock_reducer';

const entitiesReducer = combineReducers({
    user: userReducer,
    portfolio: portfolioReducer,
    stock: stockReducer
});

export default entitiesReducer;