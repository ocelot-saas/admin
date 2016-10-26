import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'; 

class Sidebar extends React.Component {

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
                <div className="aside-inner">
                    <nav className="sidebar">

                        <ul className="nav">

                            <li className="has-user-block">
                                <div className="item user-block">
                                    <div className="user-block-picture">
                                        <div className="user-block-status">
                                            <img src={ this.props.user.pictureUrl } alt="Avatar" width="60" height="60" className="img-thumbnail img-circle" />
                                            <div className="circle circle-success circle-lg"></div>
                                        </div>
                                    </div>
                                    <div className="user-block-info">
                                        <span className="user-block-name">Hello, { this.props.user.name }</span>
                                        <span className="user-block-role">Administrator</span>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-heading ">
                                <span>Overview</span>
                            </li>

                            <li className={ this.routeActive('dashboard') ? 'active' : '' }>
                                <Link to="/dashboard" title="Dashboard">
                                    <em className="icon-speedometer"></em>
                                    <span>Dashboard</span>
                                </Link>
                            </li>

                            <li className="nav-heading ">
                                <span>Restaurant</span>
                            </li>

                            <li className={ this.routeActive('general') ? 'active' : '' }>
                                <Link to="/general" title="General">
                                    <em className="icon-cup"></em>
                                    <span>General</span>
                                </Link>
                            </li>

                            <li className={ this.routeActive('menu') ? 'active' : '' }>
                                <Link to="/menu" title="Menu">
                                    <em className="icon-book-open"></em>
                                    <span>Menu</span>
                                </Link>
                            </li>

                            <li className="nav-heading ">
                                <span>Platforms</span>
                            </li>

                            <li className={ this.routeActive('platforms') ? 'active' : '' }>
                                <Link to="/platforms" title="Platforms">
                                    <em className="icon-rocket"></em>
                                    <span>Platforms</span>
                                </Link>
                            </li>

                            <li className="nav-heading ">
                                <span>Users</span>
                            </li>

                            <li className={ this.routeActive('orders') ? 'active' : '' }>
                                <Link to="/orders" title="Orders">
                                    <em className="icon-list"></em>
                                    <span>Orders</span>
                                </Link>
                            </li>

                            <li className="nav-heading ">
                                <span>Analytics</span>
                            </li>

                            <li className={ this.routeActive('reports') ? 'active' : '' }>
                                <Link to="/reports" title="Reports">
                                    <em className="icon-graph"></em>
                                    <span>Reports</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }

}


Sidebar.contextTypes = {
    router: PropTypes.object.isRequired
}


function mapStateToProps(store) {
    return {
        user: store.identity.user
    };
}

export default connect(mapStateToProps)(Sidebar);
