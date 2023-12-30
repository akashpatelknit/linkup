import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const directoryPath = path.join(__dirname, 'public', 'temp');
		cb(null, directoryPath);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

export const upload = multer({ storage: storage });
