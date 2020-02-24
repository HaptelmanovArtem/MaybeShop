import React from 'react';
import {connect} from 'react-redux';

import {DleateFromBasket} from '../../supportFunc/removeFromBasket.js';

import {RemoveFromBasket,AddProductToBasket} from "../../reducer/BasketReducer.js";
import './Basket.css';
import BasketProductCard from './BasketProductCard/BasketProductCard';
import Button from '../MyButton/Button.jsx';
import { Link } from 'react-router-dom';

class Basket extends React.Component{
    constructor(props){
        super(props);
        this.HandleDeleteFromBasket = this.HandleDeleteFromBasket.bind(this);
    }
    async HandleDeleteFromBasket(id){
        const prod = DleateFromBasket(this.props.products,id);
        if(prod.length === 0){
            await this.props.RemoveFromBasket(prod,0);
        }
        else{
            let tPrice = 0;
            prod.map(item=>tPrice+=item.price);
            await this.props.RemoveFromBasket(prod,tPrice);
        }
    }
    render(){
        return(
            <main className="main-wrapper">
                <article className="article-basket-wrapper">
                    {
                        this.props.products.length > 0 
                        ?<>
                            <ul className="basket-product-list">
                                {this.props.products.map((item,index)=>{
                                    return <li key={index}>
                                        <BasketProductCard id={item.id} 
                                            img={item.img} 
                                            name={item.name} 
                                            price={item.price} 
                                            HandleDeleteFromBasket = {this.HandleDeleteFromBasket}
                                            />
                                    </li>
                                })}
                            </ul>
                            <div className="basket-total-info-wrapper">
                                <span className="basket-count-prod">
                                    Total count: {this.props.count}
                                </span>
                                <span className="basket-total-price">
                                    Total price: {this.props.totalPrice}
                                </span>
                                <Link to="/buyproduct">
                                <Button value={"Buy"}/>
                                </Link>
                            </div>
                        </>
                        :<h3>Basket is empty(</h3>
                    }
                </article>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    products: state.BasketReducer.products,
    count: state.BasketReducer.count,
    totalPrice: state.BasketReducer.totalPrice
});

export default connect(mapStateToProps,{RemoveFromBasket,AddProductToBasket})(Basket);