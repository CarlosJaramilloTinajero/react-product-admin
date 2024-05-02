import { fetchData } from './auxiliar';

export const getDepartamentsAPI = () => fetchData({ url: '/public/departaments', method: 'get', useToken: false, usePublicToken: true }).then(res => res ? res.data : []);

export const getCategoriesAPI = () => fetchData({ url: '/public/categories', method: 'get', useToken: false, usePublicToken: true }).then(res => res ? res.data : []);

export const getSubcategoriesAPI = () => fetchData({ url: '/public/subcategories', method: 'get', useToken: false, usePublicToken: true }).then(res => res ? res.data : []);

export const getBrandsAPI = () => fetchData({ url: '/public/brands', method: 'get', useToken: false, usePublicToken: true }).then(res => res ? res.data : []);

export const initAPP = () => fetchData({ url: '/send-mail', method: 'post', requestData: { msg: 'Entraron al proyecto administrador de Products Hub, ten un buen día :)' } });