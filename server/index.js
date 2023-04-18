import * as dotenv from "dotenv";
dotenv.config();

//Import fastify
import Fastify from "fastify";
import fastifyMySQL from "@fastify/mysql";
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";

//Import routes
import taskRoutes from "./routes/tasks.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const fastify = Fastify();
await fastify.register(cors, {
  credentials: true,
  origin: ["http://localhost:5173"],
  exposedHeaders: ['Access-Token'],
});

fastify.register(fastifyMySQL, {
  promise: true,
  connectionString: process.env.DB_URL,
});

fastify.register(fastifyCookie, {});

fastify.register(taskRoutes);
fastify.register(userRoutes);
fastify.register(authRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
