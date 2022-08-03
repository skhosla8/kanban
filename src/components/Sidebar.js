import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../assets/logo-light.svg';
import BoardIcon from '../assets/icon-board.svg';
import BoardIconWhite from '../assets/icon-board-white.svg';
import BoardIconPurple from '../assets/icon-board-purple-dark.svg';
import AddBoardIcon from '../assets/icon-add-task-mobile-purple-dark.svg';

function Sidebar({ currentBoard, setCurrentBoard }) {
    const boards = useSelector((state) => state.boards.allBoards);

    const numBoards = useSelector((state) => state.boards.allBoards.length);

    useEffect(() => {
        boards.forEach((board, i) => {
            let btn = document.getElementById(`board-${i}`);

            if (board.name === currentBoard) {
                btn.classList.add('board-active');
                btn.firstElementChild.src = BoardIconPurple;
            } else {
                btn.classList.remove('board-active');
            }
        })
    }, [boards, currentBoard]);

    const setIcon = (id) => {
        let icons = document.getElementsByClassName('sidebar__boards__board__icon');

        for (const icon of icons) {
            if (icon.id === id) {
                icon.setAttribute('src', BoardIconPurple);
            }
        }
    }

    const unsetIcon = (id) => {
        let icons = document.getElementsByClassName('sidebar__boards__board__icon');

        for (const icon of icons) {
            if (icon.id === id) {
                icon.setAttribute('src', icon.nextElementSibling.innerText === currentBoard ? BoardIconWhite : BoardIcon);
            }
        }
    };

    const boardsList = boards.map((board, i) => (
        <button id={`board-${i}`} className='sidebar__boards__board' key={i} onClick={() => setCurrentBoard(board.name)} onMouseEnter={() => setIcon(`board-icon-${i}`)} onMouseLeave={() => unsetIcon(`board-icon-${i}`)}>
            <img id={`board-icon-${i}`} className='sidebar__boards__board__icon' src={board.name === currentBoard ? BoardIconWhite : BoardIcon} alt='board-icon' />
            <span>{board.name}</span>
        </button>
    ));

    const addBoardModal = () => {
        let addModalOverlay = document.getElementById('add-modal-overlay');
        let addModal = document.getElementById('add-modal');

        addModalOverlay.classList.add('overlay');
        addModal.classList.add('visible');
    }

    const navigateToHomepage = () => {
        let homepage = boards[0].name;

        setCurrentBoard(homepage);
    };

    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <img src={Logo} alt="logo" onClick={navigateToHomepage}></img>
            </div>

            <div className="sidebar__boards">
                <div className="sidebar__boards__all">ALL BOARDS ({numBoards})</div>
                {boardsList}

                <button className="sidebar__boards__create" onClick={addBoardModal}>
                    <img src={BoardIconPurple} alt="board-icon-purple" />

                    <div>
                        <img src={AddBoardIcon} alt="add-board-icon" />
                        <span>Create New Board</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Sidebar; 