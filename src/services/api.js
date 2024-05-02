import axios from "axios";
import { TOKEN_PUBLIC_API, URL_API_CONTEX, URL_API_PROD } from "../constants";

const baseURL = URL_API_CONTEX;

const axiosC = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": 'multipart/form-data',
    },
})

const loadData = async ({ url = '', method = '', data = {}, useToken = true, usePublicToken = false }) => {
    try {
        const headers = {};

        if (useToken) headers['Authorization'] = localStorage.getItem('token');
        if (usePublicToken) headers['token'] = TOKEN_PUBLIC_API;

        return await axiosC({
            method,
            url,
            data,
            headers
        });
    } catch (error) {
        // console.log(error);
    }
}

export default loadData;