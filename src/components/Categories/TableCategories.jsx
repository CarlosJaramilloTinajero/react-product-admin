import { useState, useEffect } from "react";
import { getCategoriesAPI } from "../../services/category/CRUDFecthCategory";
import { ListCategories } from "./ListCategories";
import Pagination from "../Pagination";
import { FiltersCategory } from "./FiltersCategory";
import { ModalAddUpdateCategory } from "./ModalAddUpdateCategory";

export function TableCategories({ }) {

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        orderBy: '',
        perPage: 30
    });

    const gotoPage = page => {
        setPage(page);
        window.scrollTo(0, 0);
    };

    // Modals
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
    const closeModalAddUpdate = () => setShowAddUpdateModal(false);

    const afterAddUpdate = () => {
        getCategories();
        closeModalAddUpdate();
    }

    useEffect(() => {
        getCategories();
    }, [page, filters]);

    const getCategories = () => {
        getCategoriesAPI({
            filters,
            page,
            perPage: filters.perPage,
            funcSuccess: response => {
                const { data } = response;
                setCategories(data.data);
                setPages(data.last_page)
            }
        })
    };

    const setFilterValue = ({ name = '', value = '' }) => {
        if (!name) return;
        setPage(1);
        setFilters({
            ...filters,
            [name]: value
        });
    }
    return (
        <>
            <section className="container-view-header">
                <div className="title-view">
                    <p>Lista de categorias</p>
                </div>
                <div className="button-actions">
                    <button className="btn btn-primary btn-sm" onClick={() => { setShowAddUpdateModal(true) }}>Agregar</button>
                </div>
            </section>

            <FiltersCategory setFilter={setFilterValue} />

            <div className="table-responsive p-4 pt-0 mt-0">

                <div className="d-flex mt-0">
                    <label className="perpage-font form-label mt-2 me-2 text-black">Por pagina</label>
                    <select name="perPage" defaultValue={filters.perPage} className="form-select filters perpage-font"
                        onChange={e => setFilterValue({ name: e.target.name, value: e.target.value })}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                    </select>
                </div>

                <table className="table table-striped table-sm m-auto mt-1 rounded-3 table-hover table-light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>ID</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ListCategories getCategories={getCategories} page={page} perPage={filters.perPage} categories={categories} />
                    </tbody>
                </table>
                {
                    pages > 1 && <Pagination page={page} pages={pages} gotoPage={gotoPage} />
                }
            </div>
            {
                showAddUpdateModal && <ModalAddUpdateCategory afterAddUpdate={afterAddUpdate} closeModal={closeModalAddUpdate} />
            }
        </>
    );
}