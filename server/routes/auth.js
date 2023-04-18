import * as tokenController from "../controllers/tokenController.js";
import * as authController from "../controllers/authController.js";
import authenticate from "../middleware/authenticate.js";
import loginSchema from "../schemas/login.json" assert { type: "json" };

const routes = async (fastify, options) => {
  fastify.post(
    "/login",
    { schema: loginSchema },
    authController.verifyUserCredentials
  );
  fastify.get(
    "/revalidate-login",
    // { preHandler: [authenticate] },
    tokenController.getNewAccessToken
  );
};

export default routes;
