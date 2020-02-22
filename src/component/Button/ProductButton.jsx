import React from 'react';
import {Link} from 'react-router-dom';
import {DleateFromBasket} from '../../supportFunc/removeFromBasket.js';

import './ProductButton.css';
import { connect } from 'react-redux';
import {AddProductToBasket, RemoveFromBasket} from '../../reducer/BasketReducer.js';

class ProductButtonApi extends React.Component {
    constructor(props){
        super(props);
        this.HandleAddToBasket = this.HandleAddToBasket.bind(this);
        this.HandleRemoveFromBasket = this.HandleRemoveFromBasket.bind(this);
    }
    async HandleRemoveFromBasket(){
        const prod = DleateFromBasket(this.props.products, this.props.id);
        if(prod.length === 0){
            await this.props.RemoveFromBasket(prod,0);
        }
        else{
            let tPrice = 0;
            prod.map(item=>tPrice+=item.price);
            await this.props.RemoveFromBasket(prod,tPrice);
        }  
    }
    async HandleAddToBasket(){
        const {id,img,name,price} = this.props;
        await this.props.AddProductToBasket({id,img,name,price});
    }
    render(){
        return(
            <>
                {
                    this.props.products.findIndex(item=>item.id === this.props.id) === -1 && 
                        <div className="basket-main-button">
                            <button id="basket" onClick={this.HandleAddToBasket}>Add to basket</button>
                        </div> 
                }
                {
                    this.props.products.findIndex(item=>item.id === this.props.id) !== -1 &&
                    <div className="basket-plus-minus-wrapper">
                        <button id="basket-plus" className="basket-plus-minus" onClick={this.HandleAddToBasket}>+</button>
                        <button id="basket-minus" className="basket-plus-minus" onClick={this.HandleRemoveFromBasket}>-</button>
                    </div>
                }
                <Link to={`/buyproduct/${this.props.id}`} id="buy-link" onClick={this.HandleAddToBasket}>Buy</Link>
            </>
            );
        }
}

const ProductButton = connect((state)=>({
        products: state.BasketReducer.products,
        count: state.BasketReducer.count,
        totalPrice: state.BasketReducer.totalPrice
    }),{AddProductToBasket,RemoveFromBasket})(ProductButtonApi);

export default ProductButton;