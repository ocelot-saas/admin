import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import { inventoryService } from '../services';
import ImageGallery from './ImageGallery';


class CreateMenuItem extends React.Component {

    // screen can be:
    // - GENERAL
    // - IMAGE_SET
    // - LOADING

    constructor(props, context) {
        super(props, context);
        this.state = {
            screen: 'GENERAL',
            name: 'Tomato Soup',
	    description: '',
            keywordsStr: '',
            ingredientsStr: '',
            imageSet: []
        };
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleDescriptionChange(e) {
        this.setState({description: e.target.value});
    }

    handleKeywordsStrChange(e) {
        this.setState({keywordsStr: e.target.value});
    }

    handleIngredientsStrChange(e) {
        this.setState({ingredientsStr: e.target.value});
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
        this.setState({screen: 'IMAGE_SET'});
    }

    handleImageSetPrevious(e) {
        this.setState({screen: 'GENERAL'});
    }

    handleImageSetNext(e) {
        const wsRe = /^s*$/;
	
        var menuItemCreationRequest = {
            sectionId: parseInt(this.props.params.sectionId),
            name: this.state.name,
            description: this.state.description,
            keywords: this.state.keywordsStr.split(",").filter((k) => !wsRe.test(k)),
            ingredients: this.state.ingredientsStr.split(",").filter((k) => !wsRe.test(k)),
	    imageSet: this.state.imageSet
        };

        inventoryService
            .createMenuItem(menuItemCreationRequest)
            .then((menuItem) => {
                this.context.router.push(`/menu/items/${menuItem.id}`);
            })
            .catch((errorCode) => {
                console.log(`Error ${errorCode}`);
            });

        this.setState({screen: 'LOADING'});
    }

    render() {
        switch (this.state.screen) {
            case 'LOADING':
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
            case 'GENERAL':
                return (
                    <ContentWrapper>
                        <h3>Create A Menu Item</h3>

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
                                                    <input
                                                        type="text"
                                                        value={ this.state.keywordsStr}
                                                        onChange={ this.handleKeywordsStrChange.bind(this) }
                                                        placeholder="Keywords"
                                                        className="form-control" />
                                                </Col>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-lg-2 control-label">
                                                    Ingredients
                                                </label>
                                                <Col lg={ 10 }>
                                                    <input
                                                        type="text"
                                                        value={ this.state.ingredientsStr}
                                                        onChange={ this.handleIngredientsStrChange.bind(this) }
                                                        placeholder="Ingredients"
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
            case 'IMAGE_SET':
                return (
                    <ContentWrapper>
                        <h3>Create A Menu Item</h3>
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
    }
}


CreateMenuItem.contextTypes = {
    router: React.PropTypes.object.isRequired
}


export default CreateMenuItem;

