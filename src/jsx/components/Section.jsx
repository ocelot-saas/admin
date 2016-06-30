import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Input, Row, Col, Panel, Button, Alert, Table } from 'react-bootstrap';
import ImageGallery from './ImageGallery';

class Section extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: 'Soups',
      desc: 'Some fancy soups for us',
    };
  }

  componentDidMount() {
    $("[data-role='tagsinput']").tagsinput()
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
	  {/* parse sectionId */}
          Soups
          <small>Section #{this.props.params.sectionId}</small>
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
  }
}

export default Section;
