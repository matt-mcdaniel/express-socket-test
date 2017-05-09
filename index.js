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

io.use(
    sharedsession(session, {
        autoSave: true
    })
);

//Debugging express
app.use('*', function(req, res, next) {
    next();
});

// Debugging io
io.use(function(socket, next) {
    next();
});

app.use('/route', (req, res, next) => {
    req.session.data ? req.session.data.push('route') : (req.session.data = ['route']);
    console.log(req.session);
    next();
});

app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', socket => {
    if (socket.handshake.session.data) {
        socket.handshake.session.data.push('connection');
    } else {
        socket.handshake.session.data = ['connection'];
    }
    console.log(socket.handshake.session);

    socket.on('login', data => {
        socket.handshake.session.data.push('login');
        console.log(socket.handshake.session);
    });
});

server.listen(3000);
