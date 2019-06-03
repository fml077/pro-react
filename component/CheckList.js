import React, { Component, PropTypes } from 'react';

class CheckList extends Component {
    render () {
        let tasks = this.props.tasks.map((task) => (
            <li className='checklist_task' key={task.id} id={task.id}>
                <input type="checkbox" defaultChecked={task.done}/>
                {task.name}
                <a className='checklist_task-remove'></a>
            </li>
        ))

        return (
            <div className='checklist'>
                <ul>{tasks}</ul>
                <input type='text' className='checklist--add-task' placeholder='Type then hit Enter to add a task'/>
            </div>
        )
    }
}
CheckList.PropTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object)
}
export default CheckList;