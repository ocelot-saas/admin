import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';

class Orders extends React.Component {

  render() {
    return (
      <ContentWrapper>
        <h3>
          Orders
          <small>All the orders</small>
        </h3>
      </ContentWrapper>
    );
  }
}

export default Orders;
