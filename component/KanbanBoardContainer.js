import React, { Component } from 'react';
import update from 'react-addons-update'
import KanbanBoard from './KanbanBoard';
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
    render() {
        return (<KanbanBoard cards={this.state.cards} taskCallbacks={{
            add: this.addTask.bind(this),
            delete: this.deleteTask.bind(this),
            toggle: this.toggleTask.bind(this)
        }} />)
    }
}

export default KanbanBoardContainer