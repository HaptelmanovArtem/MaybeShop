import React from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

import './AddProduct.css';
import {ChangeFieldAC,AddErrorAC, SetStatusAC, SetIsDownloadingAC} from '../../../reducer/AddProductReducer.js';
import {SetCatalogAC} from '../../../reducer/CatalogReducer.js';
import {SetMakerAC} from '../../../reducer/MakerReducer.js';
import Select from './Select/Select.jsx';


class AddProductApi extends React.Component{
    constructor(props){
        super(props);
        this.HandleChangeField = this.HandleChangeField.bind(this);
        this.HandleSelectOption = this.HandleSelectOption.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
        this.HandleChangeFile = this.HandleChangeFile.bind(this);
    }
    file;
    componentDidMount(){
        Axios.get("https://localhost:44328/api/makerphone")
        .then(Response=>{
            this.props.SetMakerAC(Response.data);
        })
        .catch(err=>console.warn(err.message));
        Axios.get("https://localhost:44328/api/catalog")
        .then(Response=>{
            this.props.SetCatalogAC(Response.data);
        })
        .catch(err=>console.warn(err.message));
    }
    HandleSubmit(event){
        this.props.SetIsDownloadingAC();
        const newPhone = {
            Name: this.props.Name,
            Price: +this.props.Price,
            CatalogId: +this.props.CatalogId,
            MakerId: +this.props.MakerId
        };
        Axios.post("https://localhost:44328/api/phone",  // add promise
        newPhone, {
            headers: {
                ContentType: 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(Response=>{
            if(Response.status === 200)
                this.props.SetStatusAC();
            else
                this.props.AddErrorAC(Response.status);            
            this.props.SetIsDownloadingAC();
        })
        .catch(error=>{
            console.log(error);
            this.props.AddErrorAC(error.message);
            this.props.SetIsDownloadingAC();
        });
        event.preventDefault();
    }
    HandleChangeField(event){
        event.preventDefault();
        this.props.ChangeFieldAC(event.target.name, event.target.value);
    }
    HandleChangeFile(event){
        event.preventDefault();
        this.file = event.target.files[0];
    }
    HandleSelectOption(event){
        event.preventDefault();
        this.props.SetSelectMakerAC(event.target.value);
    }
    render(){
        if(this.props.status){
            this.props.SetStatusAC();
            return <Redirect to="/products" />
        }
        return(
            <main className="main-wrapper">
                <form onSubmit={this.HandleSubmit} className = "addproduct-form">
                    <p>
                        <label htmlFor="Name">Name</label>
                        <input type="text" 
                            name="Name" 
                            value={this.props.Name} 
                            onChange={this.HandleChangeField} 
                            placeholder="Name" 
                            className="addproduct-input"
                            />
                    </p>
                    <p>
                        <label htmlFor="Price">Price</label>
                        <input type="number" 
                            name="Price" 
                            value={this.props.Price} 
                            onChange={this.HandleChangeField} 
                            placeholdere="Price"
                            className="addproduct-input"
                        />
                    </p>
                    <p className="select-wrapper">
                        <label htmlFor="MakerId">Maker</label>
                        <Select name={"MakerId"} 
                            size={this.props.countMaker} 
                            HandleChangeField = {this.HandleChangeField} 
                            value = {this.props.MakerId}
                            arraytypes = {this.props.makers}
                            text="Select maker"
                            />
                    </p>
                    <p className="select-wrapper">
                        <label htmlFor="CatalogId">Catalog</label>
                        <Select name={"CatalogId"} 
                            size={this.props.countCatalog} 
                            HandleChangeField = {this.HandleChangeField} 
                            value = {this.props.CatalogId}
                            arraytypes = {this.props.catalogs}
                            text="Select catalog"
                            />
                    </p>
                    
                    <p>
                        <label htmlFor="Photo">Photo</label>
                        <input name="Photo"
                            type="file" 
                            placeholder="url to ur photo"
                            onChange={this.HandleChangeFile}
                            className="addproduct-input"
                            />
                    </p>
                    <p>
                        {
                            !this.props.isDownloading 
                            ?<>
                                <input type="submit" value="Submit" className="addproduct-submit" id="addproduct-submit"/>
                                <span id="addproduct-error-text">{this.props.error}</span>
                            </>
                            : <img src="./isDownloading.gif" alt="downloading..." className="isDownloading-img"/>
                        }
                    </p>
                    
                </form>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    Name: state.AddProductReducer.Name,
    Price: state.AddProductReducer.Price,
    MakerId: state.AddProductReducer.MakerId,
    CatalogId: state.AddProductReducer.CatalogId,
    makers: state.MakerReducer.makers,
    countMaker: state.MakerReducer.count,
    catalogs: state.CatalogReducer.catalogs,
    countCatalog: state.CatalogReducer.count,
    error: state.AddProductReducer.error,
    status: state.AddProductReducer.status,
    isDownloading: state.AddProductReducer.isDownloading
});

const AddProduct = connect(mapStateToProps,{ChangeFieldAC,SetMakerAC,SetCatalogAC,AddErrorAC,SetStatusAC,SetIsDownloadingAC})(AddProductApi);

export default AddProduct;