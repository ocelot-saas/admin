import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import BasePage from './BasePage';
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { OPSTATE_INIT, OPSTATE_LOADING, OPSTATE_READY, OPSTATE_FAILED, orgLoading, orgReady, orgFailed, orgClear } from '../store';
import { identityService, inventoryService } from '../services';


class Base extends React.Component {

    componentDidMount() {
        const accessToken = identityService.getAccessToken();
        inventoryService
            .getOrg(accessToken)
            .then((org) => {
                this.props.orgReady(org);
            })
            .catch((errorCode) => {
                if (errorCode == 404) {
                    this.context.router.push('/create-org');
                    this.props.orgClear();
                } else {
                    this.props.orgFailed(new Error('Could not perform org loading. Try again later'));
                }
            });

        this.props.orgLoading();
    }

    componentWillUnmount() {
        // TODO(horia141): cancel all pending requests.
    }

    render() {
        var core = null;

	switch (this.props.org.opState) {
	case OPSTATE_READY:
            return (
                <div className="wrapper">
                    <Header/>

                    <Sidebar/>

                    <ReactCSSTransitionGroup
                        component="section"
                        transitionName="rag-fadeIn"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        {React.cloneElement(this.props.children, { key: Math.random() })}
                    </ReactCSSTransitionGroup>

                    <Footer />
                </div>
            );
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
                    <div>{ this.props.org.errorMessage }</div>
                </BasePage>
            );
	default:
	    throw new Error('Invalid opState');
	}
    }
}


Base.contextTypes = {
    router: React.PropTypes.object.isRequired
}


function mapStateToProps(store) {
    return {
        org: store.org
    };
}


function mapDispatchToProps(dispatch) {
    return {
        orgLoading: () => dispatch(orgLoading()),
	orgReady: (org) => dispatch(orgReady(org)),
	orgFailed: (error) => dispatch(orgFailed(error)),
	orgClear: () => dispatch(orgClear())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Base);
