import React from "react";
import Task from './Task';

function Column({ id, column }) {
  const tasks = column.tasks && column.tasks.map((task, i) => (
    <Task
      key={`task-${i}`}
      task={task}
    />
  ));

  return (
    <div className="column">
      <div className="column__status">
        <span id={`bullet-${id}`}>&#11044;</span>
        <div>{column.name} ({column.tasks.length})</div>
      </div>

      {tasks}
    </div>
  )
}

export default Column; 