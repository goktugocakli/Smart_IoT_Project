const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
router
    .route('/login')
    .post(userController.loginUser)
router
    .route('/:id')
    .get(userController.getUserById)
router
    .route('/add_device')
    .put(userController.addDeviceByBrokerTopic)

module.exports = router