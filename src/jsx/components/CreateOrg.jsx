import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import { HoursRange } from './HoursRange';
import { ExtractHours } from '../common/hours';
import ImageGallery from './ImageGallery';
import { OPSTATE_INIT, OPSTATE_LOADING, OPSTATE_READY, OPSTATE_FAILED, orgLoading, orgReady, orgFailed, orgClear } from '../store';
import { identityService, inventoryService } from '../services';


class CreateOrg extends React.Component {
    
    // screen can be:
    // - GENERAL: show the general properties screen
    // - OPENING_HOURS: show the opening hours screen
    // - IMAGE_SET: show the pictures screen

    constructor(props, context) {
        super(props, context);
        this.state = {
            screen: 'GENERAL',
            name: 'Horia\'s Kitchen',
            description: 'Fancy french restaurant',
            address: 'Sector 2, Bucharest',
            weekdayHours: {
                nonStop: false,
                start: '07:00 AM',
                end: '10:00 PM'
            },
            saturdayHours: {
                nonStop: false,
                start: '07:00 AM',
                end: '10:00 PM'
            },
            sundayHours: {
                nonStop: false,
                start: '07:00 AM',
                end: '10:00 PM'
            },
            imageSet: []
        };
    }
    
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleDescriptionChange(e) {
        this.setState({description: e.target.value});
    }

    handleAddressChange(e) {
        this.setState({address: e.target.value});
    }

    handleMonFriHoursChange(e) {
        this.setState({weekdayHours: e});
    }

    handleSatHoursChange(e) {
        this.setState({saturdayHours: e});
    }

    handleSunHoursChange(e) {
        this.setState({sundayHours: e});
    }

    handleImageAdded(e) {
        this.setState({
	    imageSet: update(this.state.imageSet, {$push: [{
	        orderNo: this.state.imageSet.length,
		uri: e.uri,
		width: e.width,
		height: e.height
	    }]})
	})
    }

    handleImageRemoved(e) {
        const newImageSet = update(this.state.imageSet, {$splice: [[e.orderNo, 1]]});

        for (var i = 0; i < newImageSet.length; i++)
	    newImageSet[i].orderNo = i;
	    
        this.setState({
	    imageSet: newImageSet
	});
    }

    handleGeneralNext(e) {
        this.setState({screen: 'OPENING_HOURS'});
    }

    handleOpeningHoursPrevious(e) {
        this.setState({screen: 'GENERAL'});
    }

    handleOpeningHoursNext(e) {
        this.setState({screen: 'IMAGE_SET'});
    }

    handleImageSetPrevious(e) {
        this.setState({screen: 'OPENING_HOURS'});
    }

    handleImageSetNext(e) {
        const accessToken = identityService.getAccessToken();
        const name = this.state.name;
        const description = this.state.description;
        const keywords = [];
        const address = this.state.address;
        const openingHours = {
            weekday: ExtractHours(this.state.weekdayHours),
            saturday: ExtractHours(this.state.saturdayHours),
            sunday: ExtractHours(this.state.sundayHours)
        };
	const imageSet = this.state.imageSet;

        inventoryService
            .createOrg(accessToken, name, description, keywords, address, openingHours, imageSet)
            .then((org) => {
                this.context.router.push('/dashboard');
                this.props.orgReady(org);
            })
            .catch((error) => {
                this.props.orgFailed(new Error('Could not perform org creation. Try again later'));
            });

        this.props.orgLoading();
    }

