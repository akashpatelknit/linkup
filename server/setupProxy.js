// src/setupProxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
	app.use(
		'/api/v1', // Update this to match your API route
		createProxyMiddleware({
			target: 'http://localhost:3000', // Update this to match your server's address
			changeOrigin: true,
		})
	);
};
