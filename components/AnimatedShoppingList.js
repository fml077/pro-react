import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// 购物车列表
class AnimatedShoppingList extends Component {
    constructor () {
        super(...arguments);
        this.state = {
            items: [
                {id: 1, name: 'book'},
                {id: 2, name: 'milk'},
                {id: 3, name: 'yogurt'},
            ]
        }
    }
    handleChange(evt) {
        if(evt.key === 'Enter') {
            let newItem = { id: Date.now(), name: evt.target.value }
            let newItems = this.state.items.concat(newItem)
            evt.target.value = ''
            this.setState({items: newItems})
        }
    }
    handleRemove(i) {
        let newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({items: newItems})
    }
    render() {
        let shoppingItems = this.state.items.map((item, i) => (
            <div key={item.id}
            className='shopitem'
            onClick={this.handleRemove.bind(this, i)}>
            {item.name}
            </div>
        ))
        // ReactCSSTransitionGroup 必须包含在要实现动画的子元素外，过度效果命名为example
        return (
            <div>
                <ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionAppear={true} transitionAppearTimeout={300}>
                    {shoppingItems}
                </ReactCSSTransitionGroup>
                
                <input type='text' value={this.state.newItem}
                onKeyDown={this.handleChange.bind(this)}></input>
            </div>
        )
    }

}
export default AnimatedShoppingList;