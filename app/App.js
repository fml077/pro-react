import React, { Component } from 'react';
import {render} from 'react-dom';
import About from './component/about';
import Home from './component/home';
import Repos from './component/repos';

// 用原生方式实现路由
class App extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      route: window.location.hash.substr(1)
    }
  }
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      console.log('change',window.location.hash.substr(1))
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
  }
  render(){
    var Child;
    switch (this.state.route) {
      case '/about': Child = About; break;
      case '/repos': Child = Repos; break;
      default: Child = Home; 
    }
    return (
      <div>
        <h1>App </h1>
        <menu>
          <ul>
            <li><a href='#/about'>About</a></li>
            <li><a href='#/repos'>Repos</a></li>
          </ul>
        </menu>
        <Child />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
