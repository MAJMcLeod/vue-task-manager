import prisma from "../../../prisma/index.js";

const getAllTasks = async () => {
  const tasks = await prisma.tasks.findMany();
  return tasks;
};

const addTask = async (task, endDate, status) => {
  const tasks = await prisma.tasks.create({
    data: { task, endDate, status },
  });
  return tasks;
};

const deleteTask = async (id) => {
  const tasks = await prisma.tasks.delete({ where: { id } });
  return tasks;
};

const editTask = async (id, task, endDate, status) =>{
    const tasks = await prisma.tasks.update({
        where: { id },
        data: { task, endDate, status },
      });
      return tasks;
}

export {getAllTasks, deleteTask, editTask, addTask}

