import React from 'react';
import { Router, Route, Link, History } from 'react-router';
import pubsub from 'pubsub-js';
import { Collapse } from 'react-bootstrap';
import SidebarRun from './Sidebar.run';

class Sidebar extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            userBlockCollapse: false,
            collapse: {
                singleview: this.routeActive(['singleview']),
                submenu: this.routeActive(['submenu'])
            }
        };
        this.pubsub_token = pubsub.subscribe('toggleUserblock', () => {
            this.setState({
                userBlockCollapse: !this.state.userBlockCollapse
            });
        });
    };

    componentDidMount() {
        SidebarRun();
    }

    componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
        pubsub.unsubscribe(this.pubsub_token);
    }

    routeActive(paths) {
        paths = Array.isArray(paths) ? paths : [paths];
        for (let p in paths) {
            if (this.context.router.isActive(paths[p]) === true)
                return true;
        }
        return false;
    }

    toggleItemCollapse(stateName) {
        var newCollapseState = {};
        for (let c in this.state.collapse) {
            if (this.state.collapse[c] === true && c !== stateName)
                this.state.collapse[c] = false;
        }
        this.setState({
            collapse: {
                [stateName]: !this.state.collapse[stateName]
            }
        });
    }

    render() {
        return (
            <aside className='aside'>
                { /* START Sidebar (left) */ }
                <div className="aside-inner">
                    <nav data-sidebar-anyclick-close="" className="sidebar">

                        { /* START sidebar nav */ }
                        <ul className="nav">

                            { /* User info */ }
                            <li className="has-user-block">
                                <div className="item user-block">
                                    { /* User picture */ }
                                    <div className="user-block-picture">
                                        <div className="user-block-status">
                                            <img src="img/user/02.jpg" alt="Avatar" width="60" height="60" className="img-thumbnail img-circle" />
                                            <div className="circle circle-success circle-lg"></div>
                                        </div>
                                    </div>
                                    { /* Name and Job */ }
                                    <div className="user-block-info">
                                        <span className="user-block-name">Hello, Mike</span>
                                        <span className="user-block-role">Designer</span>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-heading ">
                                <span data-localize="sidebar.heading.HEADER">Navigation</span>
                            </li>

			    { /* Dashboard */ }
			    <li className={ this.routeActive('dashboard') ? 'active' : '' }>
                                <Link to="dashboard" title="Dashboard">
                                  <em className="icon-speedometer"></em>
                                  <span data-localize="sidebar.nav.DASHBOARD">Dashboard</span>
                                </Link>
                            </li>

			    { /* Users */}
			    <li className={ this.routeActive('users') ? 'active' : '' }>
                                <Link to="users" title="Users">
                                  <em className="icon-people"></em>
                                  <span data-localize="sidebar.nav.USERS">Users</span>
                                </Link>
                            </li>

			    { /* Restaurant */}
			    <li className={ this.routeActive('restaurant') ? 'active' : '' }>
                                <Link to="restaurant" title="Restaurant">
                                  <em className="icon-cup"></em>
                                  <span data-localize="sidebar.nav.RESTAURANT">Restaurant</span>
                                </Link>
                            </li>

			    { /* Menu */}
			    <li className={ this.routeActive('menu') ? 'active' : '' }>
                                <Link to="menu" title="Menu">
                                  <em className="icon-book-open"></em>
                                  <span data-localize="sidebar.nav.MENU">Menu</span>
                                </Link>
                            </li>

			    { /* Orders */}
			    <li className={ this.routeActive('orders') ? 'active' : '' }>
                                <Link to="orders" title="Orders">
                                  <em className="icon-list"></em>
                                  <span data-localize="sidebar.nav.ORDERS">Orders</span>
                                </Link>
                            </li>

			    { /* Reports */}
			    <li className={ this.routeActive('reports') ? 'active' : '' }>
                                <Link to="reports" title="Reports">
                                  <em className="icon-graph"></em>
                                  <span data-localize="sidebar.nav.REPORTS">Reports</span>
                                </Link>
                            </li>
                        </ul>
                        { /* END sidebar nav */ }
                    </nav>
                </div>
                { /* END Sidebar (left) */ }
            </aside>
            );
    }

}

Sidebar.contextTypes = {
    router: () => {
        return React.PropTypes.func.isRequired;
    }
};

export default Sidebar;
