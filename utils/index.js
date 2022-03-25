const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.schema')
const env = require('./env')
const constants = require('./constants')
require('dotenv').config()

module.exports = {
  // setting Access Token cookie
  setAccessTokenInCookie: ({token, res}) => res.cookie(
    constants.ACCESS_TOKEN, 
    token, 
    { httpOnly: true, maxAge: 1000 * 60 * 15, secure: env.NODE_ENV === 'production'}
  ),
  // generate Access Token
  generateAccessToken: ({ user }) => jwt.sign(
    { user }, 
    env.ACCESS_TOKEN_SECRET_KEY, 
    { algorithm: env.TOKEN_ALGORITHM, expiresIn: env.ACCESS_TOKEN_EXPIRY }
  ),
  // verifying Access Token
  isAccessTokenValid: async (token) => {
    try {
      const { user } = jwt.verify(token, env.ACCESS_TOKEN_SECRET_KEY)
      return !!user && (await User.countDocuments({ _id: user })) === 1
    } catch (error) {
      return false
    }
  },
  // setting refresh token in cookie
  setRefreshTokenInCookie: ({token, res}) => res.cookie(
    constants.REFRESH_TOKEN, 
    token, 
    { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365, secure: env.NODE_ENV === 'production'}
  ),
  // generate Refresh Token
  generateRefreshToken: ({ user }) => jwt.sign(
    { user }, 
    env.REFRESH_TOKEN_SECRET_KEY,
    { algorithm: env.TOKEN_ALGORITHM }
  ),
  // verifying Refresh Token
  isRefreshTokenValid: async (token) => {
    try {
      const { user } = jwt.verify(token, env.REFRESH_TOKEN_SECRET_KEY)
      return !!user && (await User.countDocuments({ refreshTokens: token, _id: user })) === 1
    } catch (error) {
      return false
    }
  },
  // generating hash password
  generateHashPassword: async (password) => await (
    bcrypt
      .hash(password, env.SALT_ROUNDS)
      .then(hashPassword => hashPassword)
      .catch(() => null)
  ), 
  // verifying password
  isValidPassword: async (password, hashPassword) => (
    await bcrypt.compare(password, hashPassword)
  ),
  // get Cookies in header
  getParsedCookies: (cookies) => {

    if(!cookies) return {}
  
    const [rawCookies, parsedCookies] = [cookies.split('; '), {}]

    rawCookies.forEach(cookie => {
      const [key, value] = cookie.split('=')
      parsedCookies[key] = value
    })
    
    return parsedCookies
  }
}