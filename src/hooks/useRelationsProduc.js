import { useState, useEffect } from 'react';
import { getBrandsAPI, getCategoriesAPI, getDepartamentsAPI, getSubcategoriesAPI } from '../services/apiService';

// Customs hooks
export function useDepartaments() {
    const [departaments, setDepartaments] = useState([]);

    useEffect(() => {
        getDepartamentsAPI().then(setDepartaments)
    }, []);

    return { departaments };
}

export function useCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategoriesAPI().then(data => setCategories(data));
    }, []);

    return { categories };
}

export function useSubcategories() {
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        getSubcategoriesAPI().then(data => setSubcategories(data));
    }, []);

    return { subcategories };
}

export function useBrands() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        getBrandsAPI().then(data => setBrands(data));
    }, []);

    return { brands };
}