import 'classlist-polyfill';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { NavDropdown, MenuItem } from 'react-bootstrap';

import { identityService } from '../services';
import { identityClear } from '../store';


import LogoSingle from '../../static/img/logo-single.png';
import Logo from '../../static/img/logo.png';


class Header extends React.Component {
    
    handleDashboardClick() {
        this.context.router.push('/dashboard');
    }

    handleLogoutClick() {
        identityService.logout();
	this.context.router.push('/login');
	this.props.identityClear();    
    }

    handleToggleMenu() {
        document.body.classList.toggle('aside-toggled');
    }

    render() {
        const ddAlertTitle = (
            <span>
                <em className="icon-settings"></em>
            </span>
        )

        return (
            <header className="topnavbar-wrapper">
                <nav role="navigation" className="navbar topnavbar">
                    <div className="navbar-header">
                        <a href="#/" className="navbar-brand">
                            <div className="brand-logo">
                                <img src={Logo} alt="App Logo" className="img-responsive" />
                            </div>
                            <div className="brand-logo-collapsed">
                                <img src={LogoSingle} alt="App Logo" className="img-responsive" />
                            </div>
                        </a>
                    </div>
                    <div className="nav-wrapper">
                        <ul className="nav navbar-nav">
                            <li>
                                <a href="#" className="visible-xs sidebar-toggle" onClick={this.handleToggleMenu.bind(this)}>
                                    <em className="fa fa-navicon"></em>
                                </a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <NavDropdown noCaret eventKey={ 3 } title={ ddAlertTitle } id="basic-nav-dropdown" >
                                <MenuItem className="animated flipInX" eventKey={3.2}>Profile</MenuItem>
                                <MenuItem className="animated flipInX" eventKey={3.3} onSelect={this.handleDashboardClick.bind(this)}>Dashboard</MenuItem>
                                <MenuItem divider />
                                <MenuItem className="animated flipInX" eventKey={3.3} onSelect={this.handleLogoutClick.bind(this)}>Logout</MenuItem>
                            </NavDropdown>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }

}


Header.contextTypes = {
    router: React.PropTypes.object.isRequired
}


function mapStateToProps(store) {
    return {};
}


function mapDispatchToProps(dispatch) {
    return {
        identityClear: () => dispatch(identityClear())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
