const express = require('express')
const router = express.Router()

const ctrls = require('../controllers')

router.post('/signup', ctrls.users.signup)
router.post('/signin', ctrls.users.signin)
router.delete('/signout', ctrls.users.signout)

module.exports = router
