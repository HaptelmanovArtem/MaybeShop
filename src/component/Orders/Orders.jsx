import React from 'react';
import {connect} from 'react-redux';
import {WithAuth} from '../../auth/index';
import {SetOrdersAC,SetIsDownloadOrderAC} from '../../reducer/OrderReducer.js';

import "./Orders.css";
import OrderCard from './OrderCard/OrderCard';
import isAdmin from '../../auth/isAdmin';
import { getAllOrders, getAllOrdersByUserId } from '../../API/orderAPI';

class Orders extends React.Component{
    componentDidMount(){
        if(this.props.isAuthorized && isAdmin(this.props.user.roles)){
            this.props.SetIsDownloadOrderAC();
            getAllOrders()
            .then(Response=>{
                if(Response.status === 200){
                    this.props.SetOrdersAC(Response.data);
                    this.props.SetIsDownloadOrderAC();
                }
                else{
                    console.log(Response);
                    this.props.SetIsDownloadOrderAC();
                }
            })
            .catch(error=>{
                console.log(error);
                this.props.SetIsDownloadOrderAC();
            })
        }
        else{
            this.props.SetIsDownloadOrderAC();
            getAllOrdersByUserId(this.props.user.sub)
            .then(async Response=>{
                if(Response.status === 200){
                    await this.props.SetOrdersAC(Response.data);
                    this.props.SetIsDownloadOrderAC();
                }
                else{
                    console.log(Response);
                    this.props.SetIsDownloadOrderAC();
                }
            })
        }
    }
    render(){
        return(
            <main className="main-wrapper">
                <article className="article-wrapper">
                    {
                        !this.props.isDownloading
                        ?
                            this.props.orders.length > 0
                            ?   <ul className="orders-list">
                                {
                                    this.props.orders.map((item)=>{
                                    return <li key={item.id}>
                                            <OrderCard id={item.id} 
                                                userId = {item.userId}
                                                description = {item.description}
                                                count={item.prodId.length} 
                                                totalPrice = {item.totalPrice} 
                                                isAuthorized={this.props.isAuthorized}
                                                userRole = {this.props.user.roles}
                                                family_name = {item.family_name}
                                                given_name = {item.given_name}
                                                email = {item.email_address}
                                                isDone = {item.isDone}
                                                SetOrdersAC = {this.props.SetOrdersAC}
                                                phone_number = {item.phone_number}
                                                />
                                        </li>
                                    })
                                }
                            </ul> 
                            : <h3>Your order list is empty!</h3>
                        : <img src="./isDownloading.gif" alt="downloading..." />
                    }
                </article>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    orders: state.OrderReducer.orders,
    isDownloading: state.OrderReducer.isDownloading
});

export default WithAuth(connect(mapStateToProps,{SetOrdersAC,SetIsDownloadOrderAC})(Orders));