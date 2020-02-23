import React from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import {WithAuth} from '../../auth/index';
import {SetOrdersAC,SetIsDownloadOrderAC} from '../../reducer/OrderReducer.js';

import "./Orders.css";
import OrderCard from './OrderCard/OrderCard';
import isAdmin from '../../auth/isAdmin';

class Orders extends React.Component{
    componentDidMount(){
        if(this.props.isAuthorized && isAdmin(this.props.user.roles)){
            this.props.SetIsDownloadOrderAC();
            Axios.get(`https://localhost:44328/api/order`,{
                headers:{
                    ContentType: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(async Response=>{
                if(Response.status === 200){
                    await this.props.SetOrdersAC(Response.data);
                    this.props.SetIsDownloadOrderAC();
                }
            })
        }
        else{
            this.props.SetIsDownloadOrderAC();
            Axios.get(`https://localhost:44328/api/order/getmyorders/${this.props.user.sub}`,{
                headers:{
                    ContentType: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(async Response=>{
                if(Response.status === 200){
                    await this.props.SetOrdersAC(Response.data);
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
                                                count={item.prodId.length} 
                                                totalPrice = {item.totalPrice} 
                                                isAuthorized={this.props.isAuthorized}
                                                userRole = {this.props.user.roles}
                                                family_name = {this.props.user.family_name}
                                                given_name = {this.props.user.given_name}
                                                email = {this.props.user.email}
                                                isDone = {item.isDone}
                                                SetOrdersAC = {this.props.SetOrdersAC}
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