import React from 'react';
import {Switch,Route} from 'react-router-dom';
import {PrivateRoute} from './PrivateRoute/PrivateRoute.js';

import './App.css';
import Header from './component/Header/Header.jsx';
import Main from './component/Main/Main.jsx'
import Footer from './component/Footer/Footer.jsx';
import Products from './component/Products/Products.jsx'
import Signin from './component/User/SignIn/Signin.jsx';
import AddProduct from './component/Products/AddProduct/AddProduct.jsx';
import Profile from './component/Profile/Profile';
import Callback from './callback/Callback.jsx';
import Catalog from './component/Catalogs/Catalog.jsx';
import CatalogProducts from './component/Catalogs/CatalogProducts/CatalogProducts.jsx';
import { WithAuth } from './auth/index.js';
import Basket from './component/Basket/Basket.jsx';
import Buy from './component/BuyComponent/Buy.jsx';

class App extends React.Component{
  render(){
    return (
      <div className="App">
          <Header />
          <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/callback" component={Callback}/>
              <Route exact path="/login" component={Signin}/>
              <Route exact path="/catalogs" component={Catalog}/>
              <Route exact path={`/catalogs/:id`} component={CatalogProducts}/>
              <Route exact path="/basket" component={Basket} />
              <Route exact path="/buyproduct" component={Buy}/>
              <Route exact path="/buyproduct/:id" component={Buy}/>
              <PrivateRoute exact path="/addproduct" component={AddProduct}/>
              <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
          <Footer />
      </div>
    );
  }
}



export default WithAuth(({isAuthorized, authorize})=>{
  return <App isAuthorized = {isAuthorized} authorize={authorize}/>
});
