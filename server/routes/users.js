import * as userController from "../controllers/userController.js";
import portInfo from "../middleware/middleware.js";
import loginSchema from "../schemas/login.json" assert { type: "json" };

const routes = async (fastify, options) => {
  fastify.get("/users", { preHandler: [portInfo] }, userController.getAllUsers);
  fastify.get(
    "/users/:email",
    { preHandler: [portInfo] },
    userController.getUserByEmail
  );
};

export default routes;
