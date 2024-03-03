import { deleteSubcategoryAPI } from "../../services/subcategory/CRUDFecthSubcategory";
import { useState } from "react";
import ModalDelete from "../ModalDelete";
import { FORMDATAMODALSUBCATEGORYCONST } from "../../constants";
import { ModalAddUpdateSubcategory } from "./ModalAddUpdateSubcategory";

export function ListSubcategories({ subcategories, page, perPage, getSubcategories }) {

    // Modals
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const closeModalDelete = () => setShowDeleteModal(false);
    const [funcDeleteModal, setFuncDeleteModal] = useState(() => () => { });
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
    const [formDataModal, setFormDataModal] = useState(null);

    const closeModalAddUpdate = () => setShowAddUpdateModal(false);
    const afterAddUpdate = () => {
        closeModalAddUpdate();
        getSubcategories();
    };

    // Handle
    const handleClickDeleteSubcategory = id => {
        setShowDeleteModal(true);
        setFuncDeleteModal(() => () => {
            deleteSubcategoryAPI({
                id,
                showNotify: true,
                funcSuccess: () => {
                    getSubcategories();
                    closeModalDelete();
                }
            })
        })
    };

    const handleClickUpdateSubcategory = subcategory => {
        setShowAddUpdateModal(true);
        let aux = {};

        Object.entries(FORMDATAMODALSUBCATEGORYCONST).map(([index, value]) => {
            if (index === 'type') {
                aux[index] = value;
                return;
            }

            if (subcategory[index]) aux[index] = subcategory[index];
        });

        aux['id'] = subcategory.id;
        setFormDataModal(aux);
    }


    return (
        <>
            {
                subcategories.map((subcategory, index) => (
                    <tr key={subcategory.id}>
                        <th>{(index + 1) + ((page - 1) * perPage)}</th>
                        <td>{subcategory.name}</td>
                        <td>{subcategory.category ? subcategory.category.name : 'N'}</td>
                        <td>{subcategory.id}</td>
                        <td>
                            <div className="dropdown">
                                <button className="ps-4 pe-4 btn rounded-0 btn-sm mt-2 btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Acciones
                                </button>
                                <ul className="dropdown-menu rounded-0">
                                    <li><a className="dropdown-item" onClick={() => handleClickDeleteSubcategory(subcategory.id)}>Eliminar</a></li>
                                    <li><a className="dropdown-item" onClick={() => handleClickUpdateSubcategory(subcategory)}>Actualizar</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                ))
            }

            {
                showDeleteModal &&
                <ModalDelete closeModal={closeModalDelete} deleteFunction={funcDeleteModal} title="¿Esta seguro de eliminar la subcategoria?" />
            }

            {
                showAddUpdateModal &&
                <ModalAddUpdateSubcategory afterAddUpdate={afterAddUpdate} closeModal={closeModalAddUpdate} initialFormdata={formDataModal} />
            }
        </>
    );
}