import * as db from "../lib/db/index.js";

const handleGetTasks = async () => {
  const tasks = await db.tasks.getAllTasks();
  return tasks;
};

const handleAddTask = async (task, endDate, status) => {
  const tasks = await db.tasks.addTask(task, endDate, status);
  return tasks;
};

const handleDeleteTask = async (id) => {
  const tasks = await db.tasks.deleteTask(id);
  return tasks;
};

const handleEditTask = async (id, task, endDate, status) => {
  const tasks = await db.tasks.deleteTask(id, task, endDate, status);
  return tasks;
};

export { handleAddTask, handleDeleteTask, handleEditTask, handleGetTasks };
