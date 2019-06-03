import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';

// card组件：标题、说明、代码清单

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
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks}  />
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
    title: PropTypes.String,
    description: PropTypes.String,
    color: PropTypes.String,
    tasks: PropTypes.arrayOf(PropTypes.object)
}

export default Card;