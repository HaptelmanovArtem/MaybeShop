import React from 'react';

import "./BasketProductCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class BasketProductCard extends React.Component{
    render(){
        console.log(this.props.img);
        return(
            <>
            <div className="basket-product-card-wrapper">
                <div className="basket-img-wrapper">
                    <img src={
                        this.props.img === null || this.props.img === "" || this.props.img === undefined
                            ? "/noPhoto.png"
                            : this.props.img
                            } alt="product" className="basket-img"/>
                </div>
                <div className="basket-description-wrapper">
                    <span className="basket-description-name">
                        {this.props.name}
                    </span>
                    <span className="basket-description-price">
                        {this.props.price}$
                    </span>
                </div>
                <div className="basket-button-wrapper">
                    <button className="basket-button">
                        <FontAwesomeIcon icon={faTrash} onClick={()=>this.props.HandleDeleteFromBasket(this.props.id)}/>
                    </button>
                </div>
            </div>
            </>
        )
    }
}

export default BasketProductCard;