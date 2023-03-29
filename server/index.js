import * as dotenv from "dotenv";
dotenv.config();

//Import fastify
import Fastify from "fastify";
import fastifyMySQL from "@fastify/mysql";
import cors from "@fastify/cors";

//Import routes
import taskRoutes from './routes/tasks.js';

const fastify = Fastify();
await fastify.register(cors, {});

fastify.register(fastifyMySQL, {
  promise: true,
  connectionString: process.env.DB_URL,
});

fastify.register(taskRoutes)


const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
