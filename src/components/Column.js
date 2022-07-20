import React from "react";
import { useDispatch } from 'react-redux';
import { updateColumn, updateDropStatus } from '../redux/reducers/boardsSlice';
import Task from './Task';

function Column({ id, column, currentBoard, currentTask, setCurrentTask }) {
  const dispatch = useDispatch();

  const tasks = column.tasks && column.tasks.map((task, i) => (
    <Task
      key={`task-${i}`}
      task={task}
      setCurrentTask={setCurrentTask}
    />
  ));

  const handleDrop = (e) => {
    e.preventDefault();

    let dropColumnName = e.target.id;
    let taskStatus = currentTask.status;
    let taskTitle = currentTask.title;
;
    let status = e.target.id;

    dispatch(updateColumn({ currentBoard, taskStatus, taskTitle, dropColumnName, currentTask }));
    dispatch(updateDropStatus({currentBoard, status, taskTitle }))

    e.target.classList.remove('dragover');
  };

  const handleDragEnter = (e) => {
    if (e.target.classList.contains('column')){
      e.target.classList.add('dragover');
    }
  
  };

  const handleDragLeave = (e) => {
    if (e.target.classList.contains('dragover')){
      e.target.classList.remove('dragover');
    }
  }

  return (
    <div id={column.name} className="column" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onDragEnter=
    {handleDragEnter} onDragLeave={handleDragLeave}>
      <div className="column__status">
        <span id={`bullet-${id}`}>&#11044;</span>
        <div>{column.name} ({column.tasks.length})</div>
      </div>

      {tasks}
    </div>
  )
}

export default Column; 