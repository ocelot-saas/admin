import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRedirect } from 'react-router';

import initTranslation from './components/Common/localize';
import initLoadCss from './components/Common/load-css';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';

import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import Orders from './components/Orders';
import Reports from './components/Reports';
import Restaurant from './components/Restaurant';
import Users from './components/Users';

// Init translation system
initTranslation();
// Init css loader (for themes)
initLoadCss();

ReactDOM.render(
    <Router history={browserHistory}>

        <Route path="/" component={Base}>

            {/* Default route */}
            <IndexRedirect to="/dashboard" />

	    {/* Routes, in sorted order */}
	    <Route path="dashboard" component={Dashboard} />
	    <Route path="menu" component={Menu} />
	    <Route path="orders" component={Orders} />
	    <Route path="reports" component={Reports} />
	    <Route path="restaurant" component={Restaurant} />
	    <Route path="users" component={Users} />

        </Route>

        {/* Not found handler */}
        {/*<Route path="*" component={NotFound}/>*/}

    </Router>,
    document.getElementById('app')
);
