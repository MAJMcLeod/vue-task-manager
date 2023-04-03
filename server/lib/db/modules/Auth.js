import prisma from "../../../prisma/index.js";

const verifyUserCredentials = async (email) => {
    // Chack if email is in database
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  })
  return user;
};

export {verifyUserCredentials}

