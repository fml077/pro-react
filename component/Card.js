import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CheckList from './CheckList';
import marked from 'marked';
import { DragSource, DropTarget } from 'react-dnd';
import constants from './constants'

// card组件：标题、说明、代码清单
// 使用React DnD 的高阶组件来设置拖拽源、放置目标和拖拽上下文
// DragSource 其实就是Card 组件， DropTarget 是List组件，上下文就是KanbanBoard组件

// React DnD 实现条目排序关键：同时把元素作为DragSource 和 DropTarget

// 自定义校验（字符形且小于50字符）
let tltlePropType = (props, propName, componentName) => {
    if (props[propName]) {
        let value = props[propName];
        if (typeof value !== 'string' || value.length > 50) {
            return new Error(
                `${propName} in ${componentName} is longer than 80 characters`
            );
        }
    }
}
// DragSource spec对象
const cardDragSpec = {
    beginDrag(props) {
        return {
            id: props.id,
            status: props.status
        }
    },
    endDrag(props) {
        props.cardCallbacks.persistCardDrag(props.id, props.status)
    }
} 
// DropTarget spec对象
const cardDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updatePosition(draggedId, props.id)
    }
}

let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    }
}
let collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Card extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false
        }
    }
    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails})
    }
    render() {
        const { connectDragSource, connectDropTarget } = this.props;
        let cardDetails;
        if (this.state.showDetails) {
            cardDetails = (
                <div className='card_details'>
                    <span dangerouslySetInnerHTML = {{__html:marked(this.props.description)}} />
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
                </div>
            )
        }

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        }
        return connectDragSource(
            <div className='card'>
                <div style={sideColor}></div>
                <div className={
                    this.state.showDetails ? 'card_title card_title--is-open' : 'card_title'
                } onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
                {/* <ReactCSSTransitionGroup transitionName='toggle' transitionEnterTimeout={250}> */}
                    {cardDetails}
                {/* </ReactCSSTransitionGroup> */}
            </div>
        )
    }
}

Card.PropTypes = {
    id: PropTypes.number,
    title: tltlePropType,
    description: PropTypes.String,
    color: PropTypes.String,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
}

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

// export default DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
export default dragDropHighOrderCard;