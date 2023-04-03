import * as db from "../lib/db/index.js";
import * as dotenv from "dotenv";
dotenv.config();
import Jwt from "jsonwebtoken";
import serverConfig from "../config/server.js";

const handleVerifyUserCredentials = async (email, loginPwd) => {
  // This is so basic i wanna die
  const user = await db.auth.verifyUserCredentials(email);
  // Sanitize user object of sensitive info
  const { password, ...safeUserData } = user;

  if (user === null || user.password !== loginPwd) {
    throw new Error("Email or password invalid");
  } else {
    // Use sanitized info to generate 2 new tokens
    const accessToken = Jwt.sign(safeUserData, process.env.JWT_SECRET_KEY, {expiresIn: serverConfig.accessTokenDuration});
    const refreshToken = Jwt.sign(safeUserData, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: serverConfig.refreshTokenDuration});

    const pushRefreshToken = db.tokens.upsertRefreshToken(safeUserData.id, refreshToken);

    return {safeUserData, accessToken, refreshToken};
  }
  // Really basic login function just to get frontend working
};

export { handleVerifyUserCredentials };
