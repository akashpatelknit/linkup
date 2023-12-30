import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		fullname: {
			type: String,
			required: true,
			trim: true,
			index: true,
		},
		avatar: {
			type: String,
			default:
				'http://res.cloudinary.com/dn7avilos/image/upload/v1703584517/smphzwalcy7z6eiiwl9z.jpg',
		},
		coverImage: {
			type: String,
			default:
				'http://res.cloudinary.com/dn7avilos/image/upload/v1703584517/smphzwalcy7z6eiiwl9z.jpg',
		},
		status: {
			type: String,
			enum: ['single', 'married', 'divorced', 'complicated', 'open'],
			default: 'single',
		},
		bio: {
			type: String,
			default: '',
		},

		website: {
			type: String,
			default: '',
		},
		socialLinks: [
			{
				plateform: {
					type: String,
					enum: [
						'facebook',
						'twitter',
						'instagram',
						'linkedin',
						'youtube',
						'github',
						'website',
					],
					default: 'website',
				},
				link: {
					type: String,
					default: '',
				},
			},
		],
		saved: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Post',
			},
		],

		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		refreshToken: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
			fullname: this.fullname,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
};

export const User = mongoose.model('User', userSchema);
