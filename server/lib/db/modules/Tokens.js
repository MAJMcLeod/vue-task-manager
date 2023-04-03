import prisma from "../../../prisma/index.js";

//Will check if user already has a refresh token and either create an entry or update the already existing one
const upsertRefreshToken = async (userId, refreshToken) => {
    //LOVELEYYYY
  return await prisma.refresh_token.upsert({
    where: {
      user_id: userId,
    },
    update: {
      token_string: refreshToken,
    },
    create: {
      user_id: userId,
      token_string: refreshToken,
    },
  });
};

const findRefreshToken = async (refreshToken) => {
  return await prisma.refresh_token.findFirst({
    where: {
      token_string: refreshToken,
    }
  });
};



export { upsertRefreshToken, findRefreshToken };
