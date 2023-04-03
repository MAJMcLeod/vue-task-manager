import * as authController from "../controllers/authController.js";
import portInfo from "../middleware/middleware.js";
import loginSchema from "../schemas/login.json" assert { type: "json" };

const routes = async (fastify, options) => {
  fastify.post(
    "/login",
    { schema: loginSchema, preHandler: [portInfo] },
    authController.verifyUserCredentials
  );
};

export default routes;
