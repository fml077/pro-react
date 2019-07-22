import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import constants from './constants';
/* DragTarget method
*drop
*hover
*canDrop
*/
// spec 对象描述放置目标如何响应拖拽和放置事件
const ShoppingCartSpec = {
    drop() {
        return {name: 'ShoppingCart'}
    }
}

// collect函数 把react DnD 中的connector和状态映射为组件的props属性，monitor参数可把拖放状态映射为属性
let collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

class ShoppingCart extends Component {
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        let backgroundColor = '#fff'
        if (isActive) {
            backgroundColor = '#f7f7bd'
        } else if (canDrop) {
            backgroundColor = 'f7f7f7'
        }
        const style = {
            backgroundColor: backgroundColor
        }
        return connectDropTarget(
            <div className='shopping-cart' style={style}>
                {isActive ?
                    'Hummmm, Snack.' : 
                    'Drag here to order.'
                }
            </div>
        )
    }
}

ShoppingCart.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
}
// DragTarget 和DropTarget 高阶组件需要提供三个参数：type、spec、和一个collect函数
export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart)