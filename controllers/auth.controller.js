const User = require('../models/user.schema')
const {
  generateHashPassword,
  isValidPassword,
  generateAccessToken,
  generateRefreshToken,
  setAccessTokenInCookie,
  setRefreshTokenInCookie
} = require('../utils')

module.exports = {
  // signup controller
  signup: async (req, res, next) => {

    try {

      const { name, username, password, email } = req.body

      if(!name || !username || !password || !email)
        return res.status(400).json({ message: 'Required all fields.' })
  
      // hashing password
      const hashPassword = await generateHashPassword(password)
  
      if(hashPassword == null)
        return res.status(500).json({ message: 'Something went wrong.' })
      
      User
        .create({
          name,
          username,
          email,
          password: hashPassword
        })
        .then(() =>  {
          res.locals.loginAfterSignup = true
          next()
        })
        .catch(err => res.status(500).json(err))

    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong'})
    }
  },

  // login controller
  login: async (req, res) => {

    try {

      const { username, password } = req.body

      const user = await User.findOne({ username })
      
      if(res.locals.loginAfterSignup);
      else if (!user && !(await isValidPassword(password, user.password))) {
        res.status(400).json({ message: 'Invalid Credentials' })
      }

      const payload = { user: user._id }
      const refreshToken = generateRefreshToken(payload)
      const accessToken = generateAccessToken(payload)

      User
        .findByIdAndUpdate(user._id, { $push: { refreshTokens: refreshToken } })
        .then(() => {
          res = setAccessTokenInCookie({ token: accessToken, res })
          res = setRefreshTokenInCookie({ token: refreshToken, res })
          res.json({ 
            username: user.username, 
            email: user.email, 
            name: user.name, 
            isAuthorized: true 
          })
        })
        .catch(res.status(500).json)

    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
}