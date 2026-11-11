import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const authenticationUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }

  // Verify inside the try so an expired or tampered token returns 401
  // (and the client redirects to login) instead of a 500.
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
  const { userId, name } = payload;
  req.user = { userId, name };
  next();
};
