import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl } from 'react-bootstrap';
import { HoursRange, ExtractHours } from './HoursRange';
import 'bootstrap-tagsinput';

import { inventoryService } from './../Services';

class CreateOrg extends React.Component {
    
    // opState can be:
    // - SHOW_GENERAL: show the general properties screen
    // - SHOW_OPENING_HOURS: show the opening hours screen
    // - CREATING_ORG: the org and restaurant are being created
    // - CREATING_ORG_FAILED: the org and restaurant creation failed

    constructor(props, context) {
        super(props, context);
        this.state = {
            opState: 'SHOW_GENERAL',
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
            }
        };
    }
    
    componentDidMount() {
        $("[data-role='tagsinput']").tagsinput()    
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

    handleGeneralNext(e) {
        this.setState({opState: 'SHOW_OPENING_HOURS'});
    }

    handleOpeningHoursPrevious(e) {
        this.setState({opState: 'SHOW_GENERAL'});
    }

    handleOpeningHoursNext(e) {
        var orgCreationRequest = {
            name: this.state.name,
            description: this.state.description,
            keywords: [],
            address: this.state.address,
            openingHours: {
                weekday: ExtractHours(this.state.weekdayHours),
                saturday: ExtractHours(this.state.saturdayHours),
                sunday: ExtractHours(this.state.sundayHours)
            }
        };

        inventoryService
            .createOrgOnService(orgCreationRequest)
            .then((org) => {
                this.context.router.push('/dashboard');
            })
            .catch((error) => {
                console.log('An error', error);
                this.setState({
                    opState: 'CREATING_ORG_FAILED'
                });
            });

        this.setState({opState: 'CREATING_ORG'});
    }

    render() {
        if (this.state.opState == 'SHOW_GENERAL') {
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
                                                <input type="text" data-role="tagsinput" defaultValue="italian,family friendly,dog friendly" className="form-control" />
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
            
        } else if (this.state.opState == 'SHOW_OPENING_HOURS') {
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
                                            onChange={ this.handleMonFriHoursChange.bind(this) } />

                                        { /* Saturday opening times */ }
                                        <HoursRange
                                            xid='sat'
                                            label={ 'Saturday' }
                                            onChange={ this.handleSatHoursChange.bind(this) } />

                                        { /* Sunday opening times */ }
                                        <HoursRange
                                            xid='sun'
                                            label={ 'Sunday' }
                                            onChange={ this.handleSunHoursChange.bind(this) } />
                                    </form>
                                </div>
                                <div className="panel-footer">
                                    <Button bsClass="btn btn-labeled mr" onClick={this.handleOpeningHoursPrevious.bind(this)}>
                                        <span className="btn-label"><i className="fa fa-toggle-left"></i></span> Previous
                                    </Button>
                                    <Button bsClass="btn btn-labeled btn-primary mr" onClick={this.handleOpeningHoursNext.bind(this)}>
                                        <span className="btn-label"><i className="fa fa-check"></i></span> Create
                                    </Button>
                                </div>
                            </div>                        
                        </Col>
                    </Row>
                </ContentWrapper>
            );
        } else if (this.state.opState == 'CREATING_ORG') {
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
        } else if (this.state.opState == 'CREATING_ORG_FAILED') {
            return (
                <div>Creating org failed</div>
            );            
        } else {
            throw 'Invalid opState';
        };
    }
}

CreateOrg.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CreateOrg;
