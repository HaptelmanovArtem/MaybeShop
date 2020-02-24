import React from 'react';
import Button from '../../MyButton/Button.jsx';

import './Signin.css';
import { WithAuth } from '../../../auth';
import { Redirect } from 'react-router-dom';

class SigninApi extends React.Component{
    render(){
       return <main className = "main-wrapper">
            <section className = "login-section">
                <div className="login-box">
                    <Button className ="" onClick={this.props.auth} value={"Log in"}/>
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