const express = require('express')
const messageController = require('../controller/messageController')
const router = express.Router()

router
    .route('/device/:id')
    .get(messageController.getMessagesByDeviceId)  

module.exports = router