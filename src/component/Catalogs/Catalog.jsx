import React from 'react';
import {connect} from 'react-redux';

import './Catalog.css';
import {SetErrorAC, SetCatalogAC,SetIsDownloadingAC} from '../../reducer/CatalogReducer.js';
import CatalogCard from './CatalogCard/CatalogCard.jsx';
import { getAllCatalogs } from '../../API/catalogAPI';

class CatalogAPI extends React.Component{
    
    componentDidMount(){
        this.props.SetIsDownloadingAC();
        getAllCatalogs()
        .then(async Response=>{
            if(Response.status === 200)
                await this.props.SetCatalogAC(Response.data);
            else await this.props.SetErrorAC(Response.statusText); 
            this.props.SetIsDownloadingAC();           
        })
        .catch(error=>{
            this.props.SetErrorAC(error.message);
            this.props.SetIsDownloadingAC();
        });
    }
    render(){
        return(
            <main className="main-wrapper">
                <article className="article-wrapper">
                    {
                        !this.props.isDownloading 
                        ?
                            <ul className="catalog-list">
                            {       
                            this.props.catalogs.length > 0 &&
                                this.props.catalogs.map(item=>
                                    <li key={item.id}><CatalogCard name={item.name} img={item.photoId} id={item.id}/></li> )
                            }
                            {
                                this.props.catalogs.length === 0 && this.props.error === "" && <h2>Not found catalog</h2>
                            }
                            {
                                this.props.error !== "" && <h2>{this.props.error}</h2>
                            }
                            </ul>
                        : 
                            <img src="./isDownloading.gif" alt="downloading..." className="catalog-is-downloading"/>
                        }                       
                </article>
               
            </main>
        )
    }
}

const mapStateToProps = state => ({
    catalogs: state.CatalogReducer.catalogs,
    error: state.CatalogReducer.error,
    isDownloading: state.CatalogReducer.isDownloading
});

const Catalog = connect(mapStateToProps, {SetErrorAC,SetCatalogAC,SetIsDownloadingAC})(CatalogAPI);

export default Catalog;