const express = require('express');
const sockets = require('socket.io');
const app = express();
const cors = require('cors');

const server = app.listen(8001);

const io = sockets(server);

require('./server/config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./server/routes/vrat.routes')(app);

let connectedClients = 0;

io.on('connect', socket => {
    connectedClients ++;
    console.log('Somone has joined', `We have ${connectedClients} online`)

    socket.on('disconnect', () =>{
        connectedClients --;
        console.log('Someone has logged off.', `We have now have ${connectedClients} online`)
    })
})