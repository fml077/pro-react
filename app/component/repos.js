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
            return response.json()
        })
        .then((resposeData) => {
            console.log('resposeData:',resposeData)
            // 只取前100个数据测试展示
            var resposeData = resposeData.splice(0,100)
            this.setState({
                repositories: resposeData
            })
        })
    }
    render() {
        let repos = this.state.repositories.map((repo) => (
            <li key={repo.id}>
                <Link to={"/repos/details/" + repo.id}>{repo.name}</Link>
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