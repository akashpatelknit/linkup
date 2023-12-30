import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import ChatProvider from './context/ChatProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <ChatProvider > */}
				<ChakraProvider>
					<App />
				</ChakraProvider>
			{/* </ChatProvider> */}
		</Provider>
	</React.StrictMode>
);
