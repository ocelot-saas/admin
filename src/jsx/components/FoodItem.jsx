import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Input, Row, Col, Panel, Button, Alert, Table } from 'react-bootstrap';
import ImageGallery from './ImageGallery';

class FoodItem extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: 'Tomato Soup',
            desc: 'A nice tomato soup',
        };
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleDescChange(e) {
        this.setState({desc: e.target.value});
    }

    render() {
        return (
            <ContentWrapper>
                <h3>
                    {/* parse foodItemId */}
                    Tomato Soup
                    <small>Food Item #{this.props.params.foodItemId}</small>
                </h3>

                <Row>
                    <Col sm={ 12 }>
                        <div className="panel panel-default">
                            <div className="panel-heading">Section</div>
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
                                            <input type="text" data-role="tagsinput" defaultValue="italian, soup" className="form-control" />
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

export default FoodItem;
