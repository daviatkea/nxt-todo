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
    {
      id: 3,
      taskText: "Lær Noget andet",
      completed: false,
    },
  ]);

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => {
        if (task.completed) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  }

  return (
    <section>
      <Form />
      <List tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} />
    </section>
  );
}

function Form() {
  return (
    <form>
      <label htmlFor="task">Task</label>
      <input type="text" id="task" />
      <button>Add Task</button>
    </form>
  );
}

function List({ tasks, deleteTask, toggleTask }) {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        ))}
      </ul>
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
