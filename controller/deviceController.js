const { PrismaClient } = require("@prisma/client");
const { name } = require("ejs");
const prisma = new PrismaClient({ log: ['query'] })

exports.getAllDevices = async (req, res, next) => {
    try {
        const devices = await prisma.device.findMany({
            select: {
                id: true,
                name: true,
                type: true,
                users: {
                    select: {
                        id: true
                    }
                }
            }
        });
        res.status(200).json(devices)
    } catch (error) {
        console.log(error)
        next(error)
    }

}

exports.createNewDevice = async (req, res, next) => {
    try {
        let { name, topic } = req.body
        const device = await prisma.device.create({
            data: {
                name: name,
                broker_topic: topic
            }
        })
        console.log(device)
        res.status(201).json({ message: 'Post created' })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.getDeviceById = async (req, res, next) => {
    try {
        let deviceId = parseInt(req.params.id)
        const device = await prisma.device.findFirst({
            where: {
                id: deviceId
            },
            select: {
                id: true,
                name: true,
                type: true,
                broker_topic:true,
                users: {
                    select: {
                        id: true
                    }
                }
            }
        })
        res.status(200).json({ message: device })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.deleteDeviceById = async (req, res, next) => {
    try {
        let deviceId = parseInt(req.params.id)
        const deleteDevice = await prisma.device.delete({
            where:{
                id: deviceId
            }
        })
        res.status(200).json({message:"Cihaz başarıyla silindi"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.getAllBrokerTopic = async function getAllBrokerTopic() {
    try {
        const brokerTopics = await prisma.device.findMany({
            select:{
                broker_topic:true
            }
        })
        return brokerTopics
    } catch (error) {
        console.log(error)
        next(error)
    }
}