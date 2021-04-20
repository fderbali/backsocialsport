const express = require('express');
const socket = require('socket.io');
const apiRouter = require('./routes');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use('/api', apiRouter);

let server = app.listen(process.env.PORT || '3000', () => {
	console.log(`Server is running on port : ${process.env.PORT || 3000}`);
});

let io = socket(server);
io.on('connection', (socket) => {
	console.log(`New connection ${socket.id}`);
	socket.on('chat', function (data) {
		io.socket.emit('chat', data);
	});
	socket.on('typing', function (data) {
		io.socket.emit('typing', data);
	});
})

