import React from 'react';
import {Route, Redirect } from 'react-router-dom';

import { WithAuth} from '../auth/index.js';

export const PrivateRoute = WithAuth(({component: RouteComponent, isAuthorized, ...rest})=>{
    console.log(isAuthorized);
    return <Route {...rest} render = {routeProps=>(
        isAuthorized 
        ? <RouteComponent {...routeProps}/>
        : <Redirect to={"/login"}/>
    )}/>
});