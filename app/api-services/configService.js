/** @format */

import http from "./httpService";

// const apiEndpoint = process.env.apiEndpoint
const apiEndpoint = "http://196.189.126.129:8000/api/configurations";

export const getCredentials = () => {
	return http.get(apiEndpoint + "/...");
};

export const getCredential = async (id) => {
	return http.post(`${apiEndpoint}/${id}`);
};

export const saveCredential = (config) => {
	if (config.id) {
		let { id, ...newConfig } = config;
		return http.put(`${apiEndpoint}/../${id}`, newConfig);
	}
	return http.post(`${apiEndpoint}/...`, config);
};
