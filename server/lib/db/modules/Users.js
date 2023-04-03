import prisma from "../../../prisma/index.js";

const getUserByEmail = async (email) => {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
      
    },
  })
  return user;
};

const getAllUsers = async () => {
  const user = await prisma.users.findMany();
  return user;
};

export {getUserByEmail, getAllUsers}

