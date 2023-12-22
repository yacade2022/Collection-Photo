import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const authenticationUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }

  const verificationToken = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const { userId, name } = verificationToken;
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};
