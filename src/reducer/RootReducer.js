import {combineReducers} from 'redux';
import ProductReducer from './ProductReducer.js';
import AddProductReducer from './AddProductReducer.js';
import MakerReducer from './MakerReducer.js';
import CatalogReducer from './CatalogReducer.js';
import BasketReducer from './BasketReducer.js';
import UserReducer from './UserReducer.js';
import BuyReducer from './BuyReducer.js';

export default combineReducers({
    ProductReducer,
    AddProductReducer,
    MakerReducer,
    CatalogReducer,
    BasketReducer,
    UserReducer,
    BuyReducer
});