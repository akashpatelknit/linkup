import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import app from './app.js';

dotenv.config({
	path: './.env',
});
connectDB()
	.then(() => {
		const server = app.listen(process.env.PORT, () => {
			console.log(
				`⚙️ ⚙️  Server is running at port : ${process.env.PORT}`
			);
		});
		
	})
	.catch((err) => {
		console.log('MONGO db connection failed !!! ', err);
	});

app.listen(8800, () => {
	console.log('Backend server is running!');
});
