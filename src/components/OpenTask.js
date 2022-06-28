import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskStatus, updateSubtasks } from '../redux/reducers/boardsSlice';

function OpenTask({ currentBoard, currentTask }) {
    const [status, setStatus] = useState('');

    const dispatch = useDispatch();

    const currBoard = useSelector((state) => state.boards.allBoards.filter(board => board.name === currentBoard));

    const completedTasks = currentTask.subtasks && currentTask.subtasks.filter(subtask => subtask.isCompleted === true).length;
    const allTasks = currentTask.subtasks && currentTask.subtasks.length;

    const currStatus = currentTask.status;
    const taskTitle = currentTask.title;

    const handleSubtask = (id) => {
        let subtask = document.getElementById(id);

        if (subtask) subtask.checked = !subtask.checked;

        let inputs = document.querySelectorAll('.subtasks-inputs');
        let subtasksArr = [];

        for (let i = 0; i < inputs.length; i++) {
            let subtask = document.getElementById(`subtask-title-${i}`);
            if (inputs[i].checked) {
                subtasksArr.push({ title: subtask.innerHTML, isCompleted: true });
            } else {
                subtasksArr.push({ title: subtask.innerHTML, isCompleted: false })
            }
        }

        dispatch(updateSubtasks({ currentBoard, currStatus, taskTitle, subtasksArr }));
    }

    const subtasksList = currentTask.subtasks && currentTask.subtasks.map((subtask, i) => (
        <li className="open-task__subtasks-list__item" key={i}>
            <input id={`subtask-${i}`} className="subtasks-inputs" type="checkbox" defaultChecked={subtask.isCompleted} onChange={() => handleSubtask(`subtask=${i}`)} />
            <span id={`subtask-title-${i}`} className="subtasks-spans">{subtask.title}</span>
        </li>
    ));

    const statusOptions = currBoard[0] && currBoard[0].columns
        .filter(column => column.name !== currentTask.status)
        .map((column, i) => (
            <option key={i} value={column.name}>{column.name}</option>
        ));

    const handleStatus = (e) => {
        setStatus(e.target.value);
    }

    const updateTask = () => {
        let openTaskOverlay = document.getElementById('open-task-overlay');
        let openTaskModal = document.getElementById('open-task-modal');

        openTaskOverlay.classList.remove('overlay');
        openTaskModal.classList.remove('visible');

        if (status) {
            dispatch(updateTaskStatus({ currentBoard, currStatus, taskTitle, status }));
        }
    }


    return (
        <>
            <div id="open-task-overlay"></div>
            <div id="open-task-modal" className="open-task">
                <div className="open-task__title">{currentTask.title}</div>
                <div className="open-task__description">{currentTask.description ? currentTask.description : 'No description'}</div>
                <div className="open-task__subtasks">Subtasks ({completedTasks} of {allTasks})</div>

                <ul className="open-task__subtasks-list">
                    {subtasksList}
                </ul>

                <label>Current Status</label>
                <select id="open-task-options" value={status} onChange={handleStatus}>
                    <option value={currentTask.status}>{currentTask.status}</option>
                    {statusOptions}
                </select>

                <button onClick={updateTask}>Save Changes</button>
            </div>
        </>
    )
}

export default OpenTask; 