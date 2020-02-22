import React from 'react';

import "../../Products/Products.css";
import {connect} from 'react-redux';
import {SetProductAC} from '../../../reducer/ProductReducer.js';
import Axios from 'axios';
import ProductCard from '../../Products/ProductCard/ProductCard.jsx';

class CatalogProductsAPI extends React.Component{
    constructor(props){
        super(props);
        this.id = this.props.match.params.id;
    }
    componentDidMount(){
        Axios.get(`https://localhost:44328/api/phone/bycatalog/${this.id}`)
        .then(async Response=>{
            await this.props.SetProductAC(Response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
    render(){
        
        return(
            <main className="main-wrapper">
                <article className="article-wrapper">
                    <ul className="product-list">
                    {this.props.products.length > 0
                    ? this.props.products.map(item=>{
                        return <li key = {item.id}>
                            <ProductCard id = {item.id} img = {item.photoId} price={item.price} name = {item.name}/>
                        </li>
                    })
                    : <h1>Not found product</h1>   
                    }
                    </ul>
                </article>
            </main>
        )
    }
}

const MapStateToProps = state => ({
    products: state.ProductReducer.products
});

const CatalogProducts = connect(MapStateToProps, {SetProductAC})(CatalogProductsAPI);

export default CatalogProducts;