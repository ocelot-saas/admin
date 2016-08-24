import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { OPSTATE_INIT, OPSTATE_LOADING, OPSTATE_READY, OPSTATE_FAILED, orgLoading, orgReady, orgFailed, orgClear } from '../store';
import { inventoryService } from '../services';


class Base extends React.Component {

    componentDidMount() {
        inventoryService
            .getOrgFromService()
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
	    var core = this.props.children;
	    break;
	case OPSTATE_INIT:
	case OPSTATE_LOADING:
	    var core = (
	    	<div className="app-loading">
                    <div className="line-scale">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            );
	    break;
	case OPSTATE_FAILED:
	    var core = (
	        <div>{ this.props.org.errorMessage }</div>
	    );
	    break;
	default:
	    throw new Error('Invalid opState');
	}

        return (
            <div className="wrapper">
                <Header/>

                <Sidebar/>

                <ReactCSSTransitionGroup
                    component="section"
                    transitionName="rag-fadeIn"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {React.cloneElement(core, { key: Math.random() })}
                </ReactCSSTransitionGroup>

                <Footer />
            </div>
        );
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
