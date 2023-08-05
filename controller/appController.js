const { name } = require("ejs");


exports.cihazlarım = (req, res, next) => {
    res.status(200).render('cihazlarim.ejs')
}

exports.login = (req, res, next) => {
    res.status(200).render('loginPage.ejs')
}

exports.signUpPage = (req, res, next) => {
    res.status(200).render('signup.ejs')
}

exports.yeniCihaz = (req, res, next) => {
    res.status(200).render('new-device.ejs')
}

exports.ledDetay = (req, res, next) => {
    res.status(200).render('led-detay.ejs')
}

exports.dht11Detay = (req, res, next) => {
    res.status(200).render('dht11-detay.ejs')
}

