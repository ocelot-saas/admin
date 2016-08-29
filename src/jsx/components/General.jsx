import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import 'bootstrap-tagsinput';

import { HoursRange } from './HoursRange';
import ImageGallery from './ImageGallery';
import { ToHours } from '../common/hours';
import { OPSTATE_INIT, OPSTATE_LOADING, OPSTATE_READY, OPSTATE_FAILED, restaurantLoading, restaurantReady, restaurantFailed } from '../store';
import { inventoryService } from '../services';

class General extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '[ Name ]',
            description: '[ Description ]',
            address: '[ Address ]',
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

    componentWillReceiveProps(newProps) {
        if (newProps.restaurant.opState == OPSTATE_READY) {
            this.setState({
                name: newProps.restaurant.restaurant.name,
                description: newProps.restaurant.restaurant.description,
                address: newProps.restaurant.restaurant.address,
                weekdayHours: ToHours(newProps.restaurant.restaurant.openingHours.weekday),
                saturdayHours: ToHours(newProps.restaurant.restaurant.openingHours.saturday),
                sundayHours: ToHours(newProps.restaurant.restaurant.openingHours.sunday)
            });
	}
    }

    componentWillMount() {
        if (this.props.restaurant.opState == OPSTATE_READY) {
            this.setState({
                name: this.props.restaurant.restaurant.name,
                description: this.props.restaurant.restaurant.description,
                address: this.props.restaurant.restaurant.address,
                weekdayHours: ToHours(this.props.restaurant.restaurant.openingHours.weekday),
                saturdayHours: ToHours(this.props.restaurant.restaurant.openingHours.saturday),
                sundayHours: ToHours(this.props.restaurant.restaurant.openingHours.sunday)
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
        this.setState({name: e.target.value});
    }

    handleDescriptionChange(e) {
        this.setState({description: e.target.value});
    }

    handleAddressChange(e) {
        this.setState({address: e.target.value});
    }

    handleWeekdayHoursChange(e) {
        this.setState({weekdayHours: e});
    }

    handleSaturdayHoursChange(e) {
        this.setState({saturdayHours: e});
    }

    handleSundayHoursChange(e) {
        this.setState({sundayHours: e});
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
                                           initialHours={this.state.weekdayHours}
                                           onChange={this.handleWeekdayHoursChange.bind(this)} />
   
                                       <HoursRange
                                           xid='sat'
                                           xlabel={ 'Saturday' }
                                           initialHours={this.state.saturdayHours}
                                           onChange={this.handleSaturdayHoursChange.bind(this)} />
   
                                       <HoursRange
                                           xid='sun'
                                           xlabel={ 'Sunday' }
                                           initialHours={this.state.sundayHours}
                                           onChange={this.handleSundayHoursChange.bind(this)} />
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
