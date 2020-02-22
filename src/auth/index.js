import React from 'react';
import auth0 from 'auth0-js';
import {withRouter} from 'react-router-dom';
const jwt_decode = require('jwt-decode'); 

const {Provider, Consumer: AuthConsumer} = React.createContext({
    isAuthorized: false,
    error: "",
    user: {}
});

class AuthProvider extends React.Component{
    
    state = {isAuthorized: false,   error: "",user:{}};

    auth0 = new auth0.WebAuth({
        domain: "phone.eu.auth0.com",
        clientID: "Zhdbo21s7P29inL2wgUL4CvM9etRyg2c",
        redirectUri: "http://localhost:3000/callback",
        audience: "https://api.phone.com",
        responseType: "token",
        scope: "openid email profile"
    });

    authorize = () => {
        this.auth0.authorize();
    }

    logout = () => {
        this.auth0.logout({returnTo: "http://localhost:3000", clientID:"Zhdbo21s7P29inL2wgUL4CvM9etRyg2c"});
        localStorage.removeItem("token");
        localStorage.removeItem("key");
        localStorage.removeItem("profile");
        this.setState({isAuthorized:false, user:{}}, ()=>this.props.history.push("/"));
    }

    handleAuthentication = () =>{
        this.auth0.parseHash((err, authResult)=>{
            if(authResult && authResult.accessToken){
                localStorage.setItem("token",authResult.accessToken);
                this.auth0.client.userInfo(authResult.accessToken,(err,profile)=>{
                    if(err)
                        throw err;
                    console.log(profile);
                    localStorage.setItem("profile",JSON.stringify(profile));  
                    const uInfo = JSON.parse(localStorage.getItem("profile"));    
                    const decodedToken = jwt_decode(authResult.accessToken);
                    this.setState({isAuthorized: true,error: "", user: {...uInfo, roles: decodedToken["https://phone.com/roles"]}},
                        ()=>this.props.history.push("/profile"));            
                    console.log(this.state);
                });
            }
            else if(err){
                console.warn(err);
                this.setState({isAuthorized: false, error: "Login or password wrong!"}, ()=>this.props.history.push("/login"));
            }
        });
    }

    render(){
        const {isAuthorized,error, user} = this.state;
        return(
            <Provider value={
                {
                    isAuthorized, 
                    authorize: this.authorize, 
                    error, 
                    handleAuthentication: this.handleAuthentication,
                    logout: this.logout,
                    user
                }
                }>
                {this.props.children}
            </Provider>
        )
    }
}

export const WithAuth = (WrappedComponent) => {
    return class AuthHOC extends React.Component{
        render(){
            return(
                <AuthConsumer>
                    {contextProps=>
                        <WrappedComponent {...contextProps} {...this.props}/>}
                </AuthConsumer>
            )
        }
    }
}

// const AuthProvider = connect((state)=>({}),{SetDataAc})(AuthProviderApi);

const AuthProviderWithRouter = withRouter(AuthProvider);

export {AuthProviderWithRouter as AuthProvider};