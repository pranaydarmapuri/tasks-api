const express = require('express')
const mongoose = require("mongoose") 
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const env = require('./utils/env')

// mongoose connection
mongoose.Promise = global.Promise
mongoose.connect(env.DB_CONNECTION_STRING, {
  useNewUrlParser: true
}).then(
  () => {
    console.log('Database connected!, successfully.')
  },
  error => {
    console.log('Could not connect to database : ')
  }
)

// init express
const app = express()
// init body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
// init cookie parse
app.use(cookieParser())
// init cors
app.use(cors())

//routes
app.use('/todos', require('./middlewares/is-authenticated'), require('./routes/todo.routes'))
app.use('/auth', require('./routes/auth.routes'))

//PORT
const port = env.PORT
const server = app.listen(port, () => console.log('Connected to port', port))

// 404 ERROR
app.use((req, res, next) => {
  next(res.status(400).json({ message: "Page Not Found", code: 404 }));
})

app.use((err, req, res, nxt) => {
  if (!err.statusCode)
    err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})