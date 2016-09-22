import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import {
    OPSTATE_INIT, OPSTATE_LOADING, OPSTATE_READY, OPSTATE_FAILED, compositeState,
    menuSectionsLoading, menuSectionsReady, menuSectionsFailed, menuSectionsClear,
    menuItemsLoading, menuItemsReady, menuItemsFailed, menuItemsClear} from '../store';
import { inventoryService } from '../services';


function MenuSectionSummary(props) {
    return (
        <div className="media p mt0 list-group-item" onClick={ props.onClick }>
            <span className="close">&times;</span>
            <span className="pull-left">
                <img src="/img/mood01.jpg" className="media-object img-circle thumb32" />
            </span>
            <Row>
                <Col md={ 3 }>
                    <span className="media-body">
                        <span className="media-heading">
                            <strong>{ props.menuSection.name }</strong>
                            <br/>
                            <small className="text-muted">{ props.menuSection.description }</small>
                        </span>
                    </span>
                </Col>
                <Col md={ 6 }>
                    <span className="media-body">
                        <span className="media-heading">
                            <strong>Tomato Soup, Mushroom Soup</strong>
                            <br/>
                            <small className="text-muted">And 5 other soups</small>
                        </span>
                    </span>
                </Col>
            </Row>
        </div>
    );
}


function MenuItemSummary(props) {
    var ingredients;
    var otherIngredients;
    if ( props.menuItem.ingredients.length == 0) {
        ingredients = '';
    } else if (props.menuItem.ingredients.length == 1) {
        ingredients = props.menuItem.ingredients[0];
    } else {
        ingredients = `${props.menuItem.ingredients[0]}, ${props.menuItem.ingredients[1]}`;
    }

    switch (props.menuItem.ingredients.length) {
        case 0:
        case 1:
        case 2:
            otherIngredients = '';
            break;
        case 3:
            otherIngredients = 'And 1 other ingredient';
            break;
        default:
            otherIngredients = `And ${props.menuItem.ingredients.length - 2} other ingredients`;
    }

    var keywords;
    switch (props.menuItem.keywords.length) {
        case 0:
            keywords = <ul className="list-inline m0"></ul>;
            break;
        case 1:
            keywords = (
                <ul className="list-inline m0">
                    <li><div className="badge bg-green">{ props.menuItem.keywords[0] }</div></li>
                </ul>
            );
            break;
        case 2:
            keywords = (
                <ul className="list-inline m0">
                    <li><div className="badge bg-green">{ props.menuItem.keywords[0] }</div></li>
                    <li><div className="badge bg-green">{ props.menuItem.keywords[1] }</div></li>                    
                </ul>
            );
            break;
        default:
            keywords = (
                <ul className="list-inline m0">
                    <li><div className="badge bg-green">{ props.menuItem.keywords[0] }</div></li>
                    <li><div className="badge bg-green">{ props.menuItem.keywords[1] }</div></li>
                    <li><div className="badge bg-purple">more</div></li>
                </ul>
            );
    }
    
    return (
        <div className="media p mt0 list-group-item" onClick={ props.onClick }>
            <span className="close">&times;</span>
            <span className="pull-left">
                <img src="/img/mood04.jpg" className="media-object img-circle thumb32" />
            </span>
            <Row>
                <Col md={ 3 }>
                    <span className="media-body">
                        <span className="media-heading">
                            <strong>{ props.menuItem.name }</strong>
                            <br/>
                            <small className="text-muted">{ props.menuItem.description }</small>
                        </span>
                    </span>
                </Col>
                <Col md={ 3 }>
                    <span className="media-body">
                        <span className="media-heading">
                            <strong>{ ingredients }</strong>
                            <br/>
                            <small className="text-muted">{ otherIngredients }</small>
                        </span>
                    </span>
                </Col>
                <Col md={ 4 }>
                    { keywords }
                </Col>
            </Row>
        </div>
    );
}

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
