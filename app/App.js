import React, { Component } from 'react';
import {render} from 'react-dom';
import { Router, Route, Link } from 'react-router';
import About from './component/about';
import Home from './component/home';
import Repos from './component/repos';

// 用原生方式实现路由
class App extends Component {
  render(){
    
    return (
      <div>
        <h1>App </h1>
        <menu>
          <ul>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/repos'>Repos</Link></li>
          </ul>
        </menu>
        {this.props.children}
      </div>
    );
  }
}

render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About}></Route>
      <Route path="repos" component={Repos}></Route>
    </Route>
  </Router>
  ), document.getElementById('root'));
