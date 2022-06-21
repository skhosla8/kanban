import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import './css/App.css';

function App() {
  const [currentBoard, setCurrentBoard] = useState('Platform Launch');

  const navigate = useNavigate();

  const redirectToHomepage = () => {
    navigate('/Platform-Launch');
  }

  useEffect(() => {
    setCurrentBoard('Platform Launch');
    redirectToHomepage();

    //eslint-disable-next-line
  }, []);

  return (
    <div className="app">
      <Header
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
      />
      <Sidebar
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
      />
      <Main
        currentBoard={currentBoard}
      />
    </div>
  )
}

export default App;
