import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../Modal/Modal';

import "./OrderCard.css";
import { getAllOrders, deleteOrderById, changeInfoInOrderById } from '../../../API/orderAPI';

class OrderCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {isOpen:false, isOpenDone: false, isAccess: false, isDone: false};
        this.HandleModalSubmit = this.HandleModalSubmit.bind(this);
        this.HandleModalOpen = this.HandleModalOpen.bind(this);
        this.HandleModalCancel = this.HandleModalCancel.bind(this);
        this.HandleModalEditStatus = this.HandleModalEditStatus.bind(this);
        this.HandleModalEditOpen = this.HandleModalEditOpen.bind(this);
    }
    HandleModalOpen(){
        this.setState({isOpen: true});
    }
    HandleModalEditOpen(){
        this.setState({isOpenDone:true})
    }
    HandleModalSubmit(){
        this.setState({isOpen: false, isAccess: true});
        deleteOrderById(this.props.id)
        .then(Response=>{
            if(Response.status === 200){
                getAllOrders()
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
    async HandleModalEditStatus(){
        this.setState({isOpenDone: false, isDone:true}, () => {    
                const changedOrder ={
                    id: this.props.id,
                    userId: this.props.userId,
                    prodId: [],
                    description: this.props.description,
                    totalPrice: this.props.totalPrice,
                    family_name: this.props.family_name,
                    given_name: this.props.given_name,
                    phone_number: this.props.phone_number,
                    email_address: this.props.email,
                    isDone: true
                };
                changeInfoInOrderById(this.props.id,changedOrder)
                    .then(Response => {
                        if(Response.status === 200){
                            getAllOrders()
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
        });
    }
    HandleModalCancel(){
        this.setState({isOpen: false, isAccess: false, isOpenDone: false, isDone: false});
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
                                <FontAwesomeIcon icon={faCheckCircle} onClick={this.HandleModalEditOpen}/>
                                <Modal isOpen={this.state.isOpenDone} 
                                    onSubmit={this.HandleModalEditStatus} 
                                    title="Confirm ur actions!"
                                    children={<h3>Have u completed this order?</h3>}
                                    onCancel={this.HandleModalCancel}
                                    />
                            </button>
                            <button className="order-card-button-delete">
                                <FontAwesomeIcon icon={faTrash} onClick={this.HandleModalOpen}/>
                                <Modal isOpen={this.state.isOpen} 
                                    onSubmit={this.HandleModalSubmit} 
                                    title="Confirm ur actions!"
                                    children={<h3>Are u shure?</h3>}
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