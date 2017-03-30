const path = require('path');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const session = require('express-session')({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
});
var sharedsession = require('express-socket.io-session');

app.use(session);

io.use(sharedsession(session, {
    autoSave: true
}))

io.on('connection', (socket) => {

    socket.handshake.session.data = ['connection']
    console.log(socket.handshake.session);

    socket.on('login', data => {
        socket.handshake.session.data.push('login');
        console.log(socket.handshake.session);
    });
})

app.get('/route', (req, res, next) => {
    console.log(req.session.data);
})

app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

server.listen(3000);