import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());

app.use((req, res, next) => {
	// Set headers to allow any origin
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Methods',
		'GET, PUT, POST, DELETE, HEAD, OPTIONS'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.header('Access-Control-Allow-Credentials', true);
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
