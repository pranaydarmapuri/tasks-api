const jwt = require('jsonwebtoken')
const constants = require('./../utils/constants')
const { 
  getParsedCookies,
  setAccessTokenInCookie,
  generateAccessToken,
  isAccessTokenValid,
  isRefreshTokenValid
} = require('../utils')

module.exports = async (req, res, next) => {
  
  try {

    const cookies = getParsedCookies(req.headers.cookie) 
    const [accessToken, refreshToken] = [cookies[constants.ACCESS_TOKEN], cookies[constants.REFRESH_TOKEN]]

    if(!accessToken && !refreshToken)
      return res.status(403).send()
    
    if(!! accessToken && (await isAccessTokenValid(accessToken)))
      return next()

    if(!!refreshToken && (await isRefreshTokenValid(refreshToken))) {

      res = setAccessTokenInCookie({
        token: generateAccessToken({
          user: jwt.decode(refreshToken).user
        }),
        res
      })

      return next()
    }

    return res.status(403).send('p')

  } catch (error) { return res.status(500).json({ message: 'Something went wrong.', error }) }
}