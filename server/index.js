import * as dotenv from "dotenv";
dotenv.config();

//Import fastify
import Fastify from "fastify";
import fastifyMySQL from "@fastify/mysql";
import cors from "@fastify/cors";

const fastify = Fastify();
await fastify.register(cors, {});

fastify.register(fastifyMySQL, {
  promise: true,
  connectionString: process.env.DB_URL,
});

fastify.get("/tasks", async (req, reply) => {
  const connection = await fastify.mysql.getConnection();
  const [rows] = await connection.query("SELECT * FROM tasks ORDER BY id DESC");
  connection.release();
  return rows;
});

fastify.post("/tasks", async (req, reply) => {
   const connection = await fastify.mysql.getConnection();
   await connection.query(
     `INSERT INTO tasks(task, endDate, status) VALUES ("${req.body.task}", "${req.body.endDate}", ${req.body.status})`
   );
   connection.release();
});

fastify.delete("/tasks/:id", async (req, reply) => {
  const { id } = req.params;
  const connection = await fastify.mysql.getConnection();
  await connection.query(`DELETE FROM tasks WHERE id=${id}`);
  connection.release();
});

fastify.put("/tasks/:id", async (req, reply) => {
  const { id } = req.params;
  const connection = await fastify.mysql.getConnection();
  await connection.query(
    `UPDATE tasks SET task="${req.body.task}", endDate="${req.body.endDate}", status=${req.body.status} WHERE id=${id}`
  );
  connection.release();
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
