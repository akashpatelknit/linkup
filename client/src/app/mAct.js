import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;

const url = import.meta.env.VITE_BASE_URL;

export const getM = createAsyncThunk(
	'getM',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${url}/message/${data}`);

			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const sendM = createAsyncThunk(
	'sendM',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${url}/message`, data);

			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const createComment = createAsyncThunk(
	'createComment',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${url}/comment`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getComment = createAsyncThunk(
	'getComment',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${url}/comment`, {
				params: data,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
