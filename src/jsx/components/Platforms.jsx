import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Input } from 'react-bootstrap';

class Platforms extends React.Component {

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          Platforms
          <small>Platforms settings</small>
	</div>
        <Row>
          <Col sm={ 12 }>
            <div className="panel panel-default">
              <div className="panel-heading">Website</div>
              <div className="panel-body">
	        <form className="form-horizontal">
		  <div className="form-group">
		    <label className="col-lg-2 control-label">Domain Name</label>
		    <Col lg={ 10 }>
		      <Input standalone type="text" required="required" placeholder="Domain Name" className="form-control" addonAfter="@ocelot.com" />
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
              <div className="panel-heading">Call Center</div>
              <div className="panel-body">
                <p>Details about site</p>
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
              <div className="panel-heading">Email Center</div>
              <div className="panel-body">
                <p>Details about site</p>
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

export default Platforms;
