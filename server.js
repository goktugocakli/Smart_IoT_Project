require('dotenv').config
const mqttClient = require('./config/mqtt');
const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const ejs = require('ejs')
app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use('/user', require('./routes/userRoutes'))
app.use('/device', require('./routes/deviceRoutes'))
app.use('/message', require('./routes/messageRoutes'))
app.use('/', require('./routes/appRoutes'))

app.use((err, req, res, next ) => {
    console.log(err.stack)
    console.log(err.name)
    console.log(err.code)

    res.status(500).json({
        message: "Something went rely wrong"
    })
})

io.on('connection', (socket) => {
    console.log('Socket client bağlandı Id: ' + socket.id);

    socket.on('disconnect', function () {
        console.log(`A user disconnected Id: ${socket.id}`);
    });

    socket.on('message', (data) => {
        console.log(data);
        mqttClient.publish(data.topic, data.message);
    });

    socket.on('led-control', (data) => {
        console.log(data)
        mqttClient.publish(data.topic, data.message);
    })
});


mqttClient.on('message', (topic, payload, packet) => {
    const messageData = {
        message: payload.toString(),
        topic: topic,
        QOS: "QOS " + packet.qos.toString()
    };
    io.emit(topic, messageData);
});


const PORT = process.env.PORT || 3000;
http.listen(PORT, function () {
    console.log(`listenin port ${PORT}`)
})
