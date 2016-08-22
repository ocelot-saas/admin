import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRedirect, Redirect, browserHistory } from 'react-router';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';

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

import { auth0Widget, authService } from './services';

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            globalLoading: {
                opState: 'READY',
                errorMessage: null
            },
            identity: {
                accessToken: null,
                user: null
            }
        };
    }

    logout() {
        authService.logout();
        this.setState({
            globalLoading: {
                opState: 'READY',
                errorMessage: null,
            },
            identity: {
                accessToken: null,
                user: null
            }
        });
    }

    componentWillMount() {
        this.setState({
            globalLoading: {
               opState: 'LOADING',
               errorMessage: null
            }
        });

        authService
            .getUserFromService()
            .then(({accessToken, user}) => {
                this.setState({
                    globalLoading: {
                        opState: 'READY',
                        errorMessage: null
                    },
                    identity: {
                        accessToken: accessToken,
                        user: user
                    }
                });
            })
            .catch((errorCode) => {
                if (errorCode == 401) {
                    this.setState({
                        globalLoading: {
                            opState: 'READY',
                            errorMessage: null
                        },
                        identity: {
                            accessToken: null,
                            user: null
                        }
                    });
                    
                    this.context.router.push('/login');
                } else {
                    this.setState({
                        globalLoading: {
                            opState: 'FAILED',
                            errorMessage: 'Could not perform user loading. Try again later'
                        },
                        identity: {
                            accessToken: null,
                            user: null
                        }
                    });
                }
            });
    }

    componentWillUnmount() {
        // TOOD(horia141): cancel all pending requests.
    }

    render() {
        if (this.state.globalLoading.opState == 'LOADING') {
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
        } else if (this.state.globalLoading.opState == 'FAILED') {
            return (
                <BasePage>
                    <div>Loading Failed</div>
                </BasePage>
            );
        } else if (this.state.globalLoading.opState == 'READY') {
            return (
                <Router history={browserHistory}>
        
                    <Redirect from="/index.html" to="/" />
        
                    <Route path="/" component={Base} user={this.state.identity.user} onLogoutClick={this.logout.bind(this)}>
            
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
        
                </Router>
            );
        } else {
            throw 'Invalid opState';
        }
    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
