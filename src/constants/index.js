export const FORMDATAMODALPRODUCTCONST = {
    sku: '',
    name: '',
    price: 0,
    largo: 0,
    alto: 0,
    ancho: 0,
    peso: 0,
    img_path: '',
    img_data: '',
    category_id: null,
    subcategory_id: null,
    brand_id: null,
    type: 'update_modal'
};

export const FORMDATAMODALBRANDCONST = {
    name: '',
    type: 'update_modal'
};

export const FORMDATAMODALCATEGORYCONST = {
    name: '',
    departament_id: null,
    type: 'update_modal'
};

export const FORMDATAMODALDEPARTAMENTCONST = {
    name: '',
    type: 'update_modal'
};

export const FORMDATAMODALSUBCATEGORYCONST = {
    name: '',
    category_id: '',
    type: 'update_modal'
};

export const APP_DEBUG = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const baseURL = APP_DEBUG ? '/' : '/products-hub-admin/';

export const URLBase = APP_DEBUG ? '' : '/products-hub-admin';