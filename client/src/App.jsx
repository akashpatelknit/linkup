import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useMemo, lazy, Suspense } from 'react';

const Layout = lazy(() => import('./components/layout/Layout.jsx'));
const Register = lazy(() => import('./pages/register/Register.jsx'));
const Login = lazy(() => import('./pages/login/Login.jsx'));
const Home = lazy(() => import('./pages/home/Home.jsx'));
const Friends = lazy(() => import('./components/friends/Friends.jsx'));
const Profile = lazy(() => import('./pages/profile/Profile.jsx'));
// const Chat = lazy(() => import('./pages/chat/chat'));
const ChatProvider = lazy(() => import('./context/ChatProvider.jsx'));

import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './app/userAction.js';
import { getAllUsers } from './app/allUsersAction.js';

const App = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, loading } = useSelector((state) => state.user);
	const user = useSelector((state) => state.user?.userInfo);
	useEffect(() => {
		dispatch(loadUser());
		dispatch(getAllUsers());
	}, []);

	if (!isAuthenticated) {
		return (
			<Router>
				<Suspense >
					<Routes>
						<Route path="/register" element={<Register />} />
						<Route path="/*" element={<Login />} />
					</Routes>
				</Suspense>
			</Router>
		);
	}
	return (
		<Router>
			{/* {isAuthenticated && <Navbar />} */}
			<Suspense fallback={<div>Loading...</div>}>
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
						{/* <Route
						path="/gallary"
						element={
							isAuthenticated && (
								<Layout>
									<Gallary />
								</Layout>
							)
						}
					/> */}
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
						{/* <Route
							path="/chat"
							element={
								isAuthenticated && (
									// <ChatLayout>
									// <Chat />
									// </ChatLayout>
								)
							}
						/> */}
						{/* <Route
						path="/register"
						element={
							isAuthenticated ? <AlreadyLoggedIn /> : <Register />
						}
					/>
					<Route path="/login" element={<Login />} /> */}
					</Routes>
				</ChatProvider>
			</Suspense>
		</Router>
	);
};

export default App;
