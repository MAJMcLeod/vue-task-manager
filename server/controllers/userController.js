import * as userService from "../services/userService.js";

const getUserByEmail = async (req, reply) => {
  const email = String(req.params.email);
  try {
    return await userService.handleGetUserByEmail(email);
  } catch (error) {
    return error;
  }
};

const userLogin = async (req, reply) => {
  const { email, password } = req.body;
  try {
    return await userService.handleUserLogin(email, password);
    //bulletproof
  } catch (error) {
    return error;
  }
};

const getAllUsers = async (req, reply) => {
  try {
    return await userService.handleGetAllUsers();
  } catch (error) {
    return error;
  }
};

export { getUserByEmail, getAllUsers, userLogin };
