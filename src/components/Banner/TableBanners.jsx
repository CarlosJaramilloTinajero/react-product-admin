import { useCallback, useEffect, useState } from "react";
import { getBannerByFiltersAPI } from "../../services/banner/CRUDFecthBanner";
import Pagination from "../Pagination";
import { ListBanners } from "./ListBanners";
import { FiltersBanner } from "./FiltersBanner";
import { ModalAddUpdateBanner } from "./ModalAddUpdateBanner";
import debounce from "just-debounce-it";

export default function TableBanners({ }) {
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [banners, setBanners] = useState([]);
    const [filters, setFilters] = useState({
        perPage: 30,
        orderBy: '',
        search: '',
        device: '',
    });

    useEffect(() => {
        getBanners();
    }, [page, filters]);

    const handleSuccessAPI = useCallback((response) => {
        const { data } = response;
        setBanners(data.data);
        setPages(data.last_page)
    }, [setBanners, setPages]);

    const getBanners = useCallback(() => {
        getBannerByFiltersAPI({ page, perPage: filters.perPage, filters, funcSuccess: handleSuccessAPI });
    }, [page, filters, handleSuccessAPI]);

    const gotoPage = useCallback(page => {
        window.scrollTo(0, 0);
        setPage(page);
    }, [setPage]);

    const setFilterValue = useCallback(debounce(({ name = '', value = '' }) => {
        if (!name) return;
        setPage(1);
        setFilters({
            ...filters,
            [name]: value
        });
    }, 300), [filters, setPage, setFilters]);

    // Modals
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
    const closeModalAddUpdate = () => setShowAddUpdateModal(false);
    const afterAddUpdate = () => {
        closeModalAddUpdate();
        getBanners();
    }
    return (<>
        <section className="container-view-header">
            <div className="title-view">
                <p>Lista banners</p>
            </div>
            <div className="button-actions">
                <button className="btn btn-primary btn-sm" onClick={() => setShowAddUpdateModal(true)}>Agregar</button>
            </div>
        </section>

        <FiltersBanner setFilter={setFilterValue} />

        <div className="table-responsive p-4 pt-0 mt-0">
            <div className="d-flex mt-0">
                <label htmlFor="per-page-label" className="perpage-font form-label mt-2 me-2 text-black">Por pagina: </label>
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
            <table className="table table-striped table-sm m-auto mt-1 rounded-3 table-hover table-light">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Dipositivo</th>
                        <th>Posición</th>
                        <th>Sección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <ListBanners page={page} banners={banners} perPage={filters.perPage} getBanners={getBanners} />
                </tbody>
            </table>
            {pages > 1 && <Pagination gotoPage={gotoPage} pages={pages} page={page} />}
        </div>
        {
            showAddUpdateModal && <ModalAddUpdateBanner afterAddUpdate={afterAddUpdate} closeModal={closeModalAddUpdate} />
        }
    </>)
}