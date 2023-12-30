export const baseUrl = import.meta.env.VITE_BASE_URL;

export const postRequest = async (url, data) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	const responsedata = await response.json();

	if (!response.ok) {
		let message;

		if (responsedata.message) {
			message = responsedata.message;
		} else {
			message = data;
		}
		return { error: true, message };
	}
	return responsedata;
};

export const getRequest = async (url) => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();

	if (!response.ok) {
		let message = 'error in getRequest';

		if (data.message) {
			message = data.message;
		} else {
			message = data;
		}
		return { error: true, message };
	}
	return data;
};
