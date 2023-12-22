import { body, validationResult } from "express-validator";
import { BadRequest } from "../errors/customErrors.js";
import User from "../models/userModel.js";

const validationError = (validationValue) => {
  return [
    validationValue,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequest(errorMessages);
      }
      next();
    },
  ];
};

export const validationRegister = validationError([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequest("email already exist");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 12 })
    .withMessage("password must be between 6 and 12 characters long"),
]);

export const validationLogin = validationError([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 12 })
    .withMessage("password must be between 6 and 12 characters long"),
]);
