import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, ButtonGroup, Input, FormControl } from 'react-bootstrap';

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
              <div className="panel-heading">Sections</div>
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
