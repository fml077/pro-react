import React, { Component } from 'react';
// import 'whatwg-fetch';
import 'babel-polyfill'
class RepoDetails extends Component {
    // constructor() {
    //     super(...arguments);
    //     this.state = {
    //         repository: {}
    //     }
    // }
    // fetchData (id) {
    //     fetch('https://jsonplaceholder.typicode.com/comments?id='+id)
    //     .then((response) => {
    //         console.log('response detail:',response)

    //         return response.json()
    //     })
    //     .then((responseData) => {
    //         console.log('responseData detail:',responseData)
    //         this.setState({
    //             repository: responseData[0]
    //         })
    //     })
    // }
    // componentDidMount() {
    //     // 注入id到params
    //     let id = this.props.params.id;
    //     this.fetchData(id)
    // }
    // // 之前都是在componentDidMount中获取数据，这里需要在componentWillReceiveProps添加获取数据的逻辑，因为组件被加载后，每当用户单击不同的资料库就接收
    // // 到新参数。这种情况下 componentDidMount方法并不会在用户每次单击时都重新被调用。但componentWillReceiveProps则会每次都被调用
    // componentWillReceiveProps(nextProps) {
    //     let id = nextProps.params.id;
    //     this.fetchData(id)
    // }

    //  移除constructor、componentDidMount、componentWillReceiveProps、fetchData方法，修改render ，使得该组件为纯组件只接收并显示props

    renderRepository() {
        let repository = this.props.repositories.find((repo) => repo.id == this.props.params.id)
        let stars = [];
        // 点赞星数
        for (var i = 0; i < repository.postId; i++) {
            stars.push('⭐️')
        }
        return (
            <div>
                <h2>{repository.name}</h2>
                <p>{repository.email}</p>
                <p>Comment: {repository.body}</p>
                <span>{stars}</span>
            </div>
        )
    }

    render() {
        if (this.props.repositories.length > 0) {
            return this.renderRepository();
        } else {
            return <h4>Loading……</h4>
        }

    }
}

export default RepoDetails;