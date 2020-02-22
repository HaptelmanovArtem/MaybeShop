import React from 'react';
import {WithAuth} from '../auth/index';

class Callback extends React.Component{
    componentDidMount(){
        const {handleAuthentication} = this.props;
        if(handleAuthentication){
            handleAuthentication();
        }
    }
    render(){
        return(
            <main className="main-wrapper">
                <h4>U authorized</h4>
            </main>
        )
    }
}

export default WithAuth(Callback);