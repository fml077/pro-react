import React, { Component } from 'react';
import 'whatwg-fetch';
class RepoDetails extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            repository: {}
        }
    }
    fetchData (id) {
        fetch('https://jsonplaceholder.typicode.com/comments?id='+id)
        .then((response) => {
            console.log('response detail:',response)

            return response.json()
        })
        .then((responseData) => {
            console.log('responseData detail:',responseData)
            this.setState({
                repository: responseData[0]
            })
        })
    }
    componentDidMount() {
        // 注入id到params
        let id = this.props.params.id;
        this.fetchData(id)
    }
    // 之前都是在componentDidMount中获取数据，这里需要在componentWillReceiveProps添加获取数据的逻辑，因为组件被加载后，每当用户单击不同的资料库就接收
    // 到新参数。这种情况下 componentDidMount方法并不会在用户每次单击时都重新被调用。但componentWillReceiveProps则会每次都被调用
    componentWillReceiveProps(nextProps) {
        let id = nextProps.params.id;
        this.fetchData(id)
    }

    render() {
        let stars = [];
        // 点赞星数
        for (var i = 0; i < this.state.repository.postId; i++) {
            stars.push('⭐️')
        }
        return (
            <div>
                <h2>{this.state.repository.name}</h2>
                <p>{this.state.repository.email}</p>
                <p>Comment: {this.state.repository.body}</p>
                <span>{stars}</span>
            </div>
        )

    }
}

export default RepoDetails;