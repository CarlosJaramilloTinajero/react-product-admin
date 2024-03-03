import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosC = axios.create({
    baseURL: baseURL,
    headers: {
        token: '$2y$10$qxrB6JHv6MWnI.Z3pDWD8OpI1dwxyAVpEXwilqSsPrACCkcSNVZLS',
        "Content-Type": 'multipart/form-data'
    },
})

const loadData = async ({ url = '', method = '', data = {} }) => {
    try {
        return await axiosC({
            method: method,
            url: url,
            data: data
        });
    } catch (error) {
        console.log(error);
    }
}

export default loadData;