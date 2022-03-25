const router = require('express').Router()
const auth = require('../controllers/auth.controller')

router.post('/signup', auth.signup, auth.login)
router.post('/login', auth.login)

module.exports = router