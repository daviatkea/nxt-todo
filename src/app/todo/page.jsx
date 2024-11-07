"use client";

import { useState } from "react";

export default function ToDoApp() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskText: "Lær React",
      completed: false,
    },
    {
      id: 2,
      taskText: "Lær Next",
      completed: false,
    },
  ]);

  function addTask(event) {
    // Stop refresh
    event.preventDefault();
    const formData = new FormData(event.target);
    // console.log(formData.get("task"));
    const newTask = {
      id: crypto.randomUUID(),
      taskText: formData.get("task"),
      completed: false,
    };
    // setTasks(tasks.concat(newTask));
    setTasks([newTask, ...tasks]);
    event.target.reset();
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  }

  return (
    <section>
      <Form addTask={addTask} />
      <List tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} />
    </section>
  );
}

function Form({ addTask }) {
  return (
    <form onSubmit={addTask}>
      <label htmlFor="task">Task</label>
      <input type="text" id="task" name="task" />
      <button>Add Task</button>
    </form>
  );
}

function List({ tasks, deleteTask, toggleTask }) {
  const incompletedTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  return (
    <div>
      <div className="list">
        <h2>ToDo</h2>
        <ul>
          {incompletedTasks.map((task) => (
            <ListItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
            />
          ))}
        </ul>
      </div>
      {completedTasks.length > 0 && (
        <div className="list">
          <h2>Done</h2>
          <ul>
            {completedTasks.map((task) => (
              <ListItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ListItem({ task, deleteTask, toggleTask }) {
  const { id, taskText, completed } = task;
  return (
    <li>
      <span className={completed ? "line-through" : ""}>{taskText}</span>
      <button onClick={() => deleteTask(id)}>Delete</button>
      <button onClick={() => toggleTask(id)}>Complete</button>
    </li>
  );
}
