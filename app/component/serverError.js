import React, { Component } from 'react';

const style = {
    root: {
        textAlign: 'center'
    },
    alert: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#9ab2d'
    }
}

class ServerError extends Component {
    render() {
        return (
            <div style={style.root}>
                <div style={style.alert}>&#9888;</div>
                <h1>Ops. We have a problem. Please try again later.</h1>
            </div>
        )
    }
}

export default ServerError;