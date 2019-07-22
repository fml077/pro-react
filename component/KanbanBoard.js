import React, { Component, PropTypes } from 'react';
import List from './List';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// 拼图的最后一块是找到一个Card 和 List公共的父级组件，将其作为拖放的上下文，这里用KanbanBoard组件

class KanbanBoard extends Component {
    constructor() {
        super();
        this.state = {
            val: 0
        }
    }
    render() {
        return (
            <div className="app">
                <List id='todo' title='To Do' 
                taskCallbacks={this.props.taskCallbacks} 
                cardCallbacks={this.props.cardCallbacks}
                cards={
                    this.props.cards.filter((card) => card.status === 'todo')
                } />
                <List id='in-progress' title='In Progress' 
                taskCallbacks={this.props.taskCallbacks} 
                cardCallbacks={this.props.cardCallbacks}
                cards={
                    this.props.cards.filter((card) => card.status === 'in-progress')
                } />
                <List id='done' title='Done' 
                taskCallbacks={this.props.taskCallbacks}
                cardCallbacks={this.props.cardCallbacks}
                cards={
                    this.props.cards.filter((card) => card.status === 'done')
                } />
            </div>
        )
    }
}

KanbanBoard.PropTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object
}

export default DragDropContext(HTML5Backend)(KanbanBoard);