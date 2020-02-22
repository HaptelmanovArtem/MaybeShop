import React from 'react';

import "./Buy.css";
import { connect } from 'react-redux';
import BasketProductCard from '../Basket/BasketProductCard/BasketProductCard.jsx';
import { Redirect } from 'react-router-dom';
import {DleateFromBasket} from '../../supportFunc/removeFromBasket.js';
import {WithAuth} from '../../auth/index';
import {RemoveFromBasket,AddProductToBasket} from "../../reducer/BasketReducer.js";
import {SetChangedUserInfoFieldAC, SetIsEditAC} from '../../reducer/BuyReducer.js';

class BuyAPI extends React.Component{
    constructor(props){
        super(props);
        this.HandleDeleteFromBasket = this.HandleDeleteFromBasket.bind(this);
        this.HandleIsEdit = this.HandleIsEdit.bind(this);
        this.HandleChangeField = this.HandleChangeField.bind(this);
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
    HandleIsEdit(){
        this.props.SetIsEditAC();
    }
    HandleChangeField(event){
        event.preventDefault();
        this.props.SetChangedUserInfoFieldAC(event.target.name, event.target.value);
    }
    render(){
        return(
            <main className="main-wrapper">
                <article className="article-buy-wrapper">
                    <div className="product-info-wrapper">
                        {
                            this.props.products.length > 0
                            ? <ul className="buy-product-list">
                                    { 
                                        this.props.products.map((item,index)=>{
                                            return <li key={index}>
                                                    <BasketProductCard 
                                                        name={item.name} 
                                                        id={item.id} 
                                                        price={item.price} 
                                                        img={item.img} 
                                                        HandleDeleteFromBasket = {this.HandleDeleteFromBasket}
                                                        />
                                                </li>
                                        })
                                    }
                            </ul> 
                            : <Redirect to="/products" />
                        }
                    </div>
                    <div className="product-user-info-wrapper">
                        {
                            this.props.isAuthorized &&
                            <button onClick={this.HandleIsEdit}>
                            {
                                !this.props.isEdit
                                ? "Edit info"
                                : "Use account info"
                            }
                            </button>
                        }
                        <form className="buy-form">
                            <input type="text" 
                                name="family_name"
                                value={
                                    this.props.isAuthorized && !this.props.isEdit ? this.props.user.family_name: this.props.eUser.family_name
                                } 
                                placeholder="First name" 
                                disabled ={this.props.isAuthorized && this.props.isEdit? false : true}  
                                onChange={this.HandleChangeField}
                                />
                            <input type="text" 
                                name="given_name" 
                                value={
                                    this.props.isAuthorized && !this.props.isEdit ? this.props.user.given_name: this.props.eUser.given_name
                                } 
                                placeholder="Second name" 
                                disabled ={this.props.isAuthorized && this.props.isEdit? false : true} 
                                onChange={this.HandleChangeField} 
                                />
                            <input type="email" 
                                name="email" 
                                value={
                                    this.props.isAuthorized && !this.props.isEdit  ? this.props.user.email: this.props.eUser.email
                                }
                                placeholder="Email name" 
                                disabled ={this.props.isAuthorized && this.props.isEdit? false : true} 
                                onChange={this.HandleChangeField}
                                />
                            <input type="text" 
                                name="address" 
                                value={
                                    this.props.isAuthorized && !this.props.isEdit  ? "Must be delivery address" : this.props.eUser.address
                                }
                                placeholder="Delivery address" 
                                disabled ={this.props.isAuthorized && this.props.isEdit ? false : true} 
                                onChange={this.HandleChangeField}
                                />
                            { 
                                this.props.isAuthorized
                                ? <input type="submit" value="Buy" disabled ={this.props.isAuthorized ? false : true}/>
                                : <input type="button" value="Login" onClick={this.props.authorize}/>
                            }

                        </form>
                    </div>
                </article>
            </main>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.BasketReducer.products,
    eUser: state.BuyReducer.user,
    isEdit: state.BuyReducer.isEdit
});

const Buy = connect(mapStateToProps,{RemoveFromBasket,AddProductToBasket, SetIsEditAC,SetChangedUserInfoFieldAC})(BuyAPI);

export default WithAuth(({isAuthorized, authorize, error,user})=>{
    return <Buy user={user} isAuthorized={isAuthorized} authorize={authorize}/>;
});