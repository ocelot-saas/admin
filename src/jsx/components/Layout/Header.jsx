import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import HeaderRun from './Header.run'
import { NavDropdown, MenuItem } from 'react-bootstrap';
import AuthService from '../../AuthService';

class Header extends React.Component {
    
    componentDidMount() {
        HeaderRun();
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
                            { /* Search icon */ }
                            <li>
                                <a href="#" data-search-open="">
                                    <em className="icon-magnifier"></em>
                                </a>
                            </li>
                            { /* Fullscreen (only desktops) */ }
                            <li className="visible-lg">
                                <a href="#" data-toggle-fullscreen="">
                                    <em className="fa fa-expand"></em>
                                </a>
                            </li>
                            { /* START Alert menu */ }
                            <NavDropdown noCaret eventKey={ 3 } title={ ddAlertTitle } id="basic-nav-dropdown" >
                                <MenuItem className="animated flipInX" eventKey={3.2}>Profile</MenuItem>
                                <MenuItem className="animated flipInX" eventKey={3.3}>
                                    <Link to="/dashboard" title="Dashboard">Dashboard</Link>
                                </MenuItem>
                                <MenuItem divider />
                                <MenuItem className="animated flipInX" eventKey={3.3} onSelect={this.props.onLogoutClick}>
                                    <a>Logout</a>
                                </MenuItem>
                            </NavDropdown>
                            { /* END Alert menu */ }
                        </ul>
                        { /* END Right Navbar */ }
                    </div>
                    { /* END Nav wrapper */ }
                    { /* START Search form */ }
                    <form role="search" action="search.html" className="navbar-form">
                        <div className="form-group has-feedback">
                            <input type="text" placeholder="Type and hit enter ..." className="form-control" />
                            <div data-search-dismiss="" className="fa fa-times form-control-feedback"></div>
                        </div>
                        <button type="submit" className="hidden btn btn-default">Submit</button>
                    </form>
                    { /* END Search form */ }
                </nav>
                { /* END Top Navbar */ }
            </header>
        );
    }

}

Header.propTypes = {
    auth: PropTypes.instanceOf(AuthService)
}


export default Header;
