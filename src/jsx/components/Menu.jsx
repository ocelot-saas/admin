import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl, Table } from 'react-bootstrap';

class Menu extends React.Component {

  render() {
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
                <Button bsClass="btn btn-sm btn-labeled btn-success mr pull-right">
                  <span className="btn-label"><i className="icon-plus"></i></span> Add
                </Button>
                Sections
              </div>

	      <div className="panel-body">
                <div className="list-group">
                  <div className="media p mt0 list-group-item">
		    <span className="close">&times;</span>
		    <Row>
		      <Col md={ 1 }>
                        <span className="pull-left">
                          <img src="img/mood01.jpg" className="media-object img-circle thumb32" />
                        </span>
		      </Col>
		      <Col md={ 3 }>
                        <span className="media-body">
                          <span className="media-heading">
                            <strong>Soups</strong>
                            <br/>
                            <small className="text-muted">Our nice selection of soups</small>
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

                  <div className="media p mt0 list-group-item">
		    <span className="close">&times;</span>
		    <Row>
		      <Col md={ 1 }>
                        <span className="pull-left">
                          <img src="img/mood02.jpg" className="media-object img-circle thumb32" />
                        </span>
		      </Col>
		      <Col md={ 3 }>
                        <span className="media-body">
                          <span className="media-heading">
                            <strong>Pastas</strong>
                            <br/>
                            <small className="text-muted">A bunch of pastas</small>
                          </span>
                        </span>
		      </Col>
		      <Col md={ 6 }>
                        <span className="media-body">
                          <span className="media-heading">
                            <strong>Carbonara, Bolognese</strong>
                            <br/>
                            <small className="text-muted">And 6 other pastas</small>
                          </span>
                        </span>
		      </Col>
		    </Row>
                  </div>

                  <div className="media p mt0 list-group-item">
		    <span className="close">&times;</span>
		    <Row>
		      <Col md={ 1 }>
                        <span className="pull-left">
                          <img src="img/mood03.jpg" className="media-object img-circle thumb32" />
                        </span>
		      </Col>
		      <Col md={ 3 }>
                        <span className="media-body">
                          <span className="media-heading">
                            <strong>Drinks</strong>
                            <br/>
                            <small className="text-muted">To ease things down</small>
                          </span>
                        </span>
		      </Col>
		      <Col md={ 6 }>
                        <span className="media-body">
                          <span className="media-heading">
                            <strong>Beck's, White Wine</strong>
                            <br/>
                            <small className="text-muted">And 10 other drinks</small>
                          </span>
                        </span>
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

	<Row>
          <Col sm={ 12 }>
            <div className="panel panel-default">
              <div className="panel-heading">Food & Drinks</div>
              <div className="panel-body">
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

export default Menu;
