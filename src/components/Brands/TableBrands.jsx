import { useState, useEffect } from "react";
import { getBrandsAPI } from "../../services/brand/CRUDFecthBrand";
import { FiltersBrand } from "./FiltersBrand";
import { ListBrand } from "./ListBrands";
import Pagination from "../Pagination";
import { ModalAddUpdateBrand } from "./ModalAddUpdateBrand";

export function TableBrands({ }) {
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [brands, setBrands] = useState([]);
    const [filters, setFilters] = useState({
        perPage: 30,
        orderBy: '',
        search: ''
    });

    useEffect(() => {
        getBrands();
    }, [page, filters]);

    const getBrands = () => {
        getBrandsAPI({ page, perPage: filters.perPage, filters, funcSuccess: handleSuccessAPI })
    };

    const handleSuccessAPI = (response) => {
        const { data } = response;
        setBrands(data.data);
        setPages(data.last_page)
    };

    const gotoPage = page => {
        window.scrollTo(0, 0);
        setPage(page);
    };

    const setFilterValue = ({ name = '', value = '' }) => {
        if (!name) return;
        setPage(1);
        setFilters({
            ...filters,
            [name]: value
        });
    }

    // Modals
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
    const closeModalAddUpdate = () => setShowAddUpdateModal(false);
    const afterAddUpdate = () => {
        closeModalAddUpdate();
        getBrands();
    }

    return (
        <>
            <FiltersBrand setFilter={setFilterValue} />

            <div className="d-flex justify-content-end mt-3 px-3">
                <button className="btn btn-primary btn-sm" onClick={() => setShowAddUpdateModal(true)}>Agregar</button>
            </div>
            <div className="table-responsive p-4 pt-0 mt-0">
                <div className="d-flex mt-0">
                    <label htmlFor="per-page-label" className="perpage-font form-label mt-2 me-2 text-white">Por pagina: </label>
                    <select defaultValue={filters.perPage} name="perPage "
                        onChange={e => {
                            setFilterValue({ name: 'perPage', value: e.target.value })
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
                            <th>Nombre</th>
                            <th>ID</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ListBrand page={page} brands={brands} perPage={filters.perPage} getBrands={getBrands} />
                    </tbody>
                </table>
                {pages > 1 && <Pagination gotoPage={gotoPage} pages={pages} page={page} />}
            </div>
            {
                showAddUpdateModal && <ModalAddUpdateBrand afterAddUpdate={afterAddUpdate} closeModal={closeModalAddUpdate} />
            }
        </>
    )
}