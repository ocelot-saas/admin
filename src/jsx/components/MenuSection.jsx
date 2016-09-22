import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Input, Row, Col, Panel, Button, Alert, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import {
    OPSTATE_INIT, OPSTATE_LOADING, OPSTATE_READY, OPSTATE_FAILED,
    currentMenuSectionLoading, currentMenuSectionReady, currentMenuSectionFailed, currentMenuSectionClear } from '../store';
import { inventoryService } from '../services';


class MenuSection extends React.Component {

    constructor(props, context) {
        super(props, context);
	this.state = {
	    modifiedGeneral: false,
            name: '[ Name ]',
            description: '[ Description ]',
        };
    }

    _fullStateFromProps(props) {
        return {
	    modifiedGeneral: false,
	    name: props.currentMenuSection.currentMenuSection.name,
	    description: props.currentMenuSection.currentMenuSection.description
	};
    }

    componentWillReceiveProps(newProps) {
        if (newProps.currentMenuSection.opState == OPSTATE_READY) {
            this.setState(this._fullStateFromProps(newProps));
        }
    }

    componentWillMount() {
        if (this.props.currentMenuSection.opState == OPSTATE_READY) {
            this.setState(this._fullStateFromProps(this.props));
        }
    }

    componentDidMount() {
        $("[data-role='tagsinput']").tagsinput()

	if (this.props.currentMenuSection.opState == OPSTATE_INIT) {
	    inventoryService
	        .getMenuSection(this.props.params.sectionId)
		.then((menuSection) => {
		    this.props.currentMenuSectionReady(menuSection);
		})
		.catch((errorCode) => {
		    this.props.currentMenuSectionFailed(new Error('Could not perform menu section fetching. Try again later'));
                });

            this.props.currentMenuSectionLoading();
	}
    }

    componentWillUnmount() {
        // TODO(horia141): cancel all pending requests
        this.props.currentMenuSectionClear();
    }

    handleNameChange(e) {
        this.setState({
            modifiedGeneral: true,
            name: e.target.value
        });
    }

    handleDescriptionChange(e) {
        this.setState({
            modifiedGeneral: true,
            description: e.target.value
        });
    }

    handleSaveGeneral(e) {
        const menuSectionUpdateRequest = {
            name: this.state.name,
            description: this.state.description
        };

        inventoryService
            .updateMenuSection(this.props.params.sectionId, menuSectionUpdateRequest)
            .then((menuSection) => {
                this.props.currentMenuSectionReady(menuSection);
            })
            .catch((errorCode) => {
                this.props.currentMenuSectionFailed(new Error('Could not perform menu section updating. Try again later'));
            });

        this.props.currentMenuSectionLoading();
    }

    handleResetGeneral(e) {
        this.setState({
            modifiedGeneral: false,
            name: this.props.currentMenuSection.currentMenuSection.name,
            description: this.props.currentMenuSection.currentMenuSection.description,
        });
    }

