import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const configureStore = (preloadedState = {}) =>
//     createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));

// const persistConfig = {
//     key: 'root',
//     storage: storage
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const configureStore = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(thunk, logger)))
// export const persistor = persistStore(configureStore)

const configureStore = (preloadedState = {}) =>
    createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(thunk, logger)));

export default configureStore;
