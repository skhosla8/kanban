import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddColumnIcon from "../assets/icon-add-task-mobile-purple-dark.svg";
import { addNewColumn, removeExistingColumn } from "../redux/reducers/boardsSlice";

function EditBoard({ currentBoard }) {
    const board = useSelector((state) =>
        state.boards.allBoards.filter((board) => board.name === currentBoard)
    );

    const dispatch = useDispatch();

    const removeColumn = (inputId) => {
        let input = document.getElementById(inputId);
        let columnName = input && input.value;

        dispatch(removeExistingColumn({ currentBoard, columnName }));
    };

    const addColumn = () => {
        let container = document.getElementById("edit-columns-container");

        let tempColumn = `<div class="edit-board__new-column">
             <input type="text" name="edit-column-input" style='width: 88%; margin-bottom: 0.5rem' /><span class="edit-board__columns-icon" style='color:#828FA3; font-size: 1.4rem; margin: -0.7rem 0 0 0.4rem; cursor: pointer'>&#215;</span>
           </div>`;

        let newInputs = document.getElementsByClassName('edit-board__new-column');
        let allInputs = document.getElementsByClassName('edit-board__columns');

        if (!allInputs.length || allInputs.length <= 5) {
            if (!newInputs.length || newInputs.length < 1) {
                container.insertAdjacentHTML("beforeend", tempColumn);
            }
        }
    };

    const columns = board && board[0] && board[0].columns.map((column, i) => (
        <div key={i} id={`edit-column-${i}`} className="edit-board__columns">
            <input
                id={`edit-column-input-${i}`}
                type="text"
                value={column.name}
                readOnly
            />
            <span
                className="edit-board__columns-icon"
                onClick={() =>
                    removeColumn(`edit-column-input-${i}`)
                }
            >
                &#215;
            </span>
        </div>
    ));

    const closeEditBoardModal = () => {
        let editBoardOverlay = document.getElementById("edit-board-overlay");
        let editBoardModal = document.getElementById("edit-board-modal");

        editBoardOverlay.classList.remove("overlay");
        editBoardModal.classList.remove("visible");
    };

    const updateBoard = () => {
        let inputs = document.getElementsByName("edit-column-input");

        for (const input of inputs) {
            let value = input.value;

            let newColumn = { name: value, tasks: [] };

            if (value) {
                dispatch(addNewColumn({ currentBoard, newColumn }))
            }
        }

        let newColumns = document.getElementsByClassName('edit-board__new-column');

        for (const column of newColumns) {
            column.remove();
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
                    {columns}
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
