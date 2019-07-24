import React, { Component } from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch'

class Repos extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            repositories: []
        }
    }
    componentDidMount(){
        // fetch data from a test api
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then((response) => {
            console.log('response:',response)
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Server response was not ok')
            }
        })
        .then((resposeData) => {
            console.log('resposeData:',resposeData)
            // 只取前100个数据测试展示
            var resposeData = resposeData.splice(0,100)
            this.setState({
                repositories: resposeData
            })
        })
        .catch((error) => {
            // 捕获错误 跳转到ServerError组件错误页面
            this.props.history.pushState(null, '/error');
        })
    }
    render() {
        let repos = this.state.repositories.map((repo) => (
            <li key={repo.id}>
                <Link to={"/repos/" + repo.id}>{repo.name}</Link>
            </li>
        ))
        // 子组件上克隆并注入props：React.cloneElement将额外的props传递给由Router所提供的children
        let child = this.props.children && React.cloneElement(
            this.props.children,
            { repositories: this.state.repositories }
        )
        return(
            <div>
                <h1>Github REPOS PAGE</h1>
                <ul>
                    {repos}
                </ul>
                {child}
            </div>
        )
    }
}

export default Repos;