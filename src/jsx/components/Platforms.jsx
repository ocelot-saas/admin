import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

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
                <p>Details about site</p>
              </div>
              <div className="panel-footer">
                <Button bsStyle="primary">Save</Button>
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
                <Button bsStyle="primary">Save</Button>
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
                <Button bsStyle="primary">Save</Button>
              </div>
            </div>          
          </Col>
        </Row>
      </ContentWrapper>
    );
  }
}

export default Platforms;
