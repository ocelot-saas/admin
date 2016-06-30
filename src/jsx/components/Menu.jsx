import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl, Table } from 'react-bootstrap';

class Menu extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  handleClickToSection(sectionId, e) {
    this.context.router.push(`/menu/sections/${sectionId}`);
  }

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

                  <div className="media p mt0 list-group-item" onClick={ this.handleClickToSection.bind(this, '1') }>
		    <span className="close">&times;</span>
                    <span className="pull-left">
                      <img src="img/mood01.jpg" className="media-object img-circle thumb32" />
                    </span>
		    <Row>
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

                  <div className="media p mt0 list-group-item" onClick={ this.handleClickToSection.bind(this, '2') }>
		    <span className="close">&times;</span>
                    <span className="pull-left">
                      <img src="img/mood02.jpg" className="media-object img-circle thumb32" />
                    </span>
		    <Row>
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

                  <div className="media p mt0 list-group-item" onClick={ this.handleClickToSection.bind(this, '3') }>
		    <span className="close">&times;</span>
                    <span className="pull-left">
                      <img src="img/mood03.jpg" className="media-object img-circle thumb32" />
                    </span>
		    <Row>
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
                      <img src="img/mood04.jpg" className="media-object img-circle thumb32" />
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
                      <img src="img/mood05.jpg" className="media-object img-circle thumb32" />
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
                      <img src="img/mood01.jpg" className="media-object img-circle thumb32" />
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
                      <img src="img/mood02.jpg" className="media-object img-circle thumb32" />
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
  }
}

Menu.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Menu;
