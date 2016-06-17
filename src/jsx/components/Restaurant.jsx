import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';

class Restaurant extends React.Component {

  render() {
    return (
      <ContentWrapper>
        <h3>
          Restaurant
          <small>Manage your restaurant</small>
        </h3>
      </ContentWrapper>
    );
  }
}

export default Restaurant;
