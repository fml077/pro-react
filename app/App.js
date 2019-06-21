import React, { Component } from 'react';
import {render} from 'react-dom';
import AnimatedShoppingList from '../components/AnimatedShoppingList'

class App extends Component {
  render(){
    return (
      <AnimatedShoppingList />
    );
  }
}

render(<App />, document.getElementById('root'));
