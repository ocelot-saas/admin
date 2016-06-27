import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';

class Order extends React.Component {
  render() {
    return (
      <ContentWrapper>
        <h3>
          Order {this.props.params.orderId}
          <small>Horia</small>
        </h3>
      </ContentWrapper>
    );
  }
}

export default Order;
