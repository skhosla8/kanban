import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBoard, deleteTask } from '../redux/reducers/boardsSlice';

function DeleteItem({ currentBoard, setCurrentBoard, currentTask, deleteItem }) {
    let updatedBoard = useSelector((state) => state.boards.allBoards[0]).name;
    let title = currentTask.title;
    let statusValue = currentTask.status;

    const dispatch = useDispatch();

    const removeDeleteModal = () => {
        let addDeleteOverlay = document.getElementById('add-delete-overlay');
        let addDeleteModal = document.getElementById('add-delete-modal');

        addDeleteOverlay.classList.remove('overlay');
        addDeleteModal.classList.remove('visible');
    };

    const deleteCurrItem = () => {
        if (deleteItem === 'board') {
            dispatch(deleteBoard({ currentBoard }));
            setCurrentBoard(updatedBoard);
        } else {
            dispatch(deleteTask({ currentBoard, statusValue, title }));
        }

        removeDeleteModal();
    };

    const itemToDelete = deleteItem === 'board' ?
        `Are you sure you want to delete the '${currentBoard}' board? This action will remove all columns and tasks and cannot be reversed.` :
        `Are you sure you want to delete the '${currentTask.title}' task and its subtasks? This action cannot be reversed.`;

    return (
        <>
            <div id="add-delete-overlay"></div>
            <div id="add-delete-modal" className="delete-board">
                <div className="delete-board__title">Delete this {deleteItem}?</div>

                <div className="delete-board__description">{itemToDelete}</div>

                <div className="delete-board__buttons-container">
                    <button onClick={deleteCurrItem}>Delete</button>
                    <button onClick={removeDeleteModal}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default DeleteItem;