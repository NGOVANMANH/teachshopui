import axios from "axios";

const API_INTERFACE = process.env.REACT_APP_API_INTERFACE;

let BASE_URL = process.env.REACT_APP_BASE_URL_PHP;

if (API_INTERFACE === "CS") {
    BASE_URL = process.env.REACT_APP_BASE_URL_CS;
}

const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;