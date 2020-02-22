import React from 'react';

import './CatalogCard.css';
import { Link } from 'react-router-dom';

const CatalogCard = props => {
    return(
        <>
        <Link to={`/catalogs/${props.id}`}>
            <div className="catalog-card-wrapper">
                <div className="catalog-card-img-wrapper">
                    <img src={props.img === "" || props.img === null ? './noPhoto.png' : props.img} alt="Catalog" className="catalog-card-img"/>
                </div>
                <div className="catalog-card-text-wrapper">
                    <h3 className="catalog-card-text">{props.name}</h3>
                </div>
            </div>
        </Link>
        </>
    );
       
}

export default CatalogCard;