import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddColumnIcon from "../assets/icon-add-task-mobile-purple-dark.svg";
import { addNewColumn, removeExistingColumn } from "../redux/reducers/boardsSlice";

function EditBoard({ currentBoard }) {
    const [columns, setColumns] = useState([]);

    const board = useSelector((state) =>
        state.boards.allBoards.filter((board) => board.name === currentBoard)
    );

    const dispatch = useDispatch();

    const removeNewColumn = (id) => {
        let columnContainers = document.getElementsByClassName('edit-board__new-column');

        for (const column of columnContainers) {
            if (column.id === id) {
                column.remove();
            }
        }
    };

    const renderedColumns = columns && columns.map((column, i) => (
        <div id={`new-column-${i}`} key={i} className='edit-board__columns edit-board__new-column'>
            <input name='edit-column-input' /><span className='edit-board__columns-icon' onClick={() => removeNewColumn(`new-column-${i}`)}>&#215;</span>
        </div>
    ));

    const removeColumn = (inputId) => {
        let input = document.getElementById(inputId);
        let columnName = input && input.value;

        dispatch(removeExistingColumn({ currentBoard, columnName }));
    };

    const addColumn = () => {
        let tempColumn = `<div class='edit-board__columns'>
             <input type='text' /><span class='edit-board__columns-icon'>&#215;</span>
           </div>`;

        setColumns([...columns, tempColumn]);
    };

    const initialColumns = board && board[0] && board[0].columns.map((column, i) => (
        <div key={i} id={`column-${i}`} className='edit-board__columns'>
            <input
                id={`column-input-${i}`}
                type='text'
                value={column.name}
                readOnly
            />
            <span
                className='edit-board__columns-icon'
                onClick={() =>
                    removeColumn(`column-input-${i}`)
                }
            >
                &#215;
            </span>
        </div>
    ));

    const closeEditBoardModal = () => {
        let editBoardOverlay = document.getElementById('edit-board-overlay');
        let editBoardModal = document.getElementById('edit-board-modal');

        editBoardOverlay.classList.remove('overlay');
        editBoardModal.classList.remove('visible');
    };

    const updateBoard = () => {
        let inputs = document.getElementsByName('edit-column-input');

        for (const input of inputs) {
            let value = input.value;

            let newColumn = { name: value, tasks: [] };

            if (value) {
                dispatch(addNewColumn({ currentBoard, newColumn }));
                setColumns([]);
            }
        }

        closeEditBoardModal();
    };

    return (
        <>
            <div id="edit-board-overlay"></div>
            <div id="edit-board-modal" className="edit-board">
                <div className="edit-board__title">Edit Board</div>

                <label>Board Name</label>
                <input
                    className="edit-board__input"
                    type="text"
                    value={currentBoard}
                    readOnly
                />

                <div id="edit-columns-container">
                    <label>Board Columns</label>
                    {initialColumns}
                    {renderedColumns}
                </div>

                <button onClick={addColumn}>
                    <img src={AddColumnIcon} alt="add-column-icon" /> Add New Column
                </button>

                <button onClick={updateBoard}>Save Changes</button>
            </div>
        </>
    );
}

export default EditBoard;
