import * as db from "../lib/db/index.js";

const handleGetUserByEmail = async (email) => {
  const user = await db.users.getUserByEmail(email);
  return user;
};

const handleGetAllUsers = async () => {
  const users = await db.users.getAllUsers();
  return users;
};

export { handleGetUserByEmail, handleGetAllUsers };
