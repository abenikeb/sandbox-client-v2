/** @format */

import http from "./httpService";

// const apiEndpoint = process.env.apiEndpoint
const urlEndpoints = process.env.apiEndpoint
const apiEndpoint = `${urlEndpoints}/api`

// const apiEndpoint = "http://196.189.126.129:8000/moke-api/applyFabricToken";

export const getCredentials = () => {
	return http.get(apiEndpoint + "/...");
};

export const getCredential = async (id) => {
	return http.post(`${apiEndpoint}/${id}`);
};

export const saveCode = (codeSnippt) => {
	return http.post(`${apiEndpoint}`, codeSnippt);
};

export const saveCredential = (config) => {
	if (config.id) {
		let { id, ...newConfig } = config;
		return http.put(`${apiEndpoint}/../${id}`, newConfig);
	}

	return http.post(`${apiEndpoint}/...`, config);
};
