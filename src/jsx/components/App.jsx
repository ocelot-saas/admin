import React from 'react';
import { connect } from 'react-redux';

import { auth0Widget, identityService } from '../services';
import { OPSTATE_INIT, OPSTATE_READY, OPSTATE_LOADING, OPSTATE_FAILED, globalLoadingReady, globalLoadingLoading, globalLoadingFailed, identityGetUser, identityLogout } from '../store';
import BasePage from './BasePage';


class App extends React.Component {

    logout() {
        identityService.logout();
	this.context.router.push('/login');
        this.props.globalLoadingReady();
        this.props.identityLogout();
    }

    componentDidMount() {
        identityService
            .getUserFromService()
            .then(({accessToken, user}) => {
                this.props.globalLoadingReady();
                this.props.identityGetUser(accessToken, user);
            })
            .catch((errorCode) => {
                if (errorCode == 401) {
                    this.context.router.push('/login');
                    this.props.identityLogout();
                    this.props.globalLoadingReady();
                } else {
                    this.props.globalLoadingFailed('Could not perform user loading. Try again later');
                    this.props.identityLogout();
                }
            });

        this.props.globalLoadingLoading();
    }

    componentWillUnmount() {
        // TOOD(horia141): cancel all pending requests.
    }

    render() {
        switch (this.props.globalLoading.opState) {
            case OPSTATE_READY:
                return React.cloneElement(this.props.children, {
	            user: this.props.identity.user,
		    onLogoutClick: this.logout.bind(this)
	        });
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
                        <div>{ this.props.globalLoading.errorMessage }</div>
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
        globalLoading: store.globalLoading,
        identity: store.identity
    };
}


function mapDispatchToProps(dispatch) {
    return {
        globalLoadingReady: () => dispatch(globalLoadingReady()),
        globalLoadingLoading: () => dispatch(globalLoadingLoading()),
        globalLoadingFailed: (errorMessage) => dispatch(globalLoadingFailed(errorMessage)),
        identityGetUser: (accessToken, user) => dispatch(identityGetUser(accessToken, user)),
        ideitityLogout: () => dispatch(identityLogout())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
