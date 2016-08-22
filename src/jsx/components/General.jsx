import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl } from 'react-bootstrap';
import { HoursRange } from './HoursRange';
import ImageGallery from './ImageGallery';
import 'bootstrap-tagsinput';

class General extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: 'Horia\'s Kitchen',
            desc: 'Fancy french restaurant',
            address: 'Sector 2, Bucharest',
            monFriHours: {
                nonStop: false,
                start: '07:00 AM',
                end: '10:00 PM'
            },
            satHours: {
                nonStop: false,
                start: '07:00 AM',
                end: '10:00 PM'
            },
            sunHours: {
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

    handleDescChange(e) {
        this.setState({desc: e.target.value});
    }

    handleAddressChange(e) {
        this.setState({address: e.target.value});
    }

    handleMonFriHoursChange(e) {
        this.setState({monFriHours: e});
    }

    handleSatHoursChange(e) {
        this.setState({satHours: e});
    }

    handleSunHoursChange(e) {
        this.setState({sunHours: e});
    }

    render() {
        return (
            <ContentWrapper>
                <h3>
                    General
                    <small>Restaurant general settings</small>
                </h3>

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
                                                value={ this.state.desc }
                                                onChange={ this.handleDescChange.bind(this) }
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
                                <Button bsClass="btn btn-labeled btn-primary mr">
                                    <span className="btn-label"><i className="fa fa-check"></i></span> Save
                                </Button>
                                <Button bsClass="btn btn-labeled mr">
                                    <span className="btn-label"><i className="fa fa-times"></i></span> Revert
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col sm={ 12 }>
                        <div className="panel panel-default">
                            <div className="panel-heading">Opening Hours</div>
                            <div className="panel-body">
                                <form className="form-horizontal">
                                    <HoursRange
                                        xid="mon-fri"
                                        xlabel="Mon-Fri"
                                        onChange={ this.handleMonFriHoursChange.bind(this) } />

                                    <HoursRange
                                        xid='sat'
                                        xlabel={ 'Saturday' }
                                        onChange={ this.handleSatHoursChange.bind(this) } />

                                    <HoursRange
                                        xid='sun'
                                        xlabel={ 'Sunday' }
                                        onChange={ this.handleSunHoursChange.bind(this) } />
                                </form>
                            </div>
                            <div className="panel-footer">
                                <Button bsClass="btn btn-labeled btn-primary mr">
                                    <span className="btn-label"><i className="fa fa-check"></i></span> Save
                                </Button>
                                <Button bsClass="btn btn-labeled mr">
                                    <span className="btn-label"><i className="fa fa-times"></i></span> Revert
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                

                <Row>
                    <Col sm={ 12 }>
                        <div className="panel panel-default">
                            <div className="panel-heading">Pictures</div>
                            <div className="panel-body">
                                <ImageGallery />
                            </div>
                            <div className="panel-footer">
                                <Button bsClass="btn btn-labeled btn-primary mr">
                                    <span className="btn-label"><i className="fa fa-check"></i></span> Save
                                </Button>
                                <Button bsClass="btn btn-labeled mr">
                                    <span className="btn-label"><i className="fa fa-times"></i></span> Revert
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>

            </ContentWrapper>
        );
    }
}


export default General;
