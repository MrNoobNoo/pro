import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import './index.css';

import {TaskOne, TaskTwo} from './App'
ReactDOM.render(
  <Router>
  <Switch>
     <Route exact path="/" component={TaskOne}/>
   <Route exact path="/tasktwo" component={TaskTwo }/>
 </Switch>
</Router>,
  document.getElementById('root')
);
