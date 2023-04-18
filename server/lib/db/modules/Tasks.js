import prisma from "../../../prisma/index.js";

const getAllTasks = async () => {
  const tasks = await prisma.tasks.findMany();
  return tasks;
};

const getTaskById = async (id) => {
  const tasks = await prisma.tasks.findUnique({
    where: {
      id,
    },
  });
  return tasks;
};

const addTask = async (task, endDate, status, userid) => {
  const tasks = await prisma.tasks.create({
    data: { task, endDate, status, userid },
  });
  return tasks;
};

// Q: If there are tasks specific to users, should userId be included in the WHERE clause?
const deleteTask = async (id) => {
  const tasks = await prisma.tasks.delete({ where: { id } });
  return tasks;
};

const editTask = async (id, task, endDate, status, userid) => {
  const tasks = await prisma.tasks.update({
    where: { id },
    data: { task, endDate, status, userid },
  });
  return tasks;
};

const getTasksByUserId = async (userid) => {
  const tasks = await prisma.tasks.findMany({
    where: { userid },
  });
  return tasks;
};


export { getAllTasks, deleteTask, editTask, addTask, getTaskById, getTasksByUserId };
