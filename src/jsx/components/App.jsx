import React from 'react';

import { auth0Widget, identityService } from '../services';
import BasePage from './BasePage';

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
        identityService.logout();
	this.context.router.push('/login');

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
        identityService
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
                    this.context.router.push('/login');
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

        this.setState({
            globalLoading: {
               opState: 'LOADING',
               errorMessage: null
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
            return React.cloneElement(this.props.children, {
	        user: this.state.identity.user,
		onLogoutClick: this.logout.bind(this)
	    });
        } else {
            throw 'Invalid opState';
        }
    }    
}


App.contextTypes = {
    router: React.PropTypes.object.isRequired
}


export default App;
