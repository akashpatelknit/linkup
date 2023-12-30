import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Layout from './components/layout/Layout.jsx';
import Register from './pages/register/Register.jsx';
import Login from './pages/login/Login.jsx';
import Home from './pages/home/Home.jsx';
import Gallary from './components/gallary/Gallary.jsx';
import { useEffect, useState, useMemo } from 'react';
import Cookies from 'js-cookie';
import AlreadyLoggedIn from './pages/login/AlreadyLoggedIn.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './app/userAction.js';
import { getAllUsers } from './app/allUsersAction.js';
import Friends from './components/friends/Friends.jsx';
import Profile from './pages/profile/Profile.jsx';
import Chat from './pages/chat/Chat.jsx';
import ChatProvider from './context/ChatProvider.jsx';
// import ChatLayout from './pages/chat/ChatLayout';

const App = () => {
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.user);
	const user = useSelector((state) => state.user?.userInfo);
	useEffect(() => {
		dispatch(loadUser());
		dispatch(getAllUsers());
	}, []);

	if (!isAuthenticated) {
		return (
			<Router>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/*" element={<Login />} />
				</Routes>
			</Router>
		);
	}
	return (
		<Router>
			{/* {isAuthenticated && <Navbar />} */}
			<ChatProvider user={user}>
				<Routes>
					<Route
						path="/"
						element={
							isAuthenticated && (
								<Layout>
									<Home />
								</Layout>
							)
						}
					/>
					<Route
						path="/gallary"
						element={
							isAuthenticated && (
								<Layout>
									<Gallary />
								</Layout>
							)
						}
					/>
					<Route
						path="/friends"
						element={
							isAuthenticated && (
								<Layout>
									<Friends />
								</Layout>
							)
						}
					/>
					<Route
						path="/profile/:userId"
						element={
							isAuthenticated && (
								<Layout>
									<Profile />
								</Layout>
							)
						}
					/>
					<Route
						path="/chat"
						element={
							isAuthenticated && (
								// <ChatLayout>
								<Chat />
								// </ChatLayout>
							)
						}
					/>
					<Route
						path="/register"
						element={
							isAuthenticated ? <AlreadyLoggedIn /> : <Register />
						}
					/>
					<Route path="/login" element={<Login />} />
				</Routes>
			</ChatProvider>
		</Router>
	);
};

export default App;
