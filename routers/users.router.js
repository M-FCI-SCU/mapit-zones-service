
const express = require('express')
const router = express.Router();
const {usersController} = require('../controllers')


router.post('/create_user', usersController.createUser  )

module.exports = router