    render() {
        switch (this.props.currentMenuSection.opState) {
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
            return (<div>{ this.props.currentMenuSection.errorMessage }</div>);
        case  OPSTATE_READY:
            return (
                <ContentWrapper>
                    <h3>
                        { this.props.currentMenuSection.currentMenuSection.name }
                        <small>MenuSection #{this.props.params.sectionId}</small>
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
                                   <Button
                                       bsClass="btn btn-labeled btn-primary mr"
                                       disabled={!this.state.modifiedGeneral}
                                       onClick={this.handleSaveGeneral.bind(this)}>
                                       <span className="btn-label"><i className="fa fa-check"></i></span> Save
                                   </Button>
                                   <Button
                                       bsClass="btn btn-labeled mr"
                                       onClick={this.handleResetGeneral.bind(this)}>
                                       <span className="btn-label"><i className="fa fa-times"></i></span> Revert
                                   </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={ 12 }>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <Button bsClass="btn btn-sm btn-labeled btn-success mr pull-right">
                                        <span className="btn-label"><i className="icon-plus"></i></span> Add
                                    </Button>
                                    Food & Drinks
                                </div>

                                <div className="panel-body">
                                    <div className="list-group">

                                        <div className="media p mt0 list-group-item">
                                            <span className="close">&times;</span>
                                            <span className="pull-left">
                                                <img src="/img/mood04.jpg" className="media-object img-circle thumb32" />
                                            </span>
                                            <Row>
                                                <Col md={ 3 }>
                                                    <span className="media-body">
                                                        <span className="media-heading">
                                                            <strong>Tomato Soup</strong>
                                                            <br/>
                                                            <small className="text-muted">A soup made from fresh tomatoes</small>
                                                        </span>
                                                    </span>
                                                </Col>
                                                <Col md={ 3 }>
                                                    <span className="media-body">
                                                        <span className="media-heading">
                                                            <strong>Tomato, Salt</strong>
                                                            <br/>
                                                            <small className="text-muted">And 2 other ingredients</small>
                                                        </span>
                                                    </span>
                                                </Col>
                                                <Col md={ 4 }>
                                                    <ul className="list-inline m0">
                                                        <li><div className="badge bg-green">vegetarian</div></li>
                                                        <li><div className="badge bg-green">italian</div></li>
                                                        <li><div className="badge bg-purple">more</div></li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="media p mt0 list-group-item">
                                            <span className="close">&times;</span>
                                            <span className="pull-left">
                                                <img src="/img/mood05.jpg" className="media-object img-circle thumb32" />
                                            </span>
                                            <Row>
                                                <Col md={ 3 }>
                                                    <span className="media-body">
                                                        <span className="media-heading">
                                                            <strong>Pasta Carbonara</strong>
                                                            <br/>
                                                            <small className="text-muted">Since carbonara pastas</small>
                                                        </span>
                                                    </span>
                                                </Col>
                                                <Col md={ 3 }>
                                                    <span className="media-body">
                                                        <span className="media-heading">
                                                            <strong>Pasta, Cream</strong>
                                                            <br/>
                                                            <small className="text-muted">And 5 other ingredients</small>
                                                        </span>
                                                    </span>
                                                </Col>
                                                <Col md={ 4 }>
                                                    <ul className="list-inline m0">
                                                        <li><div className="badge bg-green">pasta</div></li>
                                                        <li><div className="badge bg-green">italian</div></li>
                                                        <li><div className="badge bg-purple">more</div></li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="media p mt0 list-group-item">
                                            <span className="close">&times;</span>
                                            <span className="pull-left">
                                                <img src="/img/mood01.jpg" className="media-object img-circle thumb32" />
                                            </span>
                                            <Row>
                                                <Col md={ 3 }>
                                                    <span className="media-body">
                                                        <span className="media-heading">
                                                            <strong>Pasta Bolognese</strong>
                                                            <br/>
                                                            <small className="text-muted">Meaty pastas</small>
                                                        </span>
                                                    </span>
                                                </Col>
                                                <Col md={ 3 }>
                                                    <span className="media-body">
                                                        <span className="media-heading">
                                                            <strong>Pasta, Tomato Sauce</strong>
                                                            <br/>
                                                            <small className="text-muted">And 5 other ingredients</small>
                                                        </span>
                                                    </span>
                                                </Col>
                                                <Col md={ 4 }>
                                                    <ul className="list-inline m0">
                                                        <li><div className="badge bg-green">italian</div></li>
                                                        <li><div className="badge bg-green">pasta</div></li>
                                                        <li><div className="badge bg-purple">more</div></li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>
    
                                        <div className="media p mt0 list-group-item">
                                            <span className="close">&times;</span>
                                            <span className="pull-left">
                                                <img src="/img/mood02.jpg" className="media-object img-circle thumb32" />
                                            </span>
                                            <Row>
                                                <Col md={ 3 }>
                                                    <span className="media-body">
                                                        <span className="media-heading">
                                                            <strong>Beck's</strong>
                                                            <br/>
                                                            <small className="text-muted">Dutch beer</small>
                                                        </span>
                                                    </span>
                                                </Col>
                                                <Col md={ 3 }>
                                                    <span className="media-body">
                                                        <span className="media-heading">
                                                            <strong>Regular Beer Ingredients</strong>
                                                            <br/>
                                                        </span>
                                                    </span>
                                                </Col>
                                                <Col md={ 4 }>
                                                    <ul className="list-inline m0">
                                                        <li><div className="badge bg-green">alcoholic</div></li>
                                                        <li><div className="badge bg-green">beer</div></li>
                                                        <li><div className="badge bg-purple">more</div></li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
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
	default:
            throw new Error('Invalid opState');
        }	
    }
}


function mapStateToProps(store) {
    return {
        currentMenuSection: store.currentMenuSection
    };
}


function mapDispatchToProps(dispatch) {
    return {
        currentMenuSectionLoading: () => dispatch(currentMenuSectionLoading()),
        currentMenuSectionReady: (currentMenuSection) => dispatch(currentMenuSectionReady(currentMenuSection)),
        currentMenuSectionFailed: (error) => dispatch(currentMenuSectionFailed(error)),
        currentMenuSectionClear: () => dispatch(currentMenuSectionClear())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuSection);