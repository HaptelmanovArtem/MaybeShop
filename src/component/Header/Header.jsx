import React from 'react';
import {Link} from 'react-router-dom';
import {WithAuth} from '../../auth/index.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'

import isAdmin from '../../auth/isAdmin.js';
import './Header.css';
import { connect } from 'react-redux';

class HeaderApi extends React.Component {
    render(){
        return(
                <header className="header-wrapper">
                    <nav className="nav-wrapper">
                        <ul className="nav-list">
                            <li><Link to="/"><img src="/logo.png" alt="logo" id="logo"/></Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/catalogs">Catalogs</Link></li>
                            <li><Link to="/aboutus">About us</Link></li>
                            {isAdmin(this.props.user.roles)
                                ?   <>
                                        <li><Link to="/addproduct">Add product</Link></li> 
                                        <li><Link to="/addcatalog">Add catalog</Link></li> 
                                    </>
                                : ""
                            }
                            {
                                this.props.isAuthorized
                                ? <li><Link to="/editinfo">Edit info</Link></li> 
                                : ""
                            }
                        </ul>
                    </nav>
                    <div className="user-menu-wrapper">
                        <div className="login">
                            {this.props.isAuthorized && JSON.parse(localStorage.getItem("profile"))
                                ? <div className="user-wrapper">
                                    <div className="user-info">
                                        <img src={this.props.user.picture} alt="avatart" className="user-avatar"/>
                                        <span className="user-name">Hi, {this.props.user.name}</span>
                                    </div>
                                    <span className = "span-text-styled" onClick={this.props.logout}>log out</span>
                                </div>
                                : <Link to="/login"><span id="login">Sign in</span></Link>
                            }
                        </div>
                        <div className="basket">
                            <Link to ="/basket">
                                <FontAwesomeIcon icon={faShoppingBasket}/> 
                                <span className="span-text">&nbsp;{this.props.count}</span>
                            </Link>
                        </div>
                    </div>
                </header>
        )
    }
}

const Header = connect(state=>({count:state.BasketReducer.count}),{})(HeaderApi);

export default WithAuth(({isAuthorized,logout, user})=>{
    return <Header isAuthorized={isAuthorized} logout={logout} user={user}/>
});