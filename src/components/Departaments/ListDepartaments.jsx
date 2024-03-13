import { useState } from "react"
import ModalDelete from "../ModalDelete";
import { deleteDepartamentAPI } from "../../services/departament/CRUDFecthDepartament";
import {  FORMDATAMODALDEPARTAMENTCONST } from "../../constants";
import { ModalAddUpdateDepartament } from "./ModalAddUpdateDepartament";

export function ListDepartaments({ departaments, page, perPage, getDepartaments }) {

    // Modals
    const [funcDeleteModal, setFuncDeleteModal] = useState(() => () => { });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const closeModalDelete = () => setShowDeleteModal(false);
    const modalDeleteInfo = "Si se elimina el departamento tambien se eliminaran sus categorias y subcategorias";
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
    const closeAddUpdateModal = () => setShowAddUpdateModal(false);
    const [formDataModal, setFormDataModal] = useState(null);

    const afterUpdatAddDepartament = () => {
        closeAddUpdateModal();
        getDepartaments();
    }

    // Handle
    const handleClickDeleteDepartament = id => {
        setShowDeleteModal(true);
        setFuncDeleteModal(() => () => {
            deleteDepartamentAPI({
                id,
                funcSuccess: () => {
                    getDepartaments();
                    closeModalDelete();
                },
                showNotify: true
            })
        })
    }

    const handleClickUpdateDepartament = departament => {
        setShowAddUpdateModal(true);
        let aux = {};

        Object.entries(FORMDATAMODALDEPARTAMENTCONST).map(([index, value]) => {
            if (index === 'type') {
                aux[index] = value;
                return;
            }

            if (departament[index]) aux[index] = departament[index];
        });

        aux['id'] = departament.id;
        setFormDataModal(aux);
    }

    return (
        <>
            {
                departaments.map((departament, index) => (
                    <tr key={departament.id}>
                        <td>{(index + 1) + ((page - 1) * perPage)}</td>
                        <td>{departament.name}</td>
                        <td>{departament.id}</td>
                        <td>
                            <div className="dropdown">
                                <button className="ps-4 pe-4 btn rounded-0 btn-sm mt-2 btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Acciones
                                </button>
                                <ul className="dropdown-menu rounded-0">
                                    <li><a className="dropdown-item" onClick={() => handleClickDeleteDepartament(departament.id)}>Eliminar</a></li>
                                    <li><a className="dropdown-item" onClick={() => handleClickUpdateDepartament(departament)}>Actualizar</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                ))
            }
            {
                showDeleteModal && <ModalDelete closeModal={closeModalDelete} deleteFunction={funcDeleteModal} title="¿Esta seguro de eliminar el departamento?" info={modalDeleteInfo} />
            }

            {
                showAddUpdateModal && <ModalAddUpdateDepartament afterAddUpdate={afterUpdatAddDepartament} closeModal={closeAddUpdateModal} initialFormdata={formDataModal} />

            }
        </>
    )
}