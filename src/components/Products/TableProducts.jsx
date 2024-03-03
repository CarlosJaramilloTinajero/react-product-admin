import { useState, useEffect } from "react";
import Pagination from "../Pagination";
import FiltersProducts from "./FiltersProducts";
import ModalAddUpdateProduct from './ModalAddUpdateProduct';
import ListProducts from "./ListProducts";
import { getProductsAPI } from '../../services/product/CRUDFecthProduct';

function TableProducts() {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);

    const [filters, setFilters] = useState({
        perPage: 30,
        brands: [],
        categorySlug: '',
        search: '',
        for_table: false,
        price: undefined,
        orderBy: ''
    });

    // Valores de los filtros obtenidos de la API
    const [filtersValues, setFiltersValues] = useState({
        price: [],
    });

    // Efecto para casa vez que se cambie el valor de los estados de la pagina y los filtros
    // ya que cada vez que se cambien esos efectos se vuelve a consultar a la API
    useEffect(() => {
        getProducts();

        // Cada vez que se acuatlice los estados dentro del array de las dependencias de useEffect, se ejecutara lo que este dentro de la
        // funcion de callback de useEffect 
    }, [page, filters]);


    const getProducts = ({ showNotify = false } = {}) => {
        getProductsAPI({
            page, perPage: filters.perPage, filters, showNotify,
            funcSuccess: handleProductsSuccess,
        })
    }

    // handle
    const handleProductsSuccess = data => {
        setProducts(data.data.products.data);
        setPages(data.data.products.last_page);
        setFiltersValues({
            ...filtersValues,
            price: data.data.filters.price
        })
    }

    // Modal methods
    const closeAddUpdateModal = () => {
        setShowAddUpdateModal(false);
    };
    const openAddUpdateModal = () => setShowAddUpdateModal(true);
    const afterAddUpdate = () => {
        getProducts({ showNotify: true });
        closeAddUpdateModal();
    };


    const gotoPage = pageM => {
        window.scrollTo(0, 0);
        setPage(pageM);
    }

    // Setear el valor a la propiedad en los filtros de la tabla
    const setFiltersTo = ({ event = { name: '', value: '' } }) => {
        if (!event.name) return;
        setPage(1);
        setFilters(
            {
                ...filters,
                [event.name]: event.name === 'brands' ? [event.value || null] : event.value
            });
    };

    return (
        <>
            <FiltersProducts setFilters={setFiltersTo} filters={filtersValues} />

            <div className="d-flex justify-content-end mt-3 px-3">
                <button className="btn btn-primary btn-sm" onClick={openAddUpdateModal}>Agregar</button>
            </div>
            <div className="table-responsive p-4 pt-0 mt-0">
                <div className="d-flex mt-0">
                    <label htmlFor="per-page-label" className="perpage-font form-label mt-2 me-2 text-white">Por pagina: </label>
                    <select defaultValue={filters.perPage} name="perPage "
                        onChange={e => {
                            setFiltersTo({ event: { name: 'perPage', value: e.target.value } })
                        }}
                        className="form-select filters perpage-font">
                        <option defaultValue="10">10</option>
                        <option defaultValue="20">20</option>
                        <option defaultValue="30">30</option>
                        <option defaultValue="40">40</option>
                    </select>
                </div>
                <table className="table table-striped table-sm m-auto mt-1 rounded-3 table-dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>SKU</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Imagen</th>
                            <th>Marca</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        <ListProducts products={products} page={page} perPage={filters.perPage} getProducts={getProducts} />
                    </tbody>
                </table>
                {
                    pages > 1 && <Pagination gotoPage={gotoPage} pages={pages} page={page} />
                }
            </div >

            {
                showAddUpdateModal && <ModalAddUpdateProduct closeModal={closeAddUpdateModal} afterAddUpdate={afterAddUpdate} />
            }
        </>
    );
}

export default TableProducts;