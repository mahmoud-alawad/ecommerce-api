import { body, check } from 'express-validator';

export const loginSchema = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isString().trim().notEmpty().withMessage('Please provide a password'),
  check('password').isLength({ min: 6 })
    .withMessage("Passowrd must be at least 6 chars long."),
]

export const signUpSchema = [
  ...loginSchema,
  body('name').isString().notEmpty(),
  body('phoneNumber').isString().notEmpty(),
  body('address').isString().trim().notEmpty().withMessage('Please provide a valid address'),
]
