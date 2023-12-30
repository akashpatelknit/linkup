import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
const ChatContext = createContext();
import axios from 'axios';
import { loadUser } from '../app/userAction';
import { getRequest } from '../utils/service';
const url = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const ChatProvider = ({ children, user }) => {
	const [userChats, setUserChats] = useState(null);
	const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
	const [isUserChatsError, setIsUserChatsError] = useState(null);

	const [selectedChat, setSelectedChat] = useState();
	const [notification, setNotification] = useState([]);
	const [chats, setChats] = useState();
	const [sockte, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [message, setMessage] = useState([]);
	const [lastsendedMessage, setLastSendedMessage] = useState('');
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(loadUser());
	// }, []);
	// const user = useSelector((state) => state.user?.userInfo) || [];
	// console.log('user from chat provider0', user);
	// socket things
	// useEffect(() => {
	// 	const newSocket = io('http://localhost:3000');
	// 	setSocket(newSocket);
	// 	// return () => newSocket.disconnect();
	// }, [user]);

	// // add user to socket
	// useEffect(() => {
	// 	if (sockte === null) return;
	// 	sockte.emit('addNewUser', user?._id);

	// 	sockte.on('getOnlineUsers', (res) => {
	// 		setOnlineUsers(res);
	// 	});

	// 	return () => {
	// 		sockte.off('getOnlineUsers');
	// 	};
	// }, [sockte, user]);

	// // send message
	// useEffect(() => {
	// 	if (sockte === null) return;
	// 	const receiverId = selectedChat?.users?.find(
	// 		(u) => u._id !== user?._id
	// 	);
	// 	sockte.emit('sendMessage', {
	// 		...lastsendedMessage,
	// 		receiverId: receiverId?._id,
	// 	});

	// 	sockte.on('messageSendedFromSocket', (res) => {
	// 		if (res.chatId === selectedChat?._id) return;
	// 		console.log('received message', res);
	// 		setMessage((prev) => [...prev, res]);
	// 		console.log('message', message);
	// 	});
	// }, [lastsendedMessage]);

	// receive message
	// useEffect(() => {
	// 	if (sockte === null) return;
	// 	sockte.on('messageSendedFromSocket', (res) => {
	// 		// if (res.chatId === selectedChat?._id) return;
	// 		console.log('received message', res);
	// 		// setMessage((prev) => [...prev, res]);
	// 	});

	// 	return () => {
	// 		sockte.off('messageSendedFromSocket');
	// 	};
	// }, [sockte, lastsendedMessage]);

	// // load selected chat messages
	// useEffect(() => {
	// 	const loadChat = async () => {
	// 		try {
	// 			const res = await axios.get(
	// 				`${url}/message/${selectedChat?._id}`
	// 			);
	// 			setMessage(res.data);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	loadChat();
	// }, [selectedChat]);

	// // send message to db
	// useEffect(() => {
	// 	const sendMessage = async () => {
	// 		try {
	// 			const res = await axios.post(`${url}/message`, {
	// 				chatId: selectedChat?._id,
	// 				content: newMessage,
	// 			});
	// 			setMessage((prev) => [...prev, res.data]);
	// 			setLastSendedMessage(res.data);
	// 			setNewMessage('');
	// 		} catch (error) {
	// 			console.log(error);
	// 			setNewMessage('');
	// 		}
	// 	};
	// 	sendMessage();
	// }, [newMessage]);

	// load user chats
	// useEffect(() => {
	// 	const getUserChates = async () => {
	// 		setIsUserChatsLoading(true);
	// 		if (user?._id) {
	// 			setIsUserChatsError(null);
	// 			const response = await getRequest(`${url}/chat`);
	// 			if (response.error) {
	// 				return setIsUserChatsError(response.error);
	// 			}
	// 			setUserChats(response);
	// 		}
	// 	};
	// 	getUserChates();
	// }, [user]);
	return (
		<ChatContext.Provider
			value={{
				userChats,
				isUserChatsLoading,
				isUserChatsError,
				user,
				selectedChat,
				setSelectedChat,
				notification,
				setNotification,
				chats,
				setChats,
				sockte,
				onlineUsers,
				setNewMessage,
				message,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
