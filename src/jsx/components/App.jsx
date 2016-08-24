import React from 'react';
import { connect } from 'react-redux';

import { auth0Widget, identityService } from '../services';
import { OPSTATE_INIT, OPSTATE_LOADING, OPSTATE_READY, OPSTATE_FAILED, identityLoading, identityReady, identityFailed, identityClear } from '../store';
import BasePage from './BasePage';


class App extends React.Component {

    componentDidMount() {
        identityService
            .getUserFromService()
            .then(({accessToken, user}) => {
	        this.props.identityReady(accessToken, user);
            })
            .catch((errorCode) => {
                if (errorCode == 401) {
                    this.context.router.push('/login');
		    this.props.identityClear();
                } else {
		    this.props.identityFailed(new Error('Could not perform user loading. Try again later'));
                }
            });

	this.props.identityLoading();
    }

    componentWillUnmount() {
        // TOOD(horia141): cancel all pending requests.
    }

    render() {
        switch (this.props.identity.opState) {
            case OPSTATE_READY:
                return this.props.children;
            case OPSTATE_INIT:
            case OPSTATE_LOADING:
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
            case OPSTATE_FAILED:
                return (
                    <BasePage>
                        <div>Loading Failed</div>
                        <div>{ this.props.identity.errorMessage }</div>
                    </BasePage>
                );
            default:
                throw 'Invalid opState';
        }
    }    
}


App.contextTypes = {
    router: React.PropTypes.object.isRequired
}


function mapStateToProps(store) {
    return {
        identity: store.identity
    };
}


function mapDispatchToProps(dispatch) {
    return {
    	identityLoading: () => dispatch(identityLoading()),
	identityReady: (accessToken, user) => dispatch(identityReady(accessToken, user)),
	identityFailed: (error) => dispatch(identityFailed(error)),
	identityClear: () => dispatch(identityClear()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
