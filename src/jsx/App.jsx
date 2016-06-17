import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute } from 'react-router';

import initTranslation from './components/Common/localize';
import initLoadCss from './components/Common/load-css';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';

import Dashboard from './components/Dashboard';

// Init translation system
initTranslation();
// Init css loader (for themes)
initLoadCss();

ReactDOM.render(
    <Router history={browserHistory}>

        <Route path="/" component={Base}>

            {/* Default route*/}
            <IndexRoute component={Dashboard} />
	    <Route path="dashboard" component={Dashboard} />

        </Route>

        {/* Not found handler */}
        {/*<Route path="*" component={NotFound}/>*/}

    </Router>,
    document.getElementById('app')
);
