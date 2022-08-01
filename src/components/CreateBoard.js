import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBoard } from '../redux/reducers/boardsSlice';
import AddColumnIcon from "../assets/icon-add-task-mobile-purple-dark.svg";

function CreateBoard() {
    const [boardName, setBoardName] = useState("");
    const [boards, setBoards] = useState([]);

    const dispatch = useDispatch();

    const boardsCollection = document.getElementsByClassName('create-board__columns');

    const removeColumn = (id) => {
        let columnContainers = document.getElementsByClassName(
            'create-board__columns'
        );

        for (const container of columnContainers) {
            if (container.id === id) {
                container.remove();
            }
        }
    };

    const renderedBoards = boards && boards.slice(2).map((board, i) => (
        <div key={i} id={`column-${i + 2}`} className='create-board__columns'>
            <input type='text' name='columns-array' defaultValue='' />
            <span className='new-board-icons' onClick={() => removeColumn(`column-${i + 2}`)}>&#215;</span>
        </div>
    ));

    const closeBoardModal = () => {
        let addModalOverlay = document.getElementById('add-modal-overlay');
        let addModal = document.getElementById('add-modal');

        addModal.classList.remove('visible');
        addModalOverlay.classList.remove('overlay');
    };

    const addColumn = () => {
        let newColumn = `<div class='create-board__columns'>
             <input type='text' name='columns-array' />
             <span class='new-board-icons'>&#215;</span>
           </div>`;

        setBoards([...boards, newColumn]);
    };

    const createBoard = () => {
        let inputs = document.getElementsByName('columns-array');
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

    useEffect(() => {
        setBoards([...boardsCollection]);
    }, [boardsCollection]);

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
                    <div id="column-0" className="create-board__columns">
                        <input type="text" name="columns-array" defaultValue="Todo" />
                        <span className="columns-icon" onClick={() => removeColumn(`column-${0}`)}>
                            &#215;
                        </span>
                    </div>

                    <div id="column-1" className="create-board__columns">
                        <input type="text" name="columns-array" defaultValue="Doing" />
                        <span className="columns-icon" onClick={() => removeColumn(`column-${1}`)}>
                            &#215;
                        </span>
                    </div>

                    {renderedBoards}
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
