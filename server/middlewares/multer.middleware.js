// For CommonJS environment (Node.js):
const multer = require('multer');
const path = require('path');

// For ES modules (if using):
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// Use fileURLToPath for ES modules or __dirname for CommonJS:
		const basePath =
			typeof __dirname !== 'undefined'
				? __dirname
				: path.dirname(new URL(import.meta.url).pathname);
		const uploadPath = path.join(basePath, 'public/temp');
		cb(null, uploadPath);
		console.log('file', file);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

export const upload = multer({ storage: storage });
