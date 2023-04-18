import * as tokenService from "../services/tokenService.js";

const getNewAccessToken = async (req, reply) => {
  try {
    const { refreshToken } = req.cookies;

    const { accessToken, userData } =
      await tokenService.handleGetNewAccessToken(refreshToken);
    reply.headers({ "access-token": accessToken }).send(userData);
  } catch (error) {
    console.log(error);
    throw new Error("Forbidden");
  }
};

export { getNewAccessToken };
