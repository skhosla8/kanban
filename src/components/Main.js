import React from 'react';
import { useSelector } from 'react-redux';
import Column from './Column';
import AddColumnIcon from '../assets/icon-add-task-mobile-gray.svg';
import CreateBoard from './CreateBoard';
import AddTask from './AddTask';

function Main({ currentBoard }) {
    const allBoards = useSelector((state) => state.boards.allBoards);

    const selectedBoard = allBoards.filter(board => board.name === currentBoard);

    const renderedColumns = selectedBoard[0] && selectedBoard[0].columns.map((column, i) => (
        <Column
            id={`column-${i}`}
            key={i}
            column={column}
        />
    ));

    return (
        <div className="main">
            <div className="main__content">
                {renderedColumns}

                <div className="main__add-column">
                    <div>
                        <img src={AddColumnIcon} alt="add-column-icon"></img>
                        New Column
                    </div>
                </div>

                <CreateBoard />
                <AddTask
                    currentBoard={currentBoard} />
            </div>
        </div>
    )
}

export default Main; 