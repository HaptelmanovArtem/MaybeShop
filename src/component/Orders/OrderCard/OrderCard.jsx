import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../Modal/Modal';

import "./OrderCard.css";
import Axios from 'axios';

class OrderCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {isOpen:false, isAccess: false};
        this.HandleModalSubmit = this.HandleModalSubmit.bind(this);
        this.HandleModalOpen = this.HandleModalOpen.bind(this);
        this.HandleModalCancel = this.HandleModalCancel.bind(this);
    }
    HandleModalOpen(){
        this.setState({isOpen: true});
    }
    HandleModalSubmit(){
        this.setState({isOpen: false, isAccess: true});
        Axios.delete(`https://localhost:44328/api/order/${this.props.id}`,{
            headers:{
                ContentType: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(Response=>{
            if(Response.status === 200){
                Axios.get(`https://localhost:44328/api/order`,{
                    headers:{
                        ContentType: "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                .then(async Response=>{
                    if(Response.status === 200){
                        await this.props.SetOrdersAC(Response.data);
                    }
                })
            }
        })
        .catch(error=>{
            console.log(error);
        });
    }
    HandleModalCancel(){
        this.setState({isOpen: false, isAccess: false});
    }

    render(){
        return(
            <div className={`order-card-wrapper ${this.props.isDone ? "order-card-done" : "order-card-not-done"}`}>
                <div className="order-card-total-count-wrapper">
                    <span className = "order-card-count">
                        Product count:&nbsp;<span>{this.props.count}</span>
                    </span>
                </div>
                <div className="order-card-total-price-wrapper">
                    <span className="order-card-total-price">
                        Total price:&nbsp;<span>{this.props.totalPrice}</span>
                    </span>
                </div>
                {
                    this.props.isAuthorized && this.props.userRole !== undefined && this.props.userRole[0] === "Admin" &&
                    <>
                        <div className="order-card-user-info-wrapper">
                            <span className="order-card-user-given_name">{this.props.given_name}</span>    
                            <span className="order-card-user-family_name">{this.props.family_name}</span>    
                            <span className="order-card-user-email">{this.props.email}</span>    
                        </div>    
                        <div className="order-card-button-wrapper">
                            <button className="order-card-button-edit-status">
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            <button className="order-card-button-delete">
                                <FontAwesomeIcon icon={faTrash} onClick={this.HandleModalOpen}/>
                                <Modal isOpen={this.state.isOpen} 
                                    onSubmit={this.HandleModalSubmit} 
                                    title="Confirm ur actions!"
                                    children={<h3>Do u really want delete this order?</h3>}
                                    onCancel={this.HandleModalCancel}
                                    />
                            </button>
                        </div>
                    </>
                }
            </div>
        )
    }
}

export default OrderCard;