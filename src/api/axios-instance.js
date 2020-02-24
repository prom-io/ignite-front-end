import axios from "axios";

const _axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

_axiosInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export const axiosInstance = _axiosInstance;
