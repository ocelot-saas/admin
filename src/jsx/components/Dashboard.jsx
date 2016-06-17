import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

class Dashboard extends React.Component {

  render() {
    return (
      <ContentWrapper>
        <h3>
          Dashboard
          <small>An overview of your restaurant</small>
        </h3>
        <Grid fluid>
          <Row>
            <Col lg={ 3 } sm={ 6 }>
              { /* Visiors */ }
              <div className="panel widget bg-primary">
		<Row className="row-table">
                  <Col xs={ 4 } className="text-center bg-primary-dark pv-lg">
                    <em className="icon-people fa-3x"></em>
                  </Col>
                  <Col xs={ 8 } className="pv-lg">
                    <div className="h2 mt0">12003</div>
                    <div className="text-uppercase">Visitors</div>
                  </Col>
		</Row>
              </div>
            </Col>
            <Col lg={ 3 } sm={ 6 }>
              { /* Orders */ }
              <div className="panel widget bg-purple">
		<Row className="row-table">
                  <Col xs={ 4 } className="text-center bg-purple-dark pv-lg">
                    <em className="icon-trophy fa-3x"></em>
                  </Col>
                  <Col xs={ 8 } className="pv-lg">
                    <div className="h2 mt0">104</div>
                    <div className="text-uppercase">Orders</div>
                  </Col>
		</Row>
              </div>
            </Col>
            <Col lg={ 3 } sm={ 6 }>
              { /* Total Items */ }
              <div className="panel widget bg-yellow">
		<Row className="row-table">
                  <Col xs={ 4 } className="text-center bg-yellow-dark pv-lg">
                    <em className="icon-layers fa-3x"></em>
                  </Col>
                  <Col xs={ 8 } className="pv-lg">
                    <div className="h2 mt0">189</div>
                    <div className="text-uppercase">Total Items</div>
                  </Col>
		</Row>
              </div>
            </Col>
            <Col lg={ 3 } sm={ 6 }>
              { /* Revenue */ }
              <div className="panel widget bg-green">
		<Row className="row-table">
                  <Col xs={ 4 } className="text-center bg-green-dark pv-lg">
                    <em className="fa fa-usd fa-3x"></em>
                  </Col>
                  <Col xs={ 8 } className="pv-lg">
                    <div className="h2 mt0">1040</div>
                    <div className="text-uppercase">Revenue</div>
                  </Col>
		</Row>
              </div>
            </Col>
          </Row>
        </Grid>
      </ContentWrapper>
    );
  }
}

export default Dashboard;
