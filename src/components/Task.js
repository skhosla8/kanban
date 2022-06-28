import React from 'react';

function Task({ task, setCurrentTask }) {
    const completedSubtasks = task && task.subtasks && task.subtasks.filter(subtask => subtask.isCompleted).length;

    const openTaskModal = () => {
        let openTaskOverlay = document.getElementById('open-task-overlay');
        let openTaskModal = document.getElementById('open-task-modal');

        openTaskOverlay.classList.add('overlay');
        openTaskModal.classList.add('visible');

        setCurrentTask(task);
    };

    return (
        <>
            <div className="task" onClick={openTaskModal}>
                <div className="task__title">{task.title}</div>
                <div className="task__subtasks">{`${completedSubtasks} of ${task.subtasks && task.subtasks.length} subtasks`}</div>
            </div>
        </>
    )
}

export default Task; 