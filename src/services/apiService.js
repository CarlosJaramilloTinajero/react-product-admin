import { fetchData } from './Auxiliar';

export const getCategoriesAPI = () => fetchData({ url: '/categories', method: 'get' }).then(res => res ? res.data : null);

export const getSubcategoriesAPI = () => fetchData({ url: '/subcategories', method: 'get' }).then(res => res ? res.data : null);

export const getBrandsAPI = () => fetchData({ url: '/brands', method: 'get' }).then(res => res ? res.data : null);