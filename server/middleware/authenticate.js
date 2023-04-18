import util from "util";
import Jwt from "jsonwebtoken";
import process from "process";
const jwtVerifyAsync = util.promisify(Jwt.verify);

const authenticate = async (req, res, next) => {
  const { authorization: accessToken } = req.headers;
  const { refreshToken } = req.cookies;

  if (accessToken !== "null" && accessToken !== undefined && refreshToken) {
    try {
      await jwtVerifyAsync(accessToken, process.env.JWT_SECRET_KEY);
      next();
    } catch (error) {
      console.log(error);
      res.code(401).send(new Error("Invalid Token"));
    }
  } else {
    res.code(401).send(new Error("Token Missing"));
  }
};

export default authenticate;
