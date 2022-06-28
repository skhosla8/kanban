import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBoard } from '../redux/reducers/boardsSlice';
import AddColumnIcon from "../assets/icon-add-task-mobile-purple-dark.svg";

function CreateBoard() {
    const [boardName, setBoardName] = useState("");

    const dispatch = useDispatch();

    const closeBoardModal = () => {
        let addModalOverlay = document.getElementById('add-modal-overlay');
        let addModal = document.getElementById('add-modal');

        addModal.classList.remove('visible');
        addModalOverlay.classList.remove('overlay');
    };

    const removeColumn = () => {
        let columnContainers = document.getElementsByClassName(
            "create-board__columns"
        );

        for (const container of columnContainers) {
            container.remove();
        }
    };

    const addColumn = () => {
        let container = document.getElementById("board-columns-container");

        let newColumn = `<div class="create-board__columns">
             <input type="text" name="columns-array" style='width: 88%; margin-bottom: 0.5rem' />
             <span style='color:#828FA3; font-size: 1.4rem; margin: -0.7rem 0 0 0.4rem; cursor: pointer' class="new-board-icons">&#215;</span>
           </div>`;

        container.insertAdjacentHTML("beforeend", newColumn);
    };

    const createBoard = () => {
        let inputs = document.getElementsByName("columns-array");
        let columnsArr = [];

        for (let i = 0; i < inputs.length; i++) {
            columnsArr.push({ name: inputs[i].value, tasks: [] });
        }

        if (boardName && columnsArr.length >= 1) {
            dispatch(addBoard({
                name: boardName,
                columns: columnsArr,
            }));

            closeBoardModal();
        }
    };

    return (
        <>
            <div id="add-modal-overlay"></div>
            <div id="add-modal" className="create-board">
                <div className="create-board__title">Add New Board</div>

                <label>Board Name</label>
                <input
                    type="text"
                    value={boardName}
                    placeholder="e.g. Web Design"
                    onChange={(e) => setBoardName(e.target.value)}
                />

                <div id="board-columns-container">
                    <label>Board Columns</label>
                    <div className="create-board__columns">
                        <input type="text" name="columns-array" defaultValue="Todo" />
                        <span className="columns-icon" onClick={removeColumn}>
                            &#215;
                        </span>
                    </div>

                    <div className="create-board__columns">
                        <input type="text" name="columns-array" defaultValue="Doing" />
                        <span className="columns-icon" onClick={removeColumn}>
                            &#215;
                        </span>
                    </div>
                </div>

                <button className="create-board__add" onClick={addColumn}>
                    <img src={AddColumnIcon} alt="add-column-icon"></img>Add New Column
                </button>
                <button className="create-board__create" onClick={createBoard}>
                    Create New Board
                </button>
            </div>
        </>
    );
}

export default CreateBoard;
