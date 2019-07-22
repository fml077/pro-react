import React, { Component, PropTypes } from 'react';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import constants from './constants'

// List组件 接收cardCallbacks props 并将其传递给Card组件
// 作为DropTarget的 List组件

const listTargetSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateStatus(draggedId, props.id)
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}
class List extends Component {
    render() {
        const { connectDropTarget } = this.props;
        var cards = this.props.cards.map((card) => {
            return <Card key={card.id} taskCallbacks={this.props.taskCallbacks} cardCallbacks={this.props.cardCallbacks}  id={card.id} title={card.title} description={card.description} tasks={card.tasks} />
        })

        return connectDropTarget(
            <div className='list'>
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}

List.PropTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    cardCallbacks: PropTypes.object,
    taskCallbacks: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired
}
export default DropTarget(constants.CARD, listTargetSpec, collect)(List);