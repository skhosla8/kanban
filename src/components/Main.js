import React from 'react';
import { useSelector } from 'react-redux';
import Column from './Column';
import AddColumnIcon from '../assets/icon-add-task-mobile-gray.svg';
import CreateBoard from './CreateBoard';
import AddTask from './AddTask';
import OpenTask from './OpenTask';
import EditBoard from './EditBoard';
import DeleteItem from './DeleteItem';

function Main({ currentBoard, setCurrentBoard, currentTask, setCurrentTask, deleteItem, setDeleteItem }) {
    const allBoards = useSelector((state) => state.boards.allBoards);

    const selectedBoard = allBoards.filter(board => board.name === currentBoard);

    const renderedColumns = selectedBoard[0] && selectedBoard[0].columns.map((column, i) => (
        <Column
            id={`column-${i}`}
            key={i}
            currentBoard={currentBoard}
            column={column}
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
        />
    ));

    const openEditBoardModal = () => {
        let editBoardOverlay = document.getElementById('edit-board-overlay');
        let editBoardModal = document.getElementById('edit-board-modal');

        editBoardOverlay.classList.add('overlay');
        editBoardModal.classList.add('visible');
    }

    return (
        <div id="main" className="main">
            <div className="main__content">
                {renderedColumns}

                <div className="main__add-column">
                    <div onClick={openEditBoardModal}>
                        <img src={AddColumnIcon} alt="add-column-icon"></img>
                        New Column
                    </div>
                </div>

                <CreateBoard />
                <AddTask
                    currentBoard={currentBoard}
                />
                <OpenTask
                    currentBoard={currentBoard}
                    currentTask={currentTask}
                    setCurrentTask={setCurrentTask}
                    setDeleteItem={setDeleteItem}
                />
                <EditBoard
                    currentBoard={currentBoard}
                />
                <DeleteItem
                    currentBoard={currentBoard}
                    setCurrentBoard={setCurrentBoard}
                    currentTask={currentTask}
                    setCurrentTask={setCurrentTask}
                    deleteItem={deleteItem}
                />
            </div>
        </div>
    )
}

export default Main; 