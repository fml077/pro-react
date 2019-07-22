import React, { Component } from 'react';
import {render} from 'react-dom';
import Snack from '../components/Snack'
import ShoppingCart from '../components/ShoppingCart'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'


class Container extends Component {
  render(){
    return (
      <div>
          <Snack name='Chips' />
          <Snack name='Cupacke' />
          <Snack name='Donut' />
          <Snack name='Doritos' />
          <Snack name='Popcorn' />
          <ShoppingCart />
      </div>
    );
  }
}
export default DragDropContext(HTML5Backend)(Container);
