import React from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

import "./Products.css";
import {SetProductAC, SetErrorAC, SetProductIsDownloading} from '../../reducer/ProductReducer.js';
import ProductCard from './ProductCard/ProductCard.jsx';


class ProductApi extends React.Component{
    componentDidMount(){
        this.props.SetProductIsDownloading();
        Axios.get(`https://localhost:44328/api/phone`)
        .then(async Response => {
            if(Response.status === 200)
                await this.props.SetProductAC(Response.data);
            else await this.props.SetErrorAC(Response.statusText);
            this.props.SetProductIsDownloading();
        })
        .catch(error => {
            this.props.SetErrorAC(error.message);
            this.props.SetProductIsDownloading();
        });
    }
    render(){
        return(
            <main className="main-wrapper">
                <article className="article-wrapper">
                    {
                        !this.props.isDownloading 
                        ?
                            <ul className="product-list">
                            {
                            this.props.prodcuts.length > 0 &&
                                this.props.prodcuts.map(item=>{
                                    return <li key = {item.id}>
                                        <ProductCard id = {item.id} img = {item.photoId} price={item.price} name = {item.name}/>
                                    </li>
                                })
                            }
                            {
                                this.props.prodcuts.length === 0 && this.props.error === "" && <h2>Not found products</h2>
                            }
                            {
                                this.props.error !== "" && <h2>{this.props.error}</h2>
                            }
                            </ul>
                        : <img src="./isDownloading.gif" alt="dowloading..." className="product-is-downloading"/>
                    }
                </article>
            </main>
        )
    }
}

const MapStateToProps = state => ({
    prodcuts: state.ProductReducer.products,
    error: state.ProductReducer.error,
    isDownloading: state.ProductReducer.isDownloading
});

const Product = connect(MapStateToProps, {SetProductAC,SetErrorAC, SetProductIsDownloading})(ProductApi);

export default Product;