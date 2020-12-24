import axios from "axios";
import queryString from "query-string";
import { setMessage } from "../redux/slices/messageSlice";
import store from "../redux/store";
const axiosPublicClient = axios.create({
    baseURL: "https://dnstore.codes/api/",
    // baseURL: "http://192.168.30.132:8081/api/",
    paramsSerializer: (params) => queryString.stringify(params, { arrayFormat: "comma" }),
});

axiosPublicClient.interceptors.request.use(async (config) => {
    const contentType = config.headers["Content-Type"];
    if (!contentType) {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

axiosPublicClient.interceptors.response.use(
    async (response) => {
        return response;
    },
    (error) => {
        store.dispatch(setMessage(error.response.data));
        throw error;
    }
);

export default axiosPublicClient;
