import React from 'react';
import {Link} from 'react-router-dom';
import {WithAuth} from '../../../auth/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
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
                {
                    !props.user.roles 
                    ? <ProductButton {...props}/>
                    : <>
                        <Link to={`/edit/${props.id}`} className="product-card-button-auth product-card-edit-button">
                            <FontAwesomeIcon icon={faEdit}/>
                        </Link>
                        <button className="product-card-button-auth product-card-delete-button" onClick={()=>props.HandleDeleteClick(props.id)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default WithAuth(ProductCard);