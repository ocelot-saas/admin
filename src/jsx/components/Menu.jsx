import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';

class Menu extends React.Component {

  render() {
    return (
      <ContentWrapper>
        <div className="content-heading">
          Menu
          <small>Menu settings</small>
	</div>
      </ContentWrapper>
    );
  }
}

export default Menu;
