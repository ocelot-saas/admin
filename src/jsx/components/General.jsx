import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import SweetAlert from 'react-swal';
import 'bootstrap-tagsinput';

import { HoursRange } from './HoursRange';
import ImageGallery from './ImageGallery';
import { ToHours, ExtractHours } from '../common/hours';
import { OPSTATE_INIT, OPSTATE_LOADING, OPSTATE_READY, OPSTATE_FAILED, restaurantLoading, restaurantReady, restaurantFailed } from '../store';
import { inventoryService } from '../services';

class General extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            modifiedGeneral: false,
            name: '[ Name ]',
            description: '[ Description ]',
            address: '[ Address ]',
            modifiedHours: false,
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
	    modifiedImageSet: false,
	    removedFromImageSet: false,
            showAYSRemoveImagesDialog: false,
	    imageSet: []
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.restaurant.opState == OPSTATE_READY) {
            this.setState({
                modifiedGeneral: false,
                name: newProps.restaurant.restaurant.name,
                description: newProps.restaurant.restaurant.description,
                address: newProps.restaurant.restaurant.address,
                modifiedHours: false,
                weekdayHours: ToHours(newProps.restaurant.restaurant.openingHours.weekday),
                saturdayHours: ToHours(newProps.restaurant.restaurant.openingHours.saturday),
                sundayHours: ToHours(newProps.restaurant.restaurant.openingHours.sunday),
		modifiedImageSet: false,
		removedFromImageSet: false,
                showAYSRemoveImagesDialog: false,
		imageSet: newProps.restaurant.restaurant.imageSet
            });
        }
    }

    componentWillMount() {
        if (this.props.restaurant.opState == OPSTATE_READY) {
            this.setState({
                modifiedGeneral: false,
                name: this.props.restaurant.restaurant.name,
                description: this.props.restaurant.restaurant.description,
                address: this.props.restaurant.restaurant.address,
                modifiedHours: false,
                weekdayHours: ToHours(this.props.restaurant.restaurant.openingHours.weekday),
                saturdayHours: ToHours(this.props.restaurant.restaurant.openingHours.saturday),
                sundayHours: ToHours(this.props.restaurant.restaurant.openingHours.sunday),
		modifiedImageSet: false,
		removedFromImageSet: false,
                showAYSRemoveImagesDialog: false,
		imageSet: this.props.restaurant.restaurant.imageSet
            });
        }    
    }

    componentDidMount() {
        $("[data-role='tagsinput']").tagsinput();

        if (this.props.restaurant.opState == OPSTATE_INIT) {
            inventoryService
                .getRestaurantFromService()
                .then((restaurant) => {
                    this.props.restaurantReady(restaurant);
                })
                .catch((errorCode) => {
                    this.props.restaurantFailed(new Error('Could not perform restaurant fetching. Try again later'));
                });

            this.props.restaurantLoading();
        }
    }

    componentWillUnmount() {
        // TODO(horia141): cancel all pending requests
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

    handleAddressChange(e) {
        this.setState({
            modifiedGeneral: true,
            address: e.target.value
        });
    }

    handleWeekdayHoursChange(e) {
        this.setState({
            modifiedHours: true,
            weekdayHours: e
        });
    }

    handleSaturdayHoursChange(e) {
        this.setState({
            modifiedHours: true,
            saturdayHours: e
        });
    }

    handleSundayHoursChange(e) {
        this.setState({
            modifiedHours: true,
            sundayHours: e
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
        const restaurantUpdateRequest = {
            name: this.state.name,
            description: this.state.description,
            keywords: [],
            address: this.state.address
        };

        inventoryService
            .updateRestaurantFromService(restaurantUpdateRequest)
            .then((restaurant) => {
                this.props.restaurantReady(restaurant);
            })
            .catch((errorCode) => {
                this.props.restaurantFailed(new Error('Could not perform restaurant updating. Try again later'));
            });

        this.props.restaurantLoading();
    }

    handleResetGeneral(e) {
        this.setState({
            modifiedGeneral: false,
            name: this.props.restaurant.restaurant.name,
            description: this.props.restaurant.restaurant.description,
            address: this.props.restaurant.restaurant.address
        })
    }

    handleSaveHours(e) {
        const restaurantUpdateRequest = {
            openingHours: {
                weekday: ExtractHours(this.state.weekdayHours),
                saturday: ExtractHours(this.state.saturdayHours),
                sunday: ExtractHours(this.state.sundayHours)
            }
        };

        inventoryService
            .updateRestaurantFromService(restaurantUpdateRequest)
            .then((restaurant) => {
                this.props.restaurantReady(restaurant);
            })
            .catch((errorCode) => {
                this.props.restaurantFailed(new Error('Could not perform restaurant updating. Try again later'));
            });

        this.props.restaurantLoading();
    }

    handleResetHours(e) {
        this.setState({
            modifiedHours: false,
            weekdayHours: ToHours(this.props.restaurant.restaurant.openingHours.weekday),
            saturdayHours: ToHours(this.props.restaurant.restaurant.openingHours.saturday),
            sundayHours: ToHours(this.props.restaurant.restaurant.openingHours.sunday)
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
        const restaurantUpdateRequest = {
	    imageSet: this.state.imageSet
	};

	inventoryService
	    .updateRestaurantFromService(restaurantUpdateRequest)
	    .then((restaurant) => {
                this.props.restaurantReady(restaurant);
            })
            .catch((errorCode) => {
                this.props.restaurantFailed(new Error('Could not perform restaurant updating. Try again later'));
            });

        this.props.restaurantLoading();
    }

    handleResetImages(e) {
        this.setState({
            modifiedImageSet: false,
	    removedFromImageSet: false,
	    imageSet: this.props.restaurant.restaurant.imageSet
        });
    }

    render() {
        switch (this.props.restaurant.opState) {
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
            return (<div>{ this.props.restaurant.errorMessage }</div>);
        case OPSTATE_READY:
            return (
                <ContentWrapper>
                   <h3>
                       General
                       <small>Restaurant general settings</small>
                   </h3>

                   <SweetAlert
                       isOpen={this.state.showAYSRemoveImagesDialog}
                       type="warning"
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
                                   <Button
                                       bsClass="btn btn-labeled btn-primary mr"
                                       disabled={!this.state.modifiedGeneral}
                                       onClick={this.handleSaveGeneral.bind(this)}>
                                       <span className="btn-label"><i className="fa fa-check"></i></span> Save
                                   </Button>
                                   <Button bsClass="btn btn-labeled mr" onClick={this.handleResetGeneral.bind(this)}>
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
                                           hours={this.state.weekdayHours}
                                           onChange={this.handleWeekdayHoursChange.bind(this)} />
   
                                       <HoursRange
                                           xid='sat'
                                           xlabel={ 'Saturday' }
                                           hours={this.state.saturdayHours}
                                           onChange={this.handleSaturdayHoursChange.bind(this)} />
   
                                       <HoursRange
                                           xid='sun'
                                           xlabel={ 'Sunday' }
                                           hours={this.state.sundayHours}
                                           onChange={this.handleSundayHoursChange.bind(this)} />
                                   </form>
                               </div>
                               <div className="panel-footer">
                                   <Button
                                       bsClass="btn btn-labeled btn-primary mr"
                                       disabled={!this.state.modifiedHours}
                                       onClick={this.handleSaveHours.bind(this)}>
                                       <span className="btn-label"><i className="fa fa-check"></i></span> Save
                                   </Button>
                                   <Button
                                       bsClass="btn btn-labeled mr"
                                       onClick={this.handleResetHours.bind(this)}>
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
        restaurant: store.restaurant
    };
}


function mapDispatchToProps(dispatch) {
    return {
        restaurantLoading: () => dispatch(restaurantLoading()),
        restaurantReady: (restaurant) => dispatch(restaurantReady(restaurant)),
        restaurantFailed: (error) => dispatch(restaurantFailed(error))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(General);
