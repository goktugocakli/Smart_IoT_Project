const express = require('express')
const deviceController = require('../controller/deviceController')
const router = express.Router()

router
    .route('/')
    .get(deviceController.getAllDevices)
    .post(deviceController.createNewDevice)
router
    .route('/:id')
    .get(deviceController.getDeviceById)
    .delete(deviceController.deleteDeviceById)
module.exports = router