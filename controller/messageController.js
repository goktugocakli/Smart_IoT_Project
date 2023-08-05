const { PrismaClient } = require("@prisma/client");
const { name } = require("ejs");
const prisma = new PrismaClient({ log: ['query'] })

exports.getMessagesByDeviceId = async (req, res, next) => {
    try {
        const messages = await prisma.device_log.findMany({
            where:{
                device_id: parseInt(req.params.id)
            }
        })
        res.status(200).json(messages)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}
/*
exports.createNewMessage = async (topic, payload, packet) => {
    try {
        const device = await prisma.device.find
        const device_log = await prisma.device_log.create({
            data:{
                device_id: device_id,
                message: message
            }
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}*/