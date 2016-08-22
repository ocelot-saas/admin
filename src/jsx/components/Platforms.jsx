import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input } from 'react-bootstrap';

class Platforms extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            website: {
                domainName: 'bakery-1'
            },
            callCenter: {
                phoneNumber: '',
            },
            emailCenter: {
                email: 'contact',
            }
        };
    }

    handleDomainNameChange(e) {
        this.setState({
            website: {
                domainName: e.target.value
            }
        });
    }

    handlePhoneNumberChange(e) {
        this.setState({
            callCenter: {
                phoneNumber: e.target.value
            }
        });
    }

    handleEmailChange(e) {
        this.setState({
            emailCenter: {
                email: e.target.value
            }
        });
    }

    render() {
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
value={ this.state.website.domainName }
onChange={ this.handleDomainNameChange.bind(this) }
required="required"
placeholder="Domain Name"
className="form-control"
addonAfter=".ocelot.com" />
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
                            <div className="panel-heading">Call Center</div>
                            <div className="panel-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label">Phone Number</label>
                                        <Col lg={ 10 }>
                                            <Input
                                                standalone
type="text"
value={ this.state.callCenter.phoneNumber }
onChange={ this.handlePhoneNumberChange.bind(this) }
required="required"
placeholder="Phone Number"
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
                            <div className="panel-heading">Email Center</div>
                            <div className="panel-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label className="col-lg-2 control-label">Email</label>
                                        <Col lg={ 10 }>
                                            <Input
                                                standalone
type="text"
value={ this.state.emailCenter.email }
onChange={ this.handleEmailChange.bind(this) }
required="required"
placeholder="Email"
className="form-control"
addonAfter={ `@${ this.state.website.domainName }.ocelot.com` } />
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
            </ContentWrapper>
        );
    }
}

export default Platforms;
