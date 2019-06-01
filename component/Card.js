import React, { Component } from 'react';
import CheckList from './CheckList';

// card组件：标题、说明、代码清单

class Card extends Component {
    render() {
        return (
            <div className='card'>
                <div className='card_title'>{this.props.title}</div>
                <div className='card_details'>
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks}  />
                </div>
            </div>
        )
    }
}

export default Card;