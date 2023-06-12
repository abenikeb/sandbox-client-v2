/** @format */

import http from "./httpService";

const apiEndpoint = "http://196.189.126.129:8000/api";
// const urlEndpoints = process.env.apiEndpoint
// const apiEndpoint = `${urlEndpoints}/api`

const apiUrl = apiEndpoint + "/user/signup";

export function register(firstName, lastName, tel, email, password) {
	return http.post(apiUrl, {
		firstName,
		lastName,
		tel,
		email,
		password,
	});
}
