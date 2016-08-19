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
import CreateOrg from './components/CreateOrg';

import AuthService from './AuthService';

// Init translation system
initTranslation();

class App extends React.Component {

    // States are:
    //   SHOW_LOGIN_SCREEN -- AuthService says we're not logged in -show login widget
    //   LOADING_USER -- Logged in, and will load the user data from base
    //   LOADING_USER_FAILED -- Couldn't load the user data, show an error
    //   READY -- Loaded user data, app can continue

    constructor(props) {
        super(props);

        this.auth = new AuthService(
            'jhoF46qs7sSf3wcPP1lKrYRD1TSgNTZO',
            'ocelot-saas.eu.auth0.com',
            'localhost:10001');

        this.state = {
            opState: this.auth.loggedIn() ? 'LOADING_USER' : 'SHOW_LOGIN_SCREEN',
            user: null
        };
    }

    logout() {
        this.auth.logout();
        this.setState({
            opState: 'SHOW_LOGIN_SCREEN',
            user: null
        });
    }

    componentDidMount() {
        if (this.state.opState == 'SHOW_LOGIN_SCREEN') {
            // Call this here as well, since componentDidUpdate() is not called
            // on the first render.
            this.auth.showLoginWidget();
        } else if (this.state.opState == 'LOADING_USER') {
            this.auth.getUserFromService()
                .then((user) => {
                    this.setState({
                        opState: 'READY',
                        user: user
                    });
                })
                .catch((error) => {
                    console.log('An error', error);
                    this.setState({
                        opState: 'LOADING_USER_FAILED',
                        user: null
                    });
                });
        } else {
            throw 'Invalid opState'
        }
    }

    componentWillUnmount() {
        if (this.state.opState == 'LOADING_USER') {
            // TODO(horia141): Cancel request
        }
    }

    componentDidUpdate() {
        // This is called every time the state/props change, post-render. This is where
        // we truly want to show the widget, once the DOM has been updated by React, so
        // the transitions are nicer.
        if (this.state.opState == 'SHOW_LOGIN_SCREEN') {
            this.auth.showLoginWidget();
        }
    }

    render() {
        if (this.state.opState == 'SHOW_LOGIN_SCREEN') {
            return (
                <BasePage>
                    <div className="block-center mt-xl wd-xl"></div>
                </BasePage>
            );
        } else if (this.state.opState == 'LOADING_USER') {
            return (
                <BasePage>
                   <div className="app-loading">
                       <div className="line-scale">
                           <div></div>
                           <div></div>
                           <div></div>
                           <div></div>
                           <div></div>
                       </div>
                   </div>
                </BasePage>
            );
        } else if (this.state.opState == 'LOADING_USER_FAILED') {
            return (
                <BasePage>
                    <div>Loading Failed</div>
                </BasePage>
            );
        } else if (this.state.opState == 'READY') {
            return (
                <Router history={browserHistory}>
        
                    <Redirect from="/index.html" to="/" />
        
                    <Route path="/" component={Base} user={this.state.user} onLogoutClick={this.logout.bind(this)}>
            
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
                        <Redirect from="/login" to="/" />
			<Route path="/create-org" component={CreateOrg} />
                    </Route>
        
                </Router>
            );
        } else {
            throw 'Invalid opState';
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
