const { Server } = require('socket.io');

const io = new Server({ cors: { origin: 'http://localhost:5173' } });

let onlineUsers = [];
io.on('connection', (socket) => {
	console.log('a user connected', socket.id);

	// listen to a connection
	socket.on('addNewUser', (userId) => {
		if (userId === undefined || userId === null) return;
		!onlineUsers.some((user) => user.userId === userId) &&
			onlineUsers.push({ userId, socketId: socket.id });

		console.log('onlineUsers: ', onlineUsers);

		io.emit('getOnlineUsers', onlineUsers);
	});

	// add message to chat
	socket.on('sendMessage', (message) => {
		console.log('message: ', message);

		const user = onlineUsers.find(
			(user) => user.userId === message.receiverId
		);
		console.log('user: ', user);
		if (user) {
			socket.emit('messageSendedFromSocket', message);
		}
	});
	// listen to a disconnection
	socket.on('disconnect', () => {
		onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
		io.emit('getOnlineUsers', onlineUsers);
	});
});

io.listen(3000);
