import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRedirect, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/App';
import Base from './components/Base';
import BasePage from './components/BasePage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import General from './components/General';
import Menu from './components/Menu';
import Section from './components/Section';
import FoodItem from './components/FoodItem';
import Orders from './components/Orders';
import Order from './components/Order';
import Platforms from './components/Platforms';
import Reports from './components/Reports';
import CreateOrg from './components/CreateOrg';
import { store } from './store';


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>

            <Redirect from="/index.html" to="/" />
            
            <Route path="/" component={App}>
                
                <Route path="/" component={Base}>
                    
                    <IndexRedirect to="/dashboard" />
                    
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/general" component={General} />
                    <Route path="/menu" component={Menu} />
                    <Route path="/menu/sections/:sectionId" component={Section} />
                    <Route path="/menu/fooditem/:foodItemId" component={FoodItem} />
                    <Route path="/orders/:orderId" component={Order} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/platforms" component={Platforms} />
                    <Route path="/reports" component={Reports} />
                    
                </Route>
                
                <Route path="/" component={BasePage}>
                    <Route path="/login" component={Login} />
                    <Route path="/create-org" component={CreateOrg} />
                </Route>
                
            </Route>
            
        </Router>
    </Provider>,
    document.getElementById('app')
);
