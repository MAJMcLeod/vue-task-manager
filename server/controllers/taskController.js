import * as taskService from "../services/taskService.js";

const getAllTasks = async (req, reply) => {
  try {
    return await taskService.handleGetTasks();
  } catch (error) {
    return error;
  }
};

const getTaskById = async (req, reply) => {
  const id = parseInt(req.params.id);
  try {
    return await taskService.handleGetTaskById(id);
  } catch (error) {
    return error;
  }
};

const addTask = async (req, reply) => {
  const { task, endDate, status, userid } = req.body;
  try {
    return await taskService.handleAddTask(task, endDate, status, userid);
  } catch (error) {
    return error;
  }
};

const deleteTask = async (req, reply) => {
  const id = parseInt(req.params.id);
  try {
    return await taskService.handleDeleteTask(id);
  } catch (error) {
    return error;
  }
};

const editTask = async (req, reply) => {
  const id = parseInt(req.params.id);
  const { task, endDate, status, userid } = req.body;
  try {
    return await taskService.handleEditTask(id, task, endDate, status, userid);
  } catch (error) {
    return error;
  }
};

const getTasksByUserId = async (req, reply) => {
  const userid = parseInt(req.params.userid);
  try {
    return await taskService.handleGetTasksByUserId(userid);
  } catch (error) {
    return error;
  }
};

export { getAllTasks, editTask, addTask, deleteTask, getTaskById, getTasksByUserId };
