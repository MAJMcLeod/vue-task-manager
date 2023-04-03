import serverConfig from "../config/server.js";
import * as authService from "../services/authService.js";

const verifyUserCredentials = async (req, reply) => {
  const { email, password } = req.body;
  try {
    const {safeUserData, accessToken, refreshToken} =  await authService.handleVerifyUserCredentials(email, password);
    return safeUserData
    // reply.status(200)
    // .cookie("refreshToken", refreshToken, {
    //   secure: serverConfig.cookiesSecure,
    //   httpOnly: true,
    //   expires: serverConfig.cookiesExpiryDate(),
    //   domain: serverConfig.cookiesDomain,
    // }).set('Access-Token', accessToken).json(safeUserData)

  } catch (error) {
    return error;
  }
};

export { verifyUserCredentials };
