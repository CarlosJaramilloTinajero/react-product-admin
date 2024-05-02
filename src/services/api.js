import axios from "axios";
import { URL_API_CONTEX, URL_API_PROD } from "../constants";

const baseURL = URL_API_CONTEX;

const axiosC = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": 'multipart/form-data',
    },
})

const loadData = async ({ url = '', method = '', data = {}, useToken = true }) => {
    try {
        const headers = useToken ? {
            Authorization: localStorage.getItem('token')
        } : {};

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