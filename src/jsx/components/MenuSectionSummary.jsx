import React from 'react';
import { Row, Col } from 'react-bootstrap';


class MenuSectionSummary extends React.Component {
    render() {
        return (
            <div className="media p mt0 list-group-item" onClick={ this.props.onClick }>
                <span className="close">&times;</span>
                <span className="pull-left">
                    <img src="/img/mood01.jpg" className="media-object img-circle thumb32" />
                </span>
                <Row>
                    <Col md={ 3 }>
                        <span className="media-body">
                            <span className="media-heading">
                                <strong>{ this.props.menuSection.name }</strong>
                                <br/>
                                <small className="text-muted">{ this.props.menuSection.description }</small>
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
}


export default MenuSectionSummary;
