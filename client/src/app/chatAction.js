import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;

const url = import.meta.env.VITE_BASE_URL;

export const getSearchedUser = createAsyncThunk(
	'getSearchedUser',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${url}/users/search?search=${data}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchChat = createAsyncThunk(
	'fetchChat',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${url}/chat`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getChat = createAsyncThunk(
	'getChat',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${url}/chat`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const createGroup = createAsyncThunk(
	'createGroup',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${url}/chat/group`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const addMemberToGroup = createAsyncThunk(
	'addMemberToGroup',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.put(`${url}/chat/groupadd`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const removeMemberToGroup = createAsyncThunk(
	'removeMemberToGroup',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.put(`${url}/chat/groupremove`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const renameGroup = createAsyncThunk(
	'renameGroup',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.put(`${url}/chat/rename`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
