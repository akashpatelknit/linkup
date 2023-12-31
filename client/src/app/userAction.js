import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;

const url = import.meta.env.VITE_BASE_URL;

export const registerUser = createAsyncThunk(
	'registerUser',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${url}/register`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const loginUser = createAsyncThunk(
	'loginUser',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${url}/users/login`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const logout = createAsyncThunk(
	'logout',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${url}/logout`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const loadUser = createAsyncThunk(
	'loadUser',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${url}/users`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const followUser = createAsyncThunk(
	'followUser',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${url}/users/follow`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const loadSpecificUSer = createAsyncThunk(
	'loadSpecificUSer',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${url}/users/${data.userId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getFriendsList = createAsyncThunk(
	'getFriendsList',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${url}/users/friends`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const updateAvatarImage = createAsyncThunk(
	'updateAvatarImage',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${url}/update/updateProfile`,
				data
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
