import * as taskService from "../services/taskService.js";

const getAllUsers = async (req, reply) => {
  try {
    return await taskService.handleGetTasks();
  } catch (error) {
    return error;
  }
};

const addUser = async (req, reply) => {
  const { task, endDate, status } = req.body;
  try {
    return await taskService.handleAddTask(task, endDate, status);
  } catch (error) {
    return error;
  }
};

const deleteUser = async (req, reply) => {
  const id = parseInt(req.params.id);
  try {
    return await taskService.handleDeleteTask(id);
  } catch (error) {
    return error;
  }
};

const editUser = async (req, reply) => {
  const id = parseInt(req.params.id);
  const { task, endDate, status } = req.body;
  try {
    return await taskService.handleEditTask(id, task, endDate, status);
  } catch (error) {
    return error;
  }
};

export { getAllUsers, editUser, addUser, deleteUser };
