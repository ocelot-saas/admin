import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

import { identityService, inventoryService } from '../services';


class CreateMenuSection extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: 'Soups',
            description: 'Soups',
            loading: false
        };
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleDescriptionChange(e) {
        this.setState({description: e.target.value});
    }

    handleNext(e) {
        const accessToken = identityService.getAccessToken();
        const name = this.state.name;
        const description = this.state.description;

        inventoryService
            .createMenuSection(accessToken, name, description)
            .then((menuSection) => {
                this.context.router.push(`/menu/sections/${menuSection.id}`);
            })
            .catch((errorCode) => {
                console.log(`Error ${errorCode}`);
            });

        this.setState({loading: true});
    }

    render() {
        if (this.state.loading) {
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
        } else {
            return (
                <ContentWrapper>
                    <h3>Create A Menu Section</h3>

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
                                    </form>
                                </div>

                                <div className="panel-footer">
                                    <Button bsClass="btn btn-labeled disabled mr">
                                        <span className="btn-label"><i className="fa fa-toggle-left"></i></span> Previous
                                    </Button>
                                    <Button bsClass="btn btn-labeled btn-primary mr" onClick={this.handleNext.bind(this)}>
                                        <span className="btn-label"><i className="fa fa-toggle-right"></i></span> Create
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </ContentWrapper>
            );
        }
    }
}


CreateMenuSection.contextTypes = {
    router: React.PropTypes.object.isRequired
}


export default CreateMenuSection;
