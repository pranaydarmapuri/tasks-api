require('dotenv').config()

module.exports = {
  PORT: parseInt(process.env.PORT),
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING, 
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  TOKEN_ALGORITHM: process.env.TOKEN_ALGORITHM,
  NODE_ENV: process.env.NODE_ENV
}

// generating secret
// require('crypto').randomBytes(126).toString('hex')