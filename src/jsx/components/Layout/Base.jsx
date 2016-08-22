import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

class Base extends React.Component {

    render() {

        const animationName = 'rag-fadeIn'

        return (
            <div className="wrapper">
                <Header user={this.props.user} onLogoutClick={this.props.onLogoutClick} />

                <Sidebar user={this.props.user}/>

                <ReactCSSTransitionGroup
                    component="section"
                    transitionName={animationName}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {React.cloneElement(this.props.children, {
                         key: Math.random(),
                         user: this.props.user
                     })}
                </ReactCSSTransitionGroup>

                <Footer />
            </div>
        );
    }
}

export default Base;
