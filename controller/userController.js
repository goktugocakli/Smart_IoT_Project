/*
const User = require('../models/user.js')

exports.getAllUsers = async (req, res, next) => {
    try {
        let [users, _ ] = await User.findAll();
        res.status(200).render('deneme.ejs' , {users:users})
    } catch (error) {
        console.log(error)
        next(error)
    }

}

exports.createNewUser = async (req, res, next) => {
    try {
        let { mail, password } = req.body
        let user = new User(mail, password)
        user = await user.save()
        console.log(user)
        res.status(201).json({ message: 'Post created' })
    } catch (error) {
        console.log(error)
        next(error)
    }

}

exports.getUserById = async (req, res, next) => {
    try {
        let userId = req.params.id
        let [user, _] = await User.findById(userId)

        res.status(200).json({ message: user })

    } catch (error) {
        console.log(error)
        next(error)
    }
}
*/

const { PrismaClient } = require("@prisma/client")
const { empty } = require("@prisma/client/runtime/library")
const prisma = new PrismaClient({ log: ['query'] })
const mqttClient = require('../config/mqtt')

exports.getAllUsers = async (req, res, next) => {
    /*
    const allUsers = await prisma.$queryRaw`SELECT ud.userId, u.mail, u.password, ud.deviceId, d.name
                                            FROM user u 
                                            INNER JOIN user_device ud  on u.id = ud.userId
                                            INNER JOIN device d on ud.deviceId = d.id`
    */
    const allUsers = await prisma.user.findMany({
        include: {
            devices: true
        }
    })
    res.json(allUsers)
}

exports.createNewUser = async (req, res, next) => {
    console.log(req.body)
    
    const newUser = await prisma.user.create({
        data: req.body
    })
    
    res.status(200).json("kullanıcı başarılı bir şekilde kaydedildi.")
}

exports.getUserById = async (req, res, next) => {
    const user = await prisma.$queryRaw`SELECT * FROM user WHERE id = ${req.params.id}`
    res.json(user)
}

exports.deleteUserById = async (req, res, next) => {
    const deletedUser = prisma.user.delete({
        where: { id: parseInt(req.params.id) }
    })
    res.json(deletedUser)
}

exports.loginUser = async (req, res, next) => {
    let { mail, password } = req.body
    try {
        //const user = await prisma.$queryRaw`SELECT * FROM user WHERE mail = ${mail} AND password = ${password}`
        const user = await prisma.user.findFirst({
            where:{
                mail:mail,
                password:password
            },
            select:{
                id:true,
                mail:true,
                name:true,
                surname:true,
                devices:true
            }
        })
        console.log(user)
        console.log(Object.keys(user).length)
        if ( Object.keys(user).length != 0 ){
            
            res.status(200).json({status: "success", data: user })
            //res.status(200).render('/cihazlarım', devices: device)
        }
        else{
            res.status(401).json({status: "failed", data: "Kullanıcı mail veya şifresi hatalı."})
        }
        
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }

}

/* 
* Kullanıcı request body'e userId, deviceName ve brokerTopic bilgilerini verir. 
*
* örnek
* {
*    "userId":2,
*    "deviceName":"Ofis Led",
*    "brokerTopic": "/device/led5"
* }
*
*/
exports.addDeviceByBrokerTopic = async (req, res, next) => {
    try {
        let { userId, deviceName, brokerTopic, type } = req.body

        //Kullanıcının takip ettiği cihaz konularını döndürür.
        let { devices } = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                devices: {
                    select: {
                        broker_topic: true
                    }
                }
            }
        })

        //Cihazın paylaşım yaptığı konuyu user takip ediyorsa true, etmiyorsa false döner.
        let isFollowedTopic = devices.map(device => device.broker_topic)
            .includes(brokerTopic)

        //Eğer kullanıcı cihazın yayın yaptığı konuyu takip etmiyorsa cihazı veritabanına ekler ve kullanıcıyle eşleştirir.
        if (!isFollowedTopic) {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    devices: {
                        create: [
                            { name: deviceName, broker_topic: brokerTopic, type: type }
                        ],
                    }
                },
                include: {
                    devices: true
                }
            })
            mqttClient.subscribe(brokerTopic)
            res.json({'status':'success', 'data':user})
        }
        else {
            res.json({'status':'failed', 'data':'kullanıcı bu cihazı takip ediyor'})
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}