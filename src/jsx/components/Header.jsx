import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import HeaderRun from './Header.run'
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { identityService } from '../services';
import { identityClear } from '../store';


class Header extends React.Component {
    
    componentDidMount() {
        HeaderRun();
    }

    onDashboardClick() {
        this.context.router.push('/dashboard');
    }

    onLogoutClick() {
        identityService.logout();
	this.context.router.push('/login');
	this.props.identityClear();    
    }

    render() {
        const ddAlertTitle = (
            <span>
                <em className="icon-settings"></em>
            </span>
        )

        return (
            <header className="topnavbar-wrapper">
                { /* START Top Navbar */ }
                <nav role="navigation" className="navbar topnavbar">
                    { /* START navbar header */ }
                    <div className="navbar-header">
                        <a href="#/" className="navbar-brand">
                            <div className="brand-logo">
                                <img src="/img/logo.png" alt="App Logo" className="img-responsive" />
                            </div>
                            <div className="brand-logo-collapsed">
                                <img src="/img/logo-single.png" alt="App Logo" className="img-responsive" />
                            </div>
                        </a>
                    </div>
                    { /* END navbar header */ }
                    { /* START Nav wrapper */ }
                    <div className="nav-wrapper">
                        { /* START Left navbar */ }
                        <ul className="nav navbar-nav">
                            <li>
                                { /* Button used to collapse the left sidebar. Only visible on tablet and desktops */ }
                                <a href="#" data-trigger-resize="" data-toggle-state="aside-collapsed" className="hidden-xs">
                                    <em className="fa fa-navicon"></em>
                                </a>
                                { /* Button to show/hide the sidebar on mobile. Visible on mobile only. */ }
                                <a href="#" data-toggle-state="aside-toggled" data-no-persist="true" className="visible-xs sidebar-toggle">
                                    <em className="fa fa-navicon"></em>
                                </a>
                            </li>
                        </ul>
                        { /* END Left navbar */ }
                        { /* START Right Navbar */ }
                        <ul className="nav navbar-nav navbar-right">
                            { /* Fullscreen (only desktops) */ }
                            <li className="visible-lg">
                                <a href="#" data-toggle-fullscreen="">
                                    <em className="fa fa-expand"></em>
                                </a>
                            </li>
                            { /* START Alert menu */ }
                            <NavDropdown noCaret eventKey={ 3 } title={ ddAlertTitle } id="basic-nav-dropdown" >
                                <MenuItem className="animated flipInX" eventKey={3.2}>Profile</MenuItem>
                                <MenuItem className="animated flipInX" eventKey={3.3} onSelect={this.onDashboardClick.bind(this)}>Dashboard</MenuItem>
                                <MenuItem divider />
                                <MenuItem className="animated flipInX" eventKey={3.3} onSelect={this.onLogoutClick.bind(this)}>Logout</MenuItem>
                            </NavDropdown>
                            { /* END Alert menu */ }
                        </ul>
                        { /* END Right Navbar */ }
                    </div>
                    { /* END Nav wrapper */ }
                </nav>
                { /* END Top Navbar */ }
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
