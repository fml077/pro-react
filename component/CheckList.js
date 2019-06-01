import React, { Component } from 'react';

class CheckList extends Component {
    render () {
        let tasks = this.props.tasks.map((task) => (
            <li className='checklist_task' id={task.id}>
                <input type="checkbox" defaultChecked={task.done}/>
                {task.name}
                <a className='checklist_task-remove'></a>
            </li>
        ))

        return (
            <div className='checklist'>
                <ul>{tasks}</ul>
            </div>
        )
    }
}

export default CheckList;