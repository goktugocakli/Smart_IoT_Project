const express = require('express')
const appController = require('../controller/appController')
const userController = require('../controller/userController')
const router = express.Router()

router
    .route('/cihazlarim')
    .get(appController.cihazlarım)
router
    .route('/login')
    .get(appController.login)
router
    .route('/yeniCihaz')
    .get(appController.yeniCihaz)
router
    .route('/signUp')
    .get(appController.signUpPage)
    .post(userController.createNewUser)

router
    .route('/device/LED/:id')
    .get(appController.ledDetay)

router
    .route('/device/DHT11/:id')
    .get(appController.dht11Detay)
router
    .route('/')
    .get(appController.login)


module.exports = router