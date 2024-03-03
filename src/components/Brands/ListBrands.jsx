import { useState } from "react"
import ModalDelete from '../ModalDelete';
import { deleteBrandAPI } from "../../services/brand/CRUDFecthBrand";
import { ModalAddUpdateBrand } from "./ModalAddUpdateBrand";
import { FORMDATAMODALBRANDCONST } from "../../constants";

export function ListBrand({ brands, page, perPage, getBrands }) {

    // Modals
    const [funcDeleteModal, setFuncDeleteModal] = useState(() => () => { });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const closeModalDelete = () => setShowDeleteModal(false);
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
    const closeModalAddUpdate = () => setShowAddUpdateModal(false);

    const [formDataModal, setFormDataModal] = useState(null);

    const afterAddUpdate = () => {
        closeModalAddUpdate();
        getBrands();
    };

    // handle
    const handleClickUpdateBrand = brand => {
        setShowAddUpdateModal(true);
        let aux = {};

        Object.entries(FORMDATAMODALBRANDCONST).map(([index, value]) => {
            if (index === 'type') {
                aux[index] = value;
                return;
            }

            if (brand[index]) aux[index] = brand[index];
        });

        aux['id'] = brand.id;
        setFormDataModal(aux);
    }

    const handleClickDeleteBrand = id => {
        setShowDeleteModal(true);
        setFuncDeleteModal(() => () => {
            deleteBrandAPI({
                id,
                funcSuccess: () => {
                    getBrands();
                    closeModalDelete();
                },
                showNotify: true
            })
        });
    }

    return (
        <>
            {
                brands.map((brand, index) => (
                    <tr key={brand.id}>
                        <th>{(index + 1) + ((page - 1) * perPage)}</th>
                        <td>{brand.name}</td>
                        <td>{brand.id}</td>
                        <td>
                            <div className="dropdown">
                                <button className="ps-4 pe-4 btn rounded-0 btn-sm mt-2 btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Acciones
                                </button>
                                <ul className="dropdown-menu rounded-0">
                                    <li><a className="dropdown-item" onClick={() => handleClickDeleteBrand(brand.id)}>Eliminar</a></li>
                                    <li><a className="dropdown-item" onClick={() => handleClickUpdateBrand(brand)}>Actualizar</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                ))
            }

            {
                showAddUpdateModal && <ModalAddUpdateBrand afterAddUpdate={afterAddUpdate} closeModal={closeModalAddUpdate} initialFormData={formDataModal} />
            }

            {
                showDeleteModal && <ModalDelete closeModal={closeModalDelete} deleteFunction={funcDeleteModal} title="¿Estas seguro de eliminar la marca?" />
            }
        </>
    )
}