    render() {
        switch (this.props.org.opState) {
            case OPSTATE_INIT:
            case OPSTATE_READY:
                switch (this.state.screen) {
                    case 'GENERAL':
                        return (
                            <ContentWrapper>
                                <h3>Create Your Restaurant</h3>

                                <Row>
                                    <Col sm={ 12 }>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">General</div>
                                            <div className="panel-body">
                                                <form className="form-horizontal">
                                                    <div className="form-group">
                                                        <label className="col-lg-2 control-label">Name</label>

                                                        <Col lg={ 10 }>
                                                            <Input
                                                                standalone
                                                                type="text"
                                                                value={ this.state.name }
                                                                onChange={ this.handleNameChange.bind(this) }
                                                                required="required"
                                                                placeholder="Name"
                                                                className="form-control" />
                                                        </Col>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-lg-2 control-label">Description</label>
                                                        <Col lg={ 10 }>
                                                            <textarea
                                                                value={ this.state.description }
                                                                onChange={ this.handleDescriptionChange.bind(this) }
                                                                required="required"
                                                                placeholder="Description"
                                                                rows="5"
                                                                className="form-control" />
                                                        </Col>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-lg-2 control-label">
                                                            Keywords
                                                        </label>
                                                        <Col lg={ 10 }>
                                                            <input type="text" defaultValue="italian,family friendly,dog friendly" className="form-control" />
                                                        </Col>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-lg-2 control-label">Address</label>
                                                        <Col lg={ 10 }>
                                                            <Input
                                                                standalone
                                                                type="text"
                                                                value={ this.state.address }
                                                                onChange={ this.handleAddressChange.bind(this) }
                                                                required="required"
                                                                placeholder="Address"
                                                                className="form-control" />
                                                        </Col>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="panel-footer">
                                                <Button bsClass="btn btn-labeled disabled mr">
                                                    <span className="btn-label"><i className="fa fa-toggle-left"></i></span> Previous
                                                </Button>
                                                <Button bsClass="btn btn-labeled btn-primary mr" onClick={this.handleGeneralNext.bind(this)}>
                                                    <span className="btn-label"><i className="fa fa-toggle-right"></i></span> Next
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                            </ContentWrapper>
                        );
                    case 'OPENING_HOURS':
                        return (
                            <ContentWrapper>
                                <h3>Create Your Restaurant</h3>
                                <Row>
                                    <Col sm={ 12 }>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">Opening Hours</div>
                                            <div className="panel-body">
                                                <form className="form-horizontal">
                                                    { /* Monday to Friday opening times */ }
                                                    <HoursRange
                                                        xid='mon-fri'
                                                        label={ 'Mon-Fri' }
                                                        hours={this.state.weekdayHours}
                                                        onChange={this.handleMonFriHoursChange.bind(this)} />

                                                    { /* Saturday opening times */ }
                                                    <HoursRange
                                                        xid='sat'
                                                        label={ 'Saturday' }
                                                        hours={this.state.saturdayHours}
                                                        onChange={this.handleSatHoursChange.bind(this)} />

                                                    { /* Sunday opening times */ }
                                                    <HoursRange
                                                        xid='sun'
                                                        label={ 'Sunday' }
                                                        hours={this.state.sundayHours}
                                                        onChange={this.handleSunHoursChange.bind(this)} />
                                                </form>
                                            </div>
                                            <div className="panel-footer">
                                                <Button bsClass="btn btn-labeled mr" onClick={this.handleOpeningHoursPrevious.bind(this)}>
                                                    <span className="btn-label"><i className="fa fa-toggle-left"></i></span> Previous
                                                </Button>
                                                <Button bsClass="btn btn-labeled btn-primary mr" onClick={this.handleOpeningHoursNext.bind(this)}>
                                                    <span className="btn-label"><i className="fa fa-toggle-right"></i></span> Next
                                                </Button>
                                            </div>
                                        </div>                        
                                    </Col>
                                </Row>
                            </ContentWrapper>
                        );
                    case 'IMAGE_SET':
                        return (
                            <ContentWrapper>
                                <h3>Create Your Restaurant</h3>
                                <Row>
                                    <Col sm={ 12 }>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">Pictures</div>
                                            <div className="panel-body">
                                                <ImageGallery
				                    imageSet={this.state.imageSet}
                                                    onImageAdded={this.handleImageAdded.bind(this)}
                                                    onImageRemoved={this.handleImageRemoved.bind(this)} />
                                            </div>
                                            <div className="panel-footer">
                                                <Button
                                                    bsClass="btn btn-labeled mr"
                                                    onClick={this.handleImageSetPrevious.bind(this)}>
                                                    <span className="btn-label"><i className="fa fa-toggle-left"></i></span> Previous
                                                </Button>
                                                <Button
				                    bsClass="btn btn-labeled btn-primary mr"
                                                    onClick={this.handleImageSetNext.bind(this)}>
                                                    <span className="btn-label"><i className="fa fa-check"></i></span> Create
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </ContentWrapper>
                        );                            
                    default:
                        throw new Error('Invalid screen');
                }
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
                return (
                    <div>{ this.props.org.errorMessage }</div>
                );
            default:
                throw new Error('Invalid opState');
        }
    }
}


CreateOrg.contextTypes = {
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateOrg);
