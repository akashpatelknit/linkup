import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
const ChatContext = createContext();
import axios from 'axios';
import { loadUser } from '../app/userAction';
import { getRequest } from '../utils/service';
const url = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const ChatProvider = ({ children }) => {
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
	useEffect(() => {
		dispatch(loadUser());
	}, []);
	const user = useSelector((state) => state.user?.userInfo) || [];

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
