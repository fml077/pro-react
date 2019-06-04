import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';
import marked from 'marked'

// card组件：标题、说明、代码清单

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
        let cardDetails;
        if (this.state.showDetails) {
            cardDetails = (
                <div className='card_details'>
                    <span dangerouslySetInnerHTML = {{__html:marked(this.props.description)}} />
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
                </div>
            )
        }
        return (
            <div className='card'>
                <div className='card_title' onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
                {cardDetails}
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
    taskCallbacks: PropTypes.object
}

export default Card;