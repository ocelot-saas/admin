import React from 'react';

class BasePage extends React.Component {

    render() {
        return (
            <div className="wrapper">
                {React.cloneElement(this.props.children, {
                     auth: this.props.route.auth
                })}
            </div>
        );
    }

}

export default BasePage;
