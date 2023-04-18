import prisma from "../../../prisma/index.js";

//Will check if user already has a refresh token and either create an entry or update the already existing one
const upsertRefreshToken = async (userId, refreshToken) => {
  //LOVELEYYYY
  await prisma.refresh_token.upsert({
    where: {
      userId: userId
    },
    update: {
      tokenString: refreshToken
    },
    create: {
      userId: userId,
      tokenString: refreshToken
    },
  });
};

const findRefreshToken = async (refreshToken) => {
  return await prisma.refresh_token.findFirst({
    where: {
      tokenString: refreshToken,
    },
  });
};

export { upsertRefreshToken, findRefreshToken };
