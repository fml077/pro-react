import React, { Component } from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
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
// IndexRoute设置默认路由 默认首页
render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About}></Route>
      <Route path="repos" component={Repos}></Route>
    </Route>
  </Router>
  ), document.getElementById('root'));
