import React from 'react';
import {Link} from 'react-router-dom';

import "./ProductCard.css";
import ProductButton from '../../Button/ProductButton.jsx';


const ProductCard = props =>{
    return(
        <div className="product-card-wrapper">
            <div className="img-wrapper">
            <Link to = {`/products/${props.id}`} >
                <img src={props.img === null || props.img === "" ? "/noPhoto.png" : props.img} alt="Card"/>
            </Link>
            </div>
            <div className="description-wrapper">
                <Link to = {`/products/${props.id}`} ><h3 className="product-name">{props.name}</h3></Link>
                <p><span className="product-price">{props.price}$</span></p>
            </div>
            <div className="button-wrapper">
                <ProductButton {...props}/>
            </div>
        </div>
    )
}

export default ProductCard;