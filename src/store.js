import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducer/RootReducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;   

const Store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

export default Store;