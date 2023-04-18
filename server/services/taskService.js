import * as db from "../lib/db/index.js";

const handleGetTasks = async () => {
  const tasks = await db.tasks.getAllTasks();
  return tasks;
};

const handleGetTaskById = async (id) => {
  const tasks = await db.tasks.getTaskById(id);
  return tasks;
};

const handleAddTask = async (task, endDate, status, userid) => {
  const tasks = await db.tasks.addTask(task, endDate, status, userid);
  return tasks;
};

const handleDeleteTask = async (id) => {
  const tasks = await db.tasks.deleteTask(id);
  return tasks;
};

const handleEditTask = async (id, task, endDate, status, userid) => {
  const tasks = await db.tasks.editTask(id, task, endDate, status, userid);
  return tasks;
};

const handleGetTasksByUserId = async (userid) => {
  const tasks = await db.tasks.getTasksByUserId(userid);
  return tasks;
};

export { handleAddTask, handleDeleteTask, handleEditTask, handleGetTasks, handleGetTaskById, handleGetTasksByUserId };
