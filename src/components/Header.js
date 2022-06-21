import React from 'react';
import AddTaskIcon from '../assets/icon-add-task-mobile.svg';
import EllipsisIcon from '../assets/icon-vertical-ellipsis.svg';

function Header({ currentBoard }) {
    const addTaskModal = () => {
        let addTaskOverlay = document.getElementById('add-task-overlay');
        let addTaskModal = document.getElementById('add-task-modal');

        addTaskOverlay.classList.add('overlay');
        addTaskModal.classList.add('visible');
    };

    return (
        <div className="header">
            <div>{currentBoard}</div>

            <div>
                <button onClick={addTaskModal}>
                    <img src={AddTaskIcon} alt="add-task-icon" />
                    Add New Task
                </button>
                <img src={EllipsisIcon} alt="vertical-ellipsis" />
            </div>

        </div>
    )
}

export default Header; 