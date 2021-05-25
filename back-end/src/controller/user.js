const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: 'User already registered',
      })

    const { firstName, lastName, email, password } = req.body
    const hash_password = await bcrypt.hash(password, 10)
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: Math.random().toString(),
    })

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: 'Something went wrong',
        })
      }
      if (data) {
        return res.status(201).json({
          message: 'User created',
        })
      }
    })
  })
}
