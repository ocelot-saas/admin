import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRedirect, Redirect, browserHistory } from 'react-router';

import initTranslation from './common/localize';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';

import Dashboard from './components/Dashboard';
import General from './components/General';
import Menu from './components/Menu';
import Section from './components/Section';
import FoodItem from './components/FoodItem';
import Orders from './components/Orders';
import Order from './components/Order';
import Platforms from './components/Platforms';
import Reports from './components/Reports';

import Login from './components/Login';
import AuthService from './AuthService';

// Init auth system
const auth = new AuthService('jhoF46qs7sSf3wcPP1lKrYRD1TSgNTZO', 'ocelot-saas.eu.auth0.com', 'localhost:10001');

const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
        replace({ pathname: '/login' })
    }
}

// Init translation system
initTranslation();

ReactDOM.render(
    <Router history={browserHistory}>

        <Redirect from="/index.html" to="/" />

        <Route path="/" component={Base} auth={auth}>

            {/* Default route */}
            <IndexRedirect to="/dashboard" />

            {/* Routes, in sorted order */}
            <Route path="/dashboard" component={Dashboard} onEnter={requireAuth} />
            <Route path="/general" component={General} onEnter={requireAuth} />
            <Route path="/menu" component={Menu} onEnter={requireAuth} />
            <Route path="/menu/sections/:sectionId" component={Section} onEnter={requireAuth} />
            <Route path="/menu/fooditem/:foodItemId" component={FoodItem} onEnter={requireAuth} />
            <Route path="/orders/:orderId" component={Order} onEnter={requireAuth} />
            <Route path="/orders" component={Orders} onEnter={requireAuth} />
            <Route path="/platforms" component={Platforms} onEnter={requireAuth} />
            <Route path="/reports" component={Reports} onEnter={requireAuth} />

        </Route>

        <Route path="/" component={BasePage} auth={auth}>
            <Route path="login" component={Login} />
        </Route>

        {/* Not found handler */}
        {/*<Route path="*" component={NotFound}/>*/}

    </Router>,
    document.getElementById('app')
);
