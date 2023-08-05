var socket = io();

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
});

socket.on('message', (data) => {
    console.log('Received message from server:', data);
});


socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

socket.on('connect_timeout', (timeout) => {
    console.error('Connection timeout:', timeout);
});

socket.on('error', (error) => {
    console.error('Socket.IO error:', error);
});

const konu = document.getElementById('konu')
const switchInput = document.getElementById("led");
switchInput.addEventListener('change', async () => {
    if (switchInput.checked) {
        console.log('off')
        await socket.emit('led-control', { topic: konu.innerText, message: '1' });
    } else {
        console.log('on')
        await socket.emit('led-control', { topic: konu.innerText, message: '0' });
    }
})