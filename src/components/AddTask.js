import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddSubtaskIcon from "../assets/icon-add-task-mobile-purple-dark.svg";

function AddTask({ currentBoard }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const boards = useSelector(state => state.boards.allBoards);

    const currBoard = boards.filter(board => board.name === currentBoard);

    const statusOptions = currBoard[0].columns.map((column, i) => (
        <option key={i} value={column.name}>{column.name}</option>
    ));

    const addSubtask = () => {
        let container = document.getElementById("subtasks-container");

        let newSubtask = `<div class="add-task__subtask">
             <input type="text" name="subtask" style='width: 88%; margin-bottom: 0.5rem' /><span style='color:#828FA3; font-size: 1.4rem; margin: -0.7rem 0 0 0.4rem; cursor: pointer'>&#215;</span>
           </div>`;

        container.insertAdjacentHTML("beforeend", newSubtask);
    };

    const removeSubtask = () => {
        let subtaskContainers = document.getElementsByClassName(
            "add-task__subtask"
        );

        for (const container of subtaskContainers) {
            container.remove();
        }
    };

    return (
        <>
            <div id="add-task-overlay"></div>
            <div id="add-task-modal" className="add-task">
                <div className="add-task__title">Add New Task</div>

                <label>Title</label>
                <input
                    id="add-task-title"
                    type="text"
                    value={title}
                    placeholder="e.g. Take coffee break"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description</label>
                <input
                    id="add-task-description"
                    type="text"
                    value={description}
                    placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div id="subtasks-container">
                    <label>Subtasks</label>

                    <div className="add-task__subtask">
                        <input type="text" name="subtask" defaultValue="" placeholder="e.g. Make coffee" />
                        <span onClick={removeSubtask}>&#215;</span>
                    </div>

                    <div className="add-task__subtask">
                        <input type="text" name="subtask" defaultValue="" placeholder="e.g. Drink coffee & smile" />
                        <span onClick={removeSubtask}>&#215;</span>
                    </div>
                </div>

                <button onClick={addSubtask}>
                    <img src={AddSubtaskIcon} alt="add-subtask-icon" /> Add New Subtask
                </button>

                <label>Status</label>
                <select name="status" id="add-task-status">
                    {statusOptions}
                </select>

                <button>Create Task</button>
            </div>
        </>
    )
}

export default AddTask;