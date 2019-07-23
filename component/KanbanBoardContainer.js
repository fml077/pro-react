import React, { Component } from 'react';
import update from 'react-addons-update'
import KanbanBoard from './KanbanBoard';
import {throttle} from '../utils/utils.js'
import 'babel-polyfill'
import 'whatwg-fetch'
// 远程获取数据
const API_URL = 'http://kanbanapi.pro-react.com'; // 这是测试接口,添加到数据将会在24小时后自动删除
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'none'
}

class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: []
        }
        // 当参数改变才执行
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        // 当参数改变才执行 或者时间间隔大于500毫秒才执行
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500)
    }
    componentDidMount() {
        fetch(API_URL + '/cards', { headers: API_HEADERS })
        .then((response) => {
            console.log('fetch res',response)
           return response.json()
        })
        .then((responseData) => {
            console.log('responseData',responseData)
            responseData && this.setState({cards: responseData})
            // 保存旧的state对象 以便发生问题时回滚到这个旧对象上
            window.state = this.state;
        })
        .catch((error) => {
            console.log('Error', error)
        })
    }
    // 新增任务， 需要先新增临时id等服务端返回最终id再替换
    addTask(cardId, taskName) {
        // 保存旧的state对象 以便发生问题时回滚到这个旧对象上
        let prevState = this.state

        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId)
        let newTask = {id: Date.now(), name: taskName, done: false}
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        })
        this.setState({cards: nextState})

        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('服务器错误')
            }
        })
        .then((responseData)=> {
            // 以服务端端返回id更新数据
            newTask.id = responseData.id
            this.setState({cards: nextState})
        })
        
    }
    // 通过ID查找索引，通过不性助手(update库)创建一个不包含被删除任务的新可变对象。最后为对象调用setState
    // 并使用fetch函数通知服务器有关数据的变化
    deleteTask(cardId, taskId, taskIndex) {
        // 保存旧的state对象 以便发生问题时回滚到这个旧对象上
        let prevState = this.state
        // findIndex() 数组函数查找需要到索引
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId)
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex, 1]]}
            }
        })
        this.setState({cards: nextState})

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
    }
    // 不从数组中删除元素，而是上移到任务对象的done属性，使用一个函数直接将它的值修改成反向的值
    toggleTask(cardId, taskId, taskIndex) {
        // 保存旧的state对象 以便发生问题时回滚到这个旧对象上
        let prevState = this.state
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId)
        let newDoneValue;
        let nextState = update(
            this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: { $apply: (done) => {
                            newDoneValue = !done
                            return newDoneValue
                        } }
                    }
                }
            }
        })

        this.setState({cards: nextState})

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done: newDoneValue})
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('服务器错误')
            }
        })
        .catch((error) => {
            console.log('fetch error', error)
            this.setState(prevState)
        })
    }
    // 更新card组件状态
    updateCardStatus(cardId, listId) {
        // 找到card index
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        // 获取当前cardid
        let card = this.state.cards[cardIndex]
        if (card.status != listId) {
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: {$set: listId}
                    }
                }
            }))
        }
    }
    // 更新card组件位置
    updateCardPosition (cardId, afterId) {
        if (cardId != afterId) {
            // 找到card index
            let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
            // 获取当前cardid
            let card = this.state.cards[cardIndex]
            // 找到拖拽的card index
            let afterIndex = this.state.cards.findIndex((card)=>card.id==afterId)
            // 用splice方法移除card并重新插入到一个新到index
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }))
        }
    }
    // 持久化card位置和状态
    // 使用fetch函数调用api 传递card新状态和位置，如果调用失败需要在界面把卡片恢复到之前的状态
    // persistCardDrag方法在cardCallbacks对象内部可见从而可在Card组件中调用
    persistCardDrag (cardId, status) {
        let cardIndex = this.state.cards.findIndex((card)=>cardId == cardId)
        let card = this.state.cards[cardIndex]
        fetch(`${API_URL}/cards/${cardId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({status: card.status, row_order_position:cardIndex})
        })
        .then((response)=>{
            if (!response.ok) {
                throw new Error("Server response wasn't ok")
            }
        })
        .catch((error)=>{
            console.log('Fetch error:',error)
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: { $set: status }
                    }
                }
            }))
        })

    }
    render() {
        return (<KanbanBoard cards={this.state.cards} taskCallbacks={{
            add: this.addTask.bind(this),
            delete: this.deleteTask.bind(this),
            toggle: this.toggleTask.bind(this)
        }} cardCallbacks={{
            updateStatus: this.updateCardStatus,
            updatePosition: this.updateCardPosition,
            persistCardDrag: this.persistCardDrag.bind(this)
        }}
        />)
    }
}

export default KanbanBoardContainer