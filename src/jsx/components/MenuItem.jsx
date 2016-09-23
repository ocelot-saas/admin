import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Input, Row, Col, Panel, Button, Alert, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import SweetAlert from 'react-swal';
import 'bootstrap-tagsinput';


import ImageGallery from './ImageGallery';
import {
    OPSTATE_INIT, OPSTATE_LOADING, OPSTATE_READY, OPSTATE_FAILED,
    currentMenuItemLoading, currentMenuItemReady, currentMenuItemFailed, currentMenuItemClear } from '../store';
import { inventoryService } from '../services';


class MenuItem extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            modifiedGeneral: false,
            name: '[ Name ]',
            description: '[ Description ]',
            keywordsStr: '',
            ingredientsStr: '',
            modifiedImageSet: false,
	    removedFromImageSet: false,
            showAYSRemoveImagesDialog: false,
	    imageSet: []
        };
    }

    _fullStateFromProps(props) {
        return {
            modifiedGeneral: false,
            name: props.currentMenuItem.currentMenuItem.name,
            description: props.currentMenuItem.currentMenuItem.description,
            keywordsStr: props.currentMenuItem.currentMenuItem.keywords.join(),
            ingredientsStr: props.currentMenuItem.currentMenuItem.ingredients.join(),
            modifiedImageSet: false,
	    removedFromImageSet: false,
            showAYSRemoveImagesDialog: false,
            imageSet: props.currentMenuItem.currentMenuItem.imageSet
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.currentMenuItem.opState == OPSTATE_READY) {
            this.setState(this._fullStateFromProps(newProps));
        }
    }

    componentWillMount() {
        if (this.props.currentMenuItem.opState == OPSTATE_READY) {
            this.setState(this._fullStateFromProps(this.props));
        }
    }

    componentDidMount() {
        $("[data-role='tagsinput']").tagsinput()

        if (this.props.currentMenuItem.opState == OPSTATE_INIT) {
            inventoryService
                .getMenuItem(this.props.params.itemId)
                .then((menuItem) => {
                    this.props.currentMenuItemReady(menuItem);
                })
                .catch((errorCode) => {
                    this.props.currentMenuItemFailed(new Error('Could not perform menu item fetching. Try again later'));
                });

            this.props.currentMenuItemLoading();
        }
    }

    componentWillUnmount() {
        // TODO(horia141): cancel all pending requests
        this.props.currentMenuItemClear();
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

    handleKeywordsStrChange(e) {
        this.setState({
            modifiedGeneral: true,
            keywordsStr: e.target.value
        });
    }

    handleIngredientsStrChange(e) {
        this.setState({
            modifiedGeneral: true,
            ingredientsStr: e.target.value
        });
    }

    handleImageAdded(e) {
        this.setState({
	    modifiedImageSet: true,
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
	    modifiedImageSet: true,
	    removedFromImageSet: true,
	    imageSet: newImageSet
	});
    }

    handleSaveGeneral(e) {
        const wsRe = /^s*$/;
	
        const menuItemUpdateRequest = {
            name: this.state.name,
            description: this.state.description,
            keywords: this.state.keywordsStr.split(",").filter((k) => !wsRe.test(k)),
            ingredients: this.state.ingredientsStr.split(",").filter((k) => !wsRe.test(k))
        };

        inventoryService
            .updateMenuItem(this.props.params.itemId, menuItemUpdateRequest)
            .then((menuItem) => {
                this.props.currentMenuItemReady(menuItem);
            })
            .catch((errorCode) => {
                this.props.currentMenuItemFailed(new Error('Could not perform menu item updating. Try again later'));
            });

        this.props.currentMenuItemLoading();
    }

    handleResetGeneral(e) {
        this.setState({
            modifiedGeneral: false,
            name: this.props.currentMenuItem.currentMenuItem.name,
            description: this.props.currentMenuItem.currentMenuItem.description,
            keywordsStr: this.props.currentMenuItem.currentMenuItem.keywords.join(),
            ingredientsStr: this.props.currentMenuItem.currentMenuItem.ingredients.join()
        });
    }

    handleSaveImages(e) {
        if (this.state.removedFromImageSet) {
            this.setState({showAYSRemoveImagesDialog: true});
        } else {
            this._handleSaveImages();
        }
    }

    handleSaveImagesFromDialog(confirmed) {
        this.setState({
            showAYSRemoveImagesDialog: false
        });
        
        if (confirmed) {
            this._handleSaveImages();
        }
    }

    _handleSaveImages() {
        const menuItemUpdateRequest = {
	    imageSet: this.state.imageSet
	};

	inventoryService
	    .updateMenuItem(this.props.params.itemId, menuItemUpdateRequest)
	    .then((menuItem) => {
                this.props.currentMenuItemReady(menuItem);
            })
            .catch((errorCode) => {
                this.props.currentMenuItemFailed(new Error('Could not perform menu item updating. Try again later'));
            });

        this.props.currentMenuItemLoading();
    }

    handleResetImages(e) {
        this.setState({
            modifiedImageSet: false,
	    removedFromImageSet: false,
	    imageSet: this.props.currentMenuItem.currentMenuItem.imageSet
        });
    }

    render() {
        switch (this.props.currentMenuItem.opState) {
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
            return (<div>{ this.props.currentMenuItem.errorMessage }</div>);
        case  OPSTATE_READY:
            return (
                <ContentWrapper>
                    <h3>
                        { this.props.currentMenuItem.currentMenuItem.name }
                        <small>Food Item #{this.props.params.itemId}</small>
                    </h3>

                    <SweetAlert
                        isOpen={this.state.showAYSRemoveImagesDialog}
                        type="warning"
                        title="Are you sure?"
                        text="You've removed pictures. Are you sure you want to go ahead?"
                        confirmButtonText="Yes"
                        cancelButtonText="No"
                        callback={this.handleSaveImagesFromDialog.bind(this)} />

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
                                                    data-role="tagsinput"
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
                                                    data-role="tagsinput"
                                                    value={ this.state.ingredientsStr}
                                                    onChange={ this.handleIngredientsStrChange.bind(this) }
                                                    placeholder="Ingredients"
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
                                <div className="panel-heading">Pictures</div>
                                <div className="panel-body">
                                    <ImageGallery
				        imageSet={this.state.imageSet}
                                        onImageAdded={this.handleImageAdded.bind(this)}
                                        onImageRemoved={this.handleImageRemoved.bind(this)} />
                                </div>
                                <div className="panel-footer">
                                    <Button
					bsClass="btn btn-labeled btn-primary mr"
					disabled={!this.state.modifiedImageSet}
					onClick={this.handleSaveImages.bind(this)}>
                                        <span className="btn-label"><i className="fa fa-check"></i></span> Save
                                    </Button>
                                    <Button
				        bsClass="btn btn-labeled mr"
					onClick={this.handleResetImages.bind(this)}>
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
        currentMenuItem: store.currentMenuItem
    };
}


function mapDispatchToProps(dispatch) {
    return {
        currentMenuItemLoading: () => dispatch(currentMenuItemLoading()),
        currentMenuItemReady: (currentMenuItem) => dispatch(currentMenuItemReady(currentMenuItem)),
        currentMenuItemFailed: (error) => dispatch(currentMenuItemFailed(error)),
        currentMenuItemClear: () => dispatch(currentMenuItemClear())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
