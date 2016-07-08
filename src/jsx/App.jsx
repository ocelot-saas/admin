import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRedirect, Redirect, browserHistory } from 'react-router';

import initTranslation from './components/Common/localize';
import initLoadCss from './components/Common/load-css';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';

import Dashboard from './components/Dashboard';
import General from './components/General';
import Menu from './components/Menu';
import Section from './components/Section';
import FoodItem from './components/FoodItem';
import Orders from './components/Orders';
import Order from './components/Order';
import Platforms from './components/Platforms';
import Reports from './components/Reports';

import Login from './components/Login';
import Register from './components/Register';
import Recover from './components/Recover';

// Init translation system
initTranslation();
// Init css loader (for themes)
initLoadCss();

ReactDOM.render(
  <Router history={browserHistory}>

    <Redirect from="/index.html" to="/" />

    <Route path="/" component={Base}>

      {/* Default route */}
      <IndexRedirect to="/dashboard" />

      {/* Routes, in sorted order */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/general" component={General} />
      <Route path="/menu" component={Menu} />
      <Route path="/menu/sections/:sectionId" component={Section} />
      <Route path="/menu/fooditem/:foodItemId" component={FoodItem} />
      <Route path="/orders/:orderId" component={Order} />
      <Route path="/orders" component={Orders} />
      <Route path="/platforms" component={Platforms} />
      <Route path="/reports" component={Reports} />

    </Route>

    <Route path="/" component={BasePage}>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/recover" component={Recover}/>
    </Route>

    {/* Not found handler */}
    {/*<Route path="*" component={NotFound}/>*/}

  </Router>,
  document.getElementById('app')
);
