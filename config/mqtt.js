require('dotenv').config()
const mqtt = require('mqtt')
const io = require('../server.js')
const {getAllBrokerTopic} = require('../controller/deviceController')

const mqttClient = mqtt.connect({
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: process.env.MQTT_PROTOCOL,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: process.env.MQTT_CLIENTID,
    clean: process.env.MQTT_CLEAN,
    //clean persistent session
})


mqttClient.on('connect', () => {
    console.log('mqttClient bağlandı')
    getAllBrokerTopic().then((result) => {
        result.forEach(element => {
            mqttClient.subscribe(element.broker_topic)
            console.log(`subscribe: ${element.broker_topic}`)
        });
    })
})


mqttClient.on('disconnect', () => {
    console.log('mqttClient bağlantısı kesildi')
})


mqttClient.on('close', () => {
    console.log('MQTT Client bağlantısı kapandı')
})


mqttClient.on('message', (topic, payload, packet) => {
    console.log('Received Message:', topic, payload.toString(), packet.qos)
    
    const messageData = {
        message: payload.toString(),
        topic: topic,
        QOS: "QOS " + packet.qos.toString()
    }


})
    

module.exports = mqttClient