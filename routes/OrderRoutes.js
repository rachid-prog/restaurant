const express = require('express')
const router = express.Router()
const chechUser = require('../auth/chechUser')

router.post('', chechUser,  require('../controllers/ordeerController/createOrder'))

module.exports = router

