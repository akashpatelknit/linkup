import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;

const url = import.meta.env.VITE_BASE_URL;

export const createPost = createAsyncThunk(
	'createPost',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${url}/post/createPost`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getAllPost = createAsyncThunk(
	'getAllPost',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${url}/post/allPosts/${data.userId}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getOverAllPost = createAsyncThunk(
	'getOverAllPost',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${url}/post/overallPosts`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const likeAndUnlikePost = createAsyncThunk(
	'likeAndUnlikePost',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${url}/post/likeAndUnlike`,
				data
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
