import React from 'react';

import './Signin.css';
import { WithAuth } from '../../../auth';
import { Redirect } from 'react-router-dom';

class SigninApi extends React.Component{
    render(){
       return <main className = "main-wrapper">
            <section className = "login-section">
                <div className="login-box">
                    <button className ="login-button" onClick={this.props.auth}>Log in</button>
                </div>
            </section>
       </main> 
    }
}

export default WithAuth(({isAuthorized, authorize, error})=>{
    return isAuthorized 
    ? <Redirect to="/addnewproduct"/>
    : <SigninApi auth={authorize} error={error}/>
});