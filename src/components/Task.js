import React from 'react';

function Task({ task }) {
    const completedSubtasks = task.subtasks.filter(subtask => subtask.isCompleted).length;

    return (
        <div className="task">
            <div className="task__title">{task.title}</div>
            <div className="task__subtasks">{`${completedSubtasks} of ${task.subtasks.length} subtasks`}</div>
        </div>
    )
}

export default Task; 