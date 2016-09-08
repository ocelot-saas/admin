import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input } from 'react-bootstrap';
import { connect } from 'react-redux';

import {
    OPSTATE_INIT, OPSTATE_LOADING, OPSTATE_READY, OPSTATE_FAILED,
    platformsWebsiteLoading, platformsWebsiteReady, platformsWebsiteFailed,
    platformsCallcenterLoading, platformsCallcenterReady, platformsCallcenterFailed,
    platformsEmailcenterLoading, platformsEmailcenterReady, platformsEmailcenterFailed } from '../store';
import { inventoryService } from '../services';

class Platforms extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            modifiedWebsite: false,
            websiteSubdomain: '[ Subdomain ]',
            modifiedCallcenter: false,
            callcenterPhoneNumber: '[ Phone Number ]',
            modifiedEmailcenter: false,
            emailcenterEmailName: '[ Email Name ]'
        };
    }

    _fullStateFromProps(props) {
        return {
            modifiedWebsite: false,
            websiteSubdomain: props.platformsWebsite.platformsWebsite.subdomain,
            modifiedCallcenter: false,
            callcenterPhoneNumber: props.platformsCallcenter.platformsCallcenter.phoneNumber,
            modifiedEmailcenter: false,
            emailcenterEmailName: props.platformsEmailcenter.platformsEmailcenter.emailName
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.platformsWebsite.opState == OPSTATE_READY
         && newProps.platformsCallcenter.opState == OPSTATE_READY
         && newProps.platformsEmailcenter.opState == OPSTATE_READY) {
            this.setState(this._fullStateFromProps(newProps));
        }
    }

    componentWillMount() {
        if (this.props.platformsWebsite.opState == OPSTATE_READY
         && this.props.platformsCallcenter.opState == OPSTATE_READY
         && this.props.platformsEmailcenter.opState == OPSTATE_READY) {
            this.setState(this._fullStateFromProps(this.props));
        }    
    }

    componentDidMount() {
        if (this.props.platformsWebsite.opState == OPSTATE_INIT
         && this.props.platformsCallcenter.opState == OPSTATE_INIT
         && this.props.platformsEmailcenter.opState == OPSTATE_INIT) {
            const getPlatformsWebsite = inventoryService.getPlatformsWebsiteFromService();
            const getPlatformsCallcenter = inventoryService.getPlatformsCallcenterFromService();
            const getPlatformsEmailcenter = inventoryService.getPlatformsEmailcenterFromService();

            Promise
                .all([getPlatformsWebsite, getPlatformsCallcenter, getPlatformsEmailcenter])
                .then(([platformsWebsite, platformsCallcenter, platformsEmailcenter]) => {
                    this.props.platformsWebsiteReady(platformsWebsite);
                    this.props.platformsCallcenterReady(platformsCallcenter);
                    this.props.platformsEmailcenterReady(platformsEmailcenter);
                })
                .catch((errorCode) => {
                    this.props.platformsWebsiteFailed(new Error('Coult not perform platforms website fetching. Try again later'));
                    this.props.platformsCallcenterFailed(new Error('Coult not perform platforms callcenter fetching. Try again later'));
                    this.props.platformsEmailcenterFailed(new Error('Coult not perform platforms emailcenter fetching. Try again later'));
                });

            this.props.platformsWebsiteLoading();
            this.props.platformsCallcenterLoading();
            this.props.platformsEmailcenterLoading();
        }
    }

    componentWillUnmount() {
        // TODO(horia141): cancel all pending requests
    }

    handleWebsiteSubdomainChange(e) {
        this.setState({
            modifiedWebsite: true,
            websiteSubdomain: e.target.value
        });
    }

    handleCallcenterPhoneNumberChange(e) {
        this.setState({
            modifiedCallcenter: true,
            callcenterPhoneNumber: e.target.value
        });
    }

    handleEmailcenterEmailNameChange(e) {
        this.setState({
            modifiedEmailcenter: true,
            emailcenterEmailName: e.target.value
        });
    }

    handleSaveWebsite(e) {
        const platformsWebsiteUpdateRequest = {
            subdomain: this.state.websiteSubdomain
        };

        inventoryService
            .updatePlatformsWebsiteFromService(platformsWebsiteUpdateRequest)
            .then((platformsWebsite) => {
                this.props.platformsWebsiteReady(platformsWebsite);
            })
            .catch((errorCode) => {
                this.props.platformsWebsiteFailed(new Error('Could not perform website platform updating. Try again later'));
            });

        this.props.platformsWebsiteLoading();
    }

    handleResetWebsite(e) {
        this.setState({
            modifiedWebsite: false,
            websiteSubdomain: this.props.platformsWebsite.platformsWebsite.subdomain
        });
    }

    handleSaveCallcenter(e) {
        const platformsCallcenterUpdateRequest = {
            phoneNumber: this.state.callcenterPhoneNumber
        };

        inventoryService
            .updatePlatformsCallcenterFromService(platformsCallcenterUpdateRequest)
            .then((platformsCallcenter) => {
                this.props.platformsCallcenterReady(platformsCallcenter);
            })
            .catch((errorCode) => {
                this.props.platformsCallcenterFailed(new Error('Could not perform callcenter platform updating. Try again later'));
            });

        this.props.platformsCallcenterLoading();
    }

    handleResetCallcenter(e) {
        this.setState({
            modifiedCallcenter: false,
            callcenterPhoneNumber: this.props.platformsCallcenter.platformsCallcenter.phoneNumber
        });
    }


    handleSaveEmailcenter(e) {
        const platformsEmailcenterUpdateRequest = {
            emailName: this.state.emailcenterEmailName
        };

        inventoryService
            .updatePlatformsEmailcenterFromService(platformsEmailcenterUpdateRequest)
            .then((platformsEmailcenter) => {
                this.props.platformsEmailcenterReady(platformsEmailcenter);
            })
            .catch((errorCode) => {
                this.props.platformsEmailcenterFailed(new Error('Could not perform emailcenter platform updating. Try again later'));
            });

        this.props.platformsEmailcenterLoading();
    }

    handleResetEmailcenter(e) {
        this.setState({
            modifiedEmailcenter: false,
            emailcenterEmailName: this.props.platformsEmailcenter.platformsEmailcenter.emailName
        });
    }    

    render() {
        const opStates = [
            this.props.platformsWebsite.opState,
            this.props.platformsCallcenter.opState,
            this.props.platformsEmailcenter.opState
        ];
        
        var compositeState;
        if (opStates.every((s) => { return s == OPSTATE_READY; })) {
           // All states are "ready".
           compositeState = OPSTATE_READY;
        } else if (opStates.every((s) => { return s != OPSTATE_FAILED; })) {
           // Not all states are "ready", but all of them have not failed.
           compositeState = OPSTATE_LOADING;
        } else {
           // Some state is failed.
           compositeState = OPSTATE_FAILED;
        }

        switch (compositeState) {
        case OPSTATE_INIT:
        case OPSTATE_LOADING:
            return (
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
        case OPSTATE_FAILED:
            if (this.props.platformsWebsite.opState == OPSTATE_FAILED) {
                return (<div>{ this.props.platformsWebsite.errorMessage }</div>);
            } else if (this.props.platformsCallcenter.opState == OPSTATE_FAILED) {
                return (<div>{ this.props.platformsCallcenter.errorMessage }</div>);
            } else if (this.props.platformsEmailcenter.opState == OPSTATE_FAILED) {
                return (<div>{ this.props.platformsEmailcenter.errorMessage }</div>);
            } else {
                throw new Error('This should never happen');
            }
        case OPSTATE_READY:
            return (
                <ContentWrapper>
                    <div className="content-heading">
                        Platforms
                        <small>Platforms settings</small>
                    </div>
                    <Row>
                        <Col sm={ 12 }>
                            <div className="panel panel-default">
                                <div className="panel-heading">Website</div>
                                <div className="panel-body">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-lg-2 control-label">Domain Name</label>
                                            <Col lg={ 10 }>
                                                <Input
                                                    standalone
                                                    type="text"
                                                    value={ this.state.websiteSubdomain }
                                                    onChange={ this.handleWebsiteSubdomainChange.bind(this) }
                                                    required="required"
                                                    placeholder="Subdomain"
                                                    className="form-control"
                                                    addonAfter=".ocelot.com" />
                                            </Col>
                                        </div>
                                    </form>
                                </div>
                                <div className="panel-footer">
                                    <Button
                                        bsClass="btn btn-labeled btn-primary mr"
                                        disabled={!this.state.modifiedWebsite}
                                        onClick={this.handleSaveWebsite.bind(this)}>
                                        <span className="btn-label"><i className="fa fa-check"></i></span> Save
                                    </Button>
                                    <Button
                                        bsClass="btn btn-labeled mr"
                                        onClicks={this.handleResetWebsite.bind(this)}>
                                        <span className="btn-label"><i className="fa fa-times"></i></span> Revert
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={ 12 }>
                            <div className="panel panel-default">
                                <div className="panel-heading">Call Center</div>
                                <div className="panel-body">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-lg-2 control-label">Phone Number</label>
                                            <Col lg={ 10 }>
                                                <Input
                                                    standalone
                                                    type="text"
                                                    value={ this.state.callcenterPhoneNumber }
                                                    onChange={ this.handleCallcenterPhoneNumberChange.bind(this) }
                                                    required="required"
                                                    placeholder="Phone Number"
                                                    className="form-control" />
                                            </Col>
                                        </div>
                                    </form>
                                </div>
                                <div className="panel-footer">
                                    <Button
                                        bsClass="btn btn-labeled btn-primary mr"
                                        disabled={!this.state.modifiedCallcenter}
                                        onClick={this.handleSaveCallcenter.bind(this)}>
                                        <span className="btn-label"><i className="fa fa-check"></i></span> Save
                                    </Button>
                                    <Button
                                        bsClass="btn btn-labeled mr"
                                        onClick={this.handleResetCallcenter.bind(this)}>
                                        <span className="btn-label"><i className="fa fa-times"></i></span> Revert
                                    </Button>
                                </div>
                            </div>          
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={ 12 }>
                            <div className="panel panel-default">
                                <div className="panel-heading">Email Center</div>
                                <div className="panel-body">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-lg-2 control-label">Email</label>
                                            <Col lg={ 10 }>
                                                <Input
                                                    standalone
                                                    type="text"
                                                    value={ this.state.emailcenterEmailName }
                                                    onChange={ this.handleEmailcenterEmailNameChange.bind(this) }
                                                    required="required"
                                                    placeholder="Email"
                                                    className="form-control"
                                                    addonAfter={ `@${ this.state.websiteSubdomain }.ocelot.com` } />
                                            </Col>
                                        </div>
                                    </form>
                                </div>
                                <div className="panel-footer">
                                    <Button
                                        bsClass="btn btn-labeled btn-primary mr"
                                        disabled={!this.state.modifiedEmailcenter}
                                        onClick={this.handleSaveEmailcenter.bind(this)}>
                                        <span className="btn-label"><i className="fa fa-check"></i></span> Save
                                    </Button>
                                    <Button
                                        bsClass="btn btn-labeled mr"
                                        onClick={this.handleResetEmailcenter.bind(this)}>
                                        <span className="btn-label"><i className="fa fa-times"></i></span> Revert
                                    </Button>
                                </div>
                            </div>          
                        </Col>
                    </Row>
                </ContentWrapper>
            );
        default:
            throw new Error('This should never happen either');
        }           
    }
}


function mapStateToProps(store) {
    return {
        platformsWebsite: store.platformsWebsite,
        platformsCallcenter: store.platformsCallcenter,
        platformsEmailcenter: store.platformsEmailcenter
    };
}


function mapDispatchToProps(dispatch) {
    return {
        platformsWebsiteLoading: () => dispatch(platformsWebsiteLoading()),
        platformsWebsiteReady: (platformsWebsite) => dispatch(platformsWebsiteReady(platformsWebsite)),
        platformsWebsiteFailed: (error) => dispatch(platformsWebsiteFailed(error)),
        platformsCallcenterLoading: () => dispatch(platformsCallcenterLoading()),
        platformsCallcenterReady: (platformsCallcenter) => dispatch(platformsCallcenterReady(platformsCallcenter)),
        platformsCallcenterFailed: (error) => dispatch(platformsCallcenterFailed(error)),
        platformsEmailcenterLoading: () => dispatch(platformsEmailcenterLoading()),
        platformsEmailcenterReady: (platformsEmailcenter) => dispatch(platformsEmailcenterReady(platformsEmailcenter)),
        platformsEmailcenterFailed: (error) => dispatch(platformsEmailcenterFailed(error))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Platforms);
