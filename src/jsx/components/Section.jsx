import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Alert, Table } from 'react-bootstrap';

class Section extends React.Component {
  render() {
    return (
      <ContentWrapper>
        <h3>
	  {/* parse sectionId */}
          Soups
          <small>Section #{this.props.params.sectionId}</small>
        </h3>
      </ContentWrapper>
    );
  }
}

export default Section;
