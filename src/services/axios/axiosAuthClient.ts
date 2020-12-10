import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import queryString from "query-string";
import { setMessage } from "../redux/slices/messageSlice";
import store from "../redux/store";

const axiosAuthClient = axios.create({
    baseURL: "https://dnstore.codes/api/",
    // baseURL: "http://192.168.30.132:8081/api/",
    paramsSerializer: (params) => queryString.stringify(params, { arrayFormat: "comma" }),
});

axiosAuthClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    const contentType = config.headers["Content-Type"];
    if (!contentType) {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

axiosAuthClient.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const token = await AsyncStorage.getItem("access_token");
        if (error.response.status === 401 && !originalRequest.retry) {
            // Token expired
            originalRequest.retry = true;
            const url = "/api/auth/token";
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "x-refresh-token": await AsyncStorage.getItem("refresh_token"),
                },
            };

            try {
                const response = await axios.post(url, null, config);
                const accessToken = response.headers["x-access-token"];
                const refreshToken = response.headers["x-refresh-token"];
                await AsyncStorage.setItem("access_token", accessToken);
                await AsyncStorage.setItem("refresh_token", refreshToken);
                return axiosAuthClient(originalRequest);
            } catch (err) {
                throw err;
            }
        } else {
            // Forbidden request
            store.dispatch(setMessage(error.response.data));
            throw error;
        }
    }
);

export default axiosAuthClient;