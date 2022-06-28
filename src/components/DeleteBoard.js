import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBoard } from '../redux/reducers/boardsSlice';

function DeleteBoard({ currentBoard, setCurrentBoard }) {
    let updatedBoard = useSelector((state) => state.boards.allBoards[0]).name;

    const dispatch = useDispatch();

    const removeDeleteModal = () => {
        let addDeleteOverlay = document.getElementById('add-delete-overlay');
        let addDeleteModal = document.getElementById('add-delete-modal');

        addDeleteOverlay.classList.remove('overlay');
        addDeleteModal.classList.remove('visible');
    };

    const deleteCurrBoard = () => {
        dispatch(deleteBoard({ currentBoard }));
        setCurrentBoard(updatedBoard);
        removeDeleteModal();
    };

    return (
        <>
            <div id="add-delete-overlay"></div>
            <div id="add-delete-modal" className="delete-board">
                <div className="delete-board__title">Delete this board?</div>

                <div className="delete-board__description">Are you sure you want to delete the '{currentBoard}' board? This action will remove all columns and tasks and cannot be reversed.</div>

                <div className="delete-board__buttons-container">
                    <button onClick={deleteCurrBoard}>Delete</button>
                    <button onClick={removeDeleteModal}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default DeleteBoard;