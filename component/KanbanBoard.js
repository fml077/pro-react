import React, { Component, PropTypes } from 'react';
import List from './List';

class KanbanBoard extends Component {
    constructor() {
        super();
        this.state = {
            val: 0
        }
    }
    componentDidMount() {
        this.setState({val: this.state.val + 1});
        console.log(this.state.val);    // 第 1 次 log
    
        this.setState({val: this.state.val + 1});
        console.log(this.state.val);    // 第 2 次 log
    
        setTimeout(() => {
          this.setState({val: this.state.val + 1});
          console.log(this.state.val);  // 第 3 次 log
    
          this.setState({val: this.state.val + 1});
          console.log(this.state.val);  // 第 4 次 log
        }, 0);
    }
    render() {
        return (
            <div className="app">
                <List id='todo' title='To Do' taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card) => card.status === 'todo')
                } />
                <List id='in-progress' title='In Progress' taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card) => card.status === 'in-progress')
                } />
                <List id='done' title='Done' taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card) => card.status === 'done')
                } />
            </div>
        )
    }
}

KanbanBoard.PropTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
}

export default KanbanBoard;