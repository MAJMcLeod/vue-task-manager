import * as taskController from "../controllers/taskController.js";
import portInfo from "../middleware/middleware.js";
import authenticate from "../middleware/authenticate.js";
import taskSchema from "../schemas/tasks.json" assert { type: "json" };

const routes = async (fastify, options) => {
  fastify.get("/tasks", {preHandler: [authenticate]}, taskController.getAllTasks);
  // fastify.get("/tasks/:id", {preHandler: [portInfo]}, taskController.getTaskById);
  fastify.get("/tasks/:userid", {preHandler: [authenticate]}, taskController.getTasksByUserId);
  fastify.post("/tasks", {schema: taskSchema, preHandler: [authenticate]}, taskController.addTask);
  fastify.delete("/tasks/:id", {preHandler: [authenticate]}, taskController.deleteTask); 
  fastify.put("/tasks/:id", {schema: taskSchema, preHandler: [authenticate]}, taskController.editTask);
};

export default routes;
