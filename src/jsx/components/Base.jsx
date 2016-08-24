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
                <Header/>

                <Sidebar/>

                <ReactCSSTransitionGroup
                    component="section"
                    transitionName={animationName}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {React.cloneElement(this.props.children, {
                         key: Math.random(),
                     })}
                </ReactCSSTransitionGroup>

                <Footer />
            </div>
        );
    }
}

export default Base;
