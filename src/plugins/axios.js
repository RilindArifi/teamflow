import axios from "axios";
import Cookies from "js-cookie";
import {useToast} from "vue-toastification";

const toast = useToast();

const axiosClient = axios.create({
    // baseURL: ''
    baseURL: "https://teamflow-back.test/api/", //local domain
});

axiosClient.interceptors.request.use(async (config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;

        if (status === 401) {
            toast.error(message || 'Unauthorized');
            window.location.href = '/auth/login';
        } else if (status === 403) {
            toast.error(message || 'Forbidden');
            window.location.href = '/unauthorized';
        } else if (status === 409) {
            toast.error(message);
            window.location.href = '/email-verify';
        } else {
            let msg = error.message;
            if (error.response?.data?.errors) {
                msg = error.response.data.message;
            } else if (error.response?.data?.error) {
                msg = error.response.data.error;
            } else if (error.response?.data?.message) {
                msg = error.response.data.message;
            }
            if (msg) toast.error(msg);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
