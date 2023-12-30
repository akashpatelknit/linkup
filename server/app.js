import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.set('trust proxy', 1);
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
		credentials: true,
	})
);
app.use((req, res, next) => {
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requiest-With, Content-Type, Accept'
	);
	if (true) {
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
	}
	res.header(
		'Access-Control-Allow-Methods',
		'GET, PUT, POST, DELETE, HEAD, OPTIONS'
	);
	next();
});
app.set('trust proxy', 1);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// user routes
import userRoute from './routes/user.routes.js';
app.use('/api/v1/users', userRoute);

//post routes
import postRoute from './routes/post.routes.js';
app.use('/api/v1/post', postRoute);

// all user routes
import allUserRoute from './routes/allUser.routes.js';
app.use('/api/v1/alluser', allUserRoute);

// update routes
import updateRoute from './routes/update.routes.js';
app.use('/api/v1/update', updateRoute);

// chat routes
import chatRoute from './routes/chat.routes.js';
app.use('/api/v1/chat', chatRoute);

// message routes
import messageRoute from './routes/message.routes.js';
app.use('/api/v1/message', messageRoute);

// comment routes
import commentRoute from './routes/comment.routes.js';
app.use('/api/v1/comment', commentRoute);
export default app;
