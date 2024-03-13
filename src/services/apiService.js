import { fetchData } from './auxiliar';

export const getDepartamentsAPI = () => fetchData({ url: '/departaments', method: 'get' }).then(res => res ? res.data : []);

export const getCategoriesAPI = () => fetchData({ url: '/categories', method: 'get' }).then(res => res ? res.data : []);

export const getSubcategoriesAPI = () => fetchData({ url: '/subcategories', method: 'get' }).then(res => res ? res.data : []);

export const getBrandsAPI = () => fetchData({ url: '/brands', method: 'get' }).then(res => res ? res.data : []);