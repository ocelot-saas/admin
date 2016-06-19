import React from 'react';
import { Router, Route, Link, History } from 'react-router';
import SidebarRun from './Sidebar.run';

class Sidebar extends React.Component {

    constructor(props, context) {
        super(props, context);
    };

    componentDidMount() {
        SidebarRun();
    }

    routeActive(paths) {
        paths = Array.isArray(paths) ? paths : [paths];
        for (let p in paths) {
            if (this.context.router.isActive(paths[p]) === true)
                return true;
        }
        return false;
    }

    render() {
        return (
            <aside className='aside'>
                { /* START Sidebar (left) */ }
                <div className="aside-inner">
                    <nav data-sidebar-anyclick-close="" className="sidebar">

                        { /* START Sidebar nav */ }
                        <ul className="nav">

                            { /* User info */ }
                            <li className="has-user-block">
                                <div className="item user-block">
                                    { /* User picture */ }
                                    <div className="user-block-picture">
                                        <div className="user-block-status">
                                            <img src="img/user.png" alt="Avatar" width="60" height="60" className="img-thumbnail img-circle" />
                                            <div className="circle circle-success circle-lg"></div>
                                        </div>
                                    </div>
                                    { /* Name and Job */ }
                                    <div className="user-block-info">
                                        <span className="user-block-name">Hello, Horia</span>
                                        <span className="user-block-role">Administrator</span>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-heading ">
                                <span data-localize="sidebar.heading.HEADER">Overview</span>
                            </li>

                            { /* Dashboard */ }
                            <li className={ this.routeActive('dashboard') ? 'active' : '' }>
                                <Link to="dashboard" title="Dashboard">
                                  <em className="icon-speedometer"></em>
                                  <span data-localize="sidebar.nav.DASHBOARD">Dashboard</span>
                                </Link>
                            </li>

                            <li className="nav-heading ">
                                <span data-localize="sidebar.heading.HEADER">Restaurant</span>
                            </li>

                            { /* General */}
                            <li className={ this.routeActive('general') ? 'active' : '' }>
                                <Link to="general" title="General">
                                  <em className="icon-cup"></em>
                                  <span data-localize="sidebar.nav.GENERAL">General</span>
                                </Link>
                            </li>

                            { /* Menu */}
                            <li className={ this.routeActive('menu') ? 'active' : '' }>
                                <Link to="menu" title="Menu">
                                  <em className="icon-book-open"></em>
                                  <span data-localize="sidebar.nav.MENU">Menu</span>
                                </Link>
                            </li>

                            { /* Offers */}
                            <li className={ this.routeActive('offers') ? 'active' : '' }>
                                <Link to="offers" title="Offers">
                                  <em className="icon-emotsmile"></em>
                                  <span data-localize="sidebar.nav.OFFERS">Offers</span>
                                </Link>
                            </li>

                            <li className="nav-heading ">
                                <span data-localize="sidebar.heading.PLATFORMS">Platforms</span>
                            </li>

                            { /* Platforms */}
                            <li className={ this.routeActive('platforms') ? 'active' : '' }>
                                <Link to="platforms" title="Platforms">
                                  <em className="icon-rocket"></em>
                                  <span data-localize="sidebar.nav.PLATFORMS">Platforms</span>
                                </Link>
                            </li>

                            <li className="nav-heading ">
                                <span data-localize="sidebar.heading.HEADER">Users</span>
                            </li>

                            { /* Orders */}
                            <li className={ this.routeActive('orders') ? 'active' : '' }>
                                <Link to="orders" title="Orders">
                                  <em className="icon-list"></em>
                                  <span data-localize="sidebar.nav.ORDERS">Orders</span>
                                </Link>
                            </li>

                            <li className="nav-heading ">
                                <span data-localize="sidebar.heading.HEADER">Analytics</span>
                            </li>

                            { /* Reports */}
                            <li className={ this.routeActive('reports') ? 'active' : '' }>
                                <Link to="reports" title="Reports">
                                  <em className="icon-graph"></em>
                                  <span data-localize="sidebar.nav.REPORTS">Reports</span>
                                </Link>
                            </li>
                        </ul>
                        { /* END Sidebar nav */ }
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
