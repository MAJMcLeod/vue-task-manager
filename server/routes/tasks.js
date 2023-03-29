import * as taskController from "../controllers/taskController.js";
import portInfo from "../middleware/middleware.js";
import taskSchema from "../schemas/tasks.json" assert { type: "json" };

const routes = async (fastify, options) => {
  fastify.get("/tasks", {preHandler: [portInfo]}, taskController.getAllUsers);
  fastify.post("/tasks", {schema: taskSchema, preHandler: [portInfo]}, taskController.addUser);
  fastify.delete("/tasks/:id", {preHandler: [portInfo]}, taskController.deleteUser); 
  fastify.put("/tasks/:id", {schema: taskSchema, preHandler: [portInfo]}, taskController.editUser);
};

export default routes;
