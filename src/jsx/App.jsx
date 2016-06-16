import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute } from 'react-router';

import initTranslation from './components/Common/localize';
import initLoadCss from './components/Common/load-css';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';

import SingleView from './components/SingleView/SingleView';
import SubMenu from './components/SubMenu/SubMenu';

// Init translation system
initTranslation();
// Init css loader (for themes)
initLoadCss();

ReactDOM.render(
    <Router history={browserHistory}>

        <Route path="/" component={Base}>

            {/* Default route*/}
            <IndexRoute component={SingleView} />

            <Route path="singleview" component={SingleView} />
            <Route path="submenu" component={SubMenu} />

        </Route>

        {/* Not found handler */}
        {/*<Route path="*" component={NotFound}/>*/}

    </Router>,
    document.getElementById('app')
);
