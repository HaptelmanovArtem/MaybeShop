import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import Store from './store.js';
import {AuthProvider} from './auth';
import { Provider } from 'react-redux';

ReactDOM.render(
        <BrowserRouter>
            <Provider store={Store}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Provider>
        </BrowserRouter>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
