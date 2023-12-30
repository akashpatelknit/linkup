import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;

const url = import.meta.env.VITE_BASE_URL;

export const getAllUsers = createAsyncThunk(
	'getAllUsers',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${url}/alluser`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
