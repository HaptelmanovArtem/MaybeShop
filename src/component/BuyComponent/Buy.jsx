import React from 'react';

import "./Buy.css";
import { connect } from 'react-redux';
import BasketProductCard from '../Basket/BasketProductCard/BasketProductCard.jsx';
import { Redirect } from 'react-router-dom';
import {DleateFromBasket} from '../../supportFunc/removeFromBasket.js';
import {WithAuth} from '../../auth/index';
import {RemoveFromBasket,AddProductToBasket} from "../../reducer/BasketReducer.js";
import {SetChangedUserInfoFieldAC, SetIsEditAC,SetStatusResultOrderAC} from '../../reducer/BuyReducer.js';
import Axios from 'axios';

class BuyAPI extends React.Component{
    constructor(props){
        super(props);
        this.HandleDeleteFromBasket = this.HandleDeleteFromBasket.bind(this);
        this.HandleIsEdit = this.HandleIsEdit.bind(this);
        this.HandleChangeField = this.HandleChangeField.bind(this);
        this.HandleSubmitOrder = this.HandleSubmitOrder.bind(this);
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
    HandleSubmitOrder(event){
        event.preventDefault();
        let UserInfo;
        if(this.props.isEdit){
            UserInfo = {
                email: this.props.eUser.email, 
                family_name: this.props.eUser.family_name,
                given_name: this.props.eUser.given_name,
                address:this.props.eUser.address,
                Phone_number: "+380"
        }
        } else{
            UserInfo = {
                email: this.props.user.email,
                family_name: this.props.user.family_name,
                given_name: this.props.user.given_name,
                address: "Address",
                Phone_number: "+380"
            }
        }
        const prodId = this.props.products.map(item=>{ return {prodId: item.id}});        
        const newOrder = {
            UserId: this.props.user.sub,
            prodId: prodId,
            Description: UserInfo.address,
            TotalPrice: this.props.totalPrice,
            Family_name: UserInfo.family_name,
            Given_name: UserInfo.given_name,
            Phone_number: UserInfo.Phone_number,
            Email_address: UserInfo.email,
            isDone: false
        }
        console.log(newOrder);

        Axios.post("https://localhost:44328/api/order",
        newOrder,{
            headers:{
                ContentType: 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(Response=>{
            if(Response.status === 200){
                this.props.SetStatusResultOrderAC(Response.status);
                this.props.RemoveFromBasket([],0);
            }
        })
        .catch(e=>{
            console.log(e.message);
        });
    }
    render(){
        if(this.props.status === 200){
            this.props.SetStatusResultOrderAC(0);
            return <Redirect to="/" />
        }
            
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
                        <form className="buy-form" onSubmit = {this.HandleSubmitOrder}>
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
    totalPrice: state.BasketReducer.totalPrice,
    eUser: state.BuyReducer.user,
    isEdit: state.BuyReducer.isEdit,
    status: state.BuyReducer.status
});

const Buy = connect(mapStateToProps,{RemoveFromBasket,AddProductToBasket, SetIsEditAC,SetChangedUserInfoFieldAC, SetStatusResultOrderAC})(BuyAPI);

export default WithAuth(({isAuthorized, authorize, error,user})=>{
    return <Buy user={user} isAuthorized={isAuthorized} authorize={authorize}/>;
});