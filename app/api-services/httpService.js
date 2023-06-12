/** @format */

import axios from 'axios';

// axios.interceptors.response.use(null, (error) => {
// 	const ExpectedError =
// 		error.response &&
// 		error.response.status >= 400 &&
// 		error.response.status <= 500;
// 	if (!ExpectedError) {
// 		console.log('Unexpected Error', error);
// 	}

// 	return Promise.reject(error); //pass control to catch
// });

function setJwt(jwt) {
	axios.defaults.headers.common['x-auth-token'] = jwt;
}
export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt,
};
