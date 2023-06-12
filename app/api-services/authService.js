/** @format */

import http from "./httpService";
import jwtDecode from "jwt-decode";

// const urlEndpoints = config.apiEndpoint
// const apiEndpoint = `${urlEndpoints}/api`
const token = "token";

// console.log("apiEndpoints",apiEndpoints)

const apiEndpoint = "http://196.189.126.129:8000/api";

http.setJwt(getJwt());

export async function login(email, password) {
	console.log("apiEndpoint",apiEndpoint)
	try {
		const { data: access_token } = await http.post(
			`${apiEndpoint}/auth/login`,
			{ email, password }
		);
		localStorage.setItem(token, access_token.access_token);
		return {
			response:"OK"
		};
	} catch (error) {
		return error;
	}
}
export function loginWithJwt(jwt) {
	console.log("JWT", jwt)
	if (typeof window !== "undefined") {
		localStorage.setItem(token, jwt);
	}
}

export function logout() {
	localStorage.removeItem(token);
}

export function getJwt() {
	if (typeof window !== "undefined") {
		localStorage.getItem(token);
	}
}

export function getUserData() {
	try {
		return jwtDecode(localStorage.getItem(token));
	} catch (ex) {
		return null;
	}
}
export default {
	login,
	logout,
	getUserData,
	loginWithJwt,
	getJwt,
};
