import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import {
    OPSTATE_INIT, OPSTATE_LOADING, OPSTATE_READY, OPSTATE_FAILED, compositeState,
    menuSectionsLoading, menuSectionsReady, menuSectionsFailed, menuSectionsClear,
    menuItemsLoading, menuItemsReady, menuItemsFailed, menuItemsClear} from '../store';
import MenuSectionSummary from './MenuSectionSummary';
import MenuItemSummary from './MenuItemSummary';
import { inventoryService } from '../services';


class Menu extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        if (this.props.menuSections.opState == OPSTATE_INIT
         && this.props.menuItems.opState == OPSTATE_INIT) {
            const getAllMenuSections = inventoryService.getAllMenuSections();
            const getAllMenuItems = inventoryService.getAllMenuItems();

            Promise
                .all([getAllMenuSections, getAllMenuItems])
                .then(([menuSections, menuItems]) => {
                    this.props.menuSectionsReady(menuSections);
                    this.props.menuItemsReady(menuItems);
                })
                .catch((errorCode) => {
                    this.props.menuSectionsFailed(new Error('Could not perform menu sections fetching. Try again later'));
                    this.props.menuItemsFailed(new Error('Could not perform menu items fetching. Try again later'));
                });


            this.props.menuSectionsLoading();
            this.props.menuItemsLoading();
        }
    }

    componentWillUnmount() {
        // TODO(horia141): cancel all pending requests
        this.props.menuSectionsClear();
        this.props.menuItemsClear();
    }

    handleClickToSection(sectionId, e) {
        this.context.router.push(`/menu/sections/${sectionId}`);
    }

    handleClickToItem(itemId, e) {
        this.context.router.push(`/menu/item/${itemId}`);
    }

    handleClickAddSection(e) {
        this.context.router.push('/menu/sections/create');
    }

    render() {
        const opStates = [
            this.props.menuSections.opState,
            this.props.menuItems.opState
        ];

        switch (compositeState(opStates)) {
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
            if (this.props.menuSections.opState == OPSTATE_FAILED) {
                return (<div>{ this.props.menuSections.errorMessage }</div>);
            } else {
                return (<div>{ this.props.menuItems.errorMessage }</div>);
            }
        case OPSTATE_READY:
            const menuSectionSummaries = this.props.menuSections.menuSections.map((ms) =>
                <MenuSectionSummary menuSection={ ms } onClick={ this.handleClickToSection.bind(this, ms.id) } />);
            const menuItemSummaries = this.props.menuItems.menuItems.map((mi) =>
                <MenuItemSummary menuItem={ mi } onClick={ this.handleClickToItem.bind(this, mi.id) } />);
                
            return (
                <ContentWrapper>
                    <div className="content-heading">
                        Menu
                        <small>Menu settings</small>
                    </div>

                    <Row>
                        <Col sm={ 12 }>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <Button
                                        bsClass="btn btn-sm btn-labeled btn-success mr pull-right"
                                        onClick={ this.handleClickAddSection.bind(this) }>
                                        <span className="btn-label"><i className="icon-plus"></i></span> Add
                                    </Button>
                                    Sections
                                </div>

                                <div className="panel-body">
                                    <div className="list-group">
                                        { menuSectionSummaries }
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
                                        { menuItemSummaries }
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
            throw new Error('This should never happen either');
        }
    }
}


Menu.contextTypes = {
    router: React.PropTypes.object.isRequired
}


function mapStateToProps(store) {
    return {
        menuSections: store.menuSections,
        menuItems: store.menuItems
    }
}


function mapDispatchToProps(dispatch) {
    return {
        menuSectionsLoading: () => dispatch(menuSectionsLoading()),
        menuSectionsReady: (menuSections) => dispatch(menuSectionsReady(menuSections)),
        menuSectionsFailed: () => dispatch(menuSectionsFailed()),
	menuSectionsClear: () => dispatch(menuSectionsClear()),
        menuItemsLoading: () => dispatch(menuItemsLoading()),
        menuItemsReady: (menuItems) => dispatch(menuItemsReady(menuItems)),
        menuItemsFailed: () => dispatch(menuItemsFailed()),
        menuItemsClear: () => dispatch(menuItemsClear())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
