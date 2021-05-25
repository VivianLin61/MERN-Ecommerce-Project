const { check } = require('express-validator')
const { validationResult } = require('express-validator')

exports.validateSignupRequest = [
  check('firstName').notEmpty().withMessage('firstName is required'),
  check('lastName').notEmpty().withMessage('lastName is required'),
  check('email').notEmpty().withMessage('Email is required'),
  check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('password must greater than 6 in length'),
]

exports.validateSigninRequest = [
  check('email').notEmpty().withMessage('Email is required'),
  check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('password must greater than 6 in length'),
]

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.array().length > 0) {
    return res.status(400).json({
      error: errors.array(),
    })
  }
  next()
}
