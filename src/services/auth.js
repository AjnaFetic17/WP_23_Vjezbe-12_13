const User = require("../models/user")
const { expressjwt: jwt } = require('express-jwt')
const jwttoken = require('jsonwebtoken')

exports.login = (req, res) => {
  const { username, password } = req.body
  User.findOne({ username }).exec().then((user) => {
    if (!user) {
      return res.status(400).json({
        error: 'User with that username does not exist. Sign up!'
      })
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Invalid credentials'
      })
    }
    const token = jwttoken.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    const { _id, username, role } = user
    return res.json({
      token, user: { _id, username, role }
    })
  }).catch((err) => {
    if (err) {
      return res.status(400).json({
        error: 'User with that username does not exist. Sign up!'
      })
    }
  })
}

exports.register = (req, res) => {
  const { username, password } = req.body
  console.log(username, password);
  let newUser = new User({ username, password })

  newUser.save().then((success) => {
    return success && res.json({ message: 'Sign up successful' })
  }).catch((err) => res.status(400).json({ error: err }))
}

exports.requireLogin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
})

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.auth._id
  User.findOne({ _id: adminUserId }).exec().then((user) => {
    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      })
    }

    if (user.role !== 1) {
      return res.status(400).json({
        error: 'Insufficient role - Access denied'
      })
    }
    req.profile = user
    next()
  }).catch((err) => {
    if (err) {
      return res.status(400).json({
        error: 'User not found'
      })
    }
  })
}