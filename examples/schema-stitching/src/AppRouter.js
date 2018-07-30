import React from 'react';
import './App.css';
import QueryExample from './components/QueryExample.js';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Home = () => (
  <div>
    <h2> Hello world </h2>
  </div>
);

const AppRouter = (props) => {
  console.log(props);
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="query-example"> Example </Link></li>
        </ul>

        <hr/>
        <Route exact path="/" component={() => <Home />}/>
        <Route path="/query-example" component={QueryExample}/>
      </div>
    </Router>
  );
}

export default AppRouter;
