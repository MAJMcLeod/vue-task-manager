import * as serverConfig from '../config/server.js'
import * as db from '../lib/db/index.js'
import util from "util";
import process from "process";
import Jwt from "jsonwebtoken";

const jwtVerifyAsync = util.promisify(Jwt.verify);


const handleGetNewAccessToken = async (refreshToken) => {

    //Find the refresh token stored in the database
    const refreshTokenResult = await db.tokens.findRefreshToken(refreshToken);

    //Check if token is valid
    const decoded = await jwtVerifyAsync(refreshTokenResult.tokenString, process.env.JWT_REFRESH_SECRET_KEY);

    //Get the user data
    const userData = await db.users.getUserByEmail(decoded.email);

    //Generate new access token 
    const accessToken = Jwt.sign(userData, process.env.JWT_SECRET_KEY, {expiresIn: serverConfig.default.accessTokenDuration});

    return {accessToken, userData};
}

export {handleGetNewAccessToken};