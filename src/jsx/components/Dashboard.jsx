import React from 'react';
import ReactDom from 'react-dom';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

var datav3 = [{
    "label": "Orders",
    "color": "#1ba3cd",
    "data": [
        ["1", 38],
        ["2", 40],
        ["3", 42],
        ["4", 48],
        ["5", 50],
        ["6", 70],
        ["7", 145],
        ["8", 70],
        ["9", 59],
        ["10", 48],
        ["11", 38],
        ["12", 29],
        ["13", 30],
        ["14", 22],
        ["15", 28]
    ]
}, {
    "label": "Items",
    "color": "#3a3f51",
    "data": [
        ["1", 16],
        ["2", 18],
        ["3", 17],
        ["4", 16],
        ["5", 30],
        ["6", 110],
        ["7", 19],
        ["8", 18],
        ["9", 110],
        ["10", 19],
        ["11", 16],
        ["12", 10],
        ["13", 20],
        ["14", 10],
        ["15", 20]
    ]
}];

var options = {
    series: {
        lines: {
            show: true,
        },
        points: {
            show: true,
            radius: 4
        }
    },
    grid: {
        borderColor: '#eee',
        borderWidth: 1,
        hoverable: true,
        backgroundColor: '#fcfcfc'
    },
    tooltip: true,
    tooltipOpts: {
        content: function(label, x, y) {
            return x + ' : ' + y;
        }
    },
    xaxis: {
        tickColor: '#fcfcfc',
        mode: 'categories'
    },
    yaxis: {
        min: 0,
        max: 150, // optional: use it for a clear represetation
        tickColor: '#eee',
        //position: 'right' or 'left',
        tickFormatter: function(v) {
            return v /* + ' visitors'*/ ;
        }
    },
    shadowSize: 0
};

class Dashboard extends React.Component {

    componentDidMount() {
        var chartNode = ReactDom.findDOMNode(this.refs.chartSpline);
        $.plot(chartNode, datav3, options);
    }

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

                    <Row>
                        <Col lg={ 12 }>
                            <div id="panelChart9" className="panel panel-default">
                                <div className="panel-heading">
                                    <div className="panel-title">Orders And Items</div>
                                </div>
                                <div collapse="panelChart9" className="panel-wrapper">
                                    <div className="panel-body">
                                        <div ref="chartSpline" className="chart-splinev3 flot-chart"></div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </ContentWrapper>
        );
    }
}

export default Dashboard;
