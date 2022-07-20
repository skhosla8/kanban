import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import './css/App.css';

function App() {
  const [currentBoard, setCurrentBoard] = useState('Platform Launch');
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    setCurrentBoard('Platform Launch');
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
        setCurrentBoard={setCurrentBoard}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
      />
    </div>
  )
}

export default App;
