import serverConfig from "../config/server.js";
import * as authService from "../services/authService.js";

const verifyUserCredentials = async (req, reply) => {
  const { email, password } = req.body;
  try {
    const { safeUserData, accessToken, refreshToken } =
      await authService.handleVerifyUserCredentials(email, password);
    reply
      .status(200)
      // Put refresh token in http cookie
      .setCookie("refreshToken", refreshToken, {
        secure: serverConfig.cookiesSecure,
        httpOnly: true,
        expires: serverConfig.cookiesExpiryDate(),
        domain: "localhost",
        path: "/",
      })
      .raw.setHeader("Access-Token", accessToken);

    return safeUserData;
    // Pass access token through response headers
  } catch (error) {
    return error;
  }
};

export { verifyUserCredentials };
