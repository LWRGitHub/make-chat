// App.js
const express = require('express');
const app = express();
// Socket.io has to use the http server
const server = require('http').Server(app);

//Socket.io
const io = require('socket.io')(server);
let onlineUsers = {};
let chatRooms = {};
//Save the channels in this object.
let channels = {"General" : []};

io.on("connection", (socket) => {
  // Make sure to send the channels to our chat file
  require('./sockets/chat.js')(io, socket, onlineUsers,chatRooms, channels);
});

// Express View Engine for Handlebars
const exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs());
app.engine('handlebars', exphbs({defaultLayout: 'index', extname: '.handlebars', layoutsDir: __dirname + '/views'}));
app.set('view engin', 'handlebars');
//Establish public folder
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('index.handlebars');
})

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})