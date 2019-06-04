import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import KanbanBoard from '../component/KanbanBoard';


// class FoodList extends Component {
//     render() {
//         return (
//             <ul>
//                 <ListItem quantity="1" name="bread"></ListItem>
//                 <ListItem quantity="2" name="milk"></ListItem>
//                 <ListItem quantity="3" name="eggs"></ListItem>
//             </ul>
//         )
//     }
// }

// class ListItem extends Component {
//     render() {
//         return (
//             <li>{this.props.quantity} * {this.props.name}</li>
//         )
//     }
// }

// render(<FoodList />, document.getElementById('root'))


let cardsList = [{
    "id": 1,
    "title": "Monday",
    "description": "look at [github](https://github.com/pro-react)",
    "status": 'todo',
    "tasks": [{
      "id": 1,
      "name": 'todo watch a game',
      "done": true
    }, {
      "id": 2,
      "name": 'todo watch a game2',
      "done": true
    }, {
      "id": 3,
      "name": 'watch a book',
      "done": false
    }]
  },
  {
    "id": 2,
    "title": "Thursday",
    "description": "quia et suscipit\nsuscipit recusandae consequo",
    "status": 'done',
    "tasks": [{
      "id": 1,
      "name": 'done watch a game',
      "done": false
    }, {
      "id": 2,
      "name": 'done watch a game2',
      "done": true
    }, {
      "id": 3,
      "name": 'done watch a book',
      "done": false
    }]
  },
  {
    "id": 3,
    "title": "Friday",
    "description": "quia et suscipit\nsuscipit recusandae consequo",
    "status": 'in-progress',
    "tasks": [{
      "id": 1,
      "name": 'watch a game',
      "done": true
    }, {
      "id": 2,
      "name": 'watch a game2',
      "done": true
    }, {
      "id": 3,
      "name": 'watch a book',
      "done": false
    }]
  }
]

render(<KanbanBoard cards={cardsList} />, document.getElementById('root'))