import axios from "axios";

const production = true;
const baseURL = production ? 'https://api.carlosjaramillo.beauty/api/' : 'http://127.0.0.1:8000/api/';

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
        console.log(error);
    }
}

export default loadData;