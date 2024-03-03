import { useState } from "react"
import { deleteCategoryAPI } from "../../services/category/CRUDFecthCategory";
import ModalDelete from "../ModalDelete";
import { ModalAddUpdateCategory } from "./ModalAddUpdateCategory";
import { FORMDATAMODALCATEGORYCONST } from "../../constants";

export function ListCategories({ categories, page, perPage, getCategories }) {

    // const { subcategories } = useRelationsProduct();

    // Modals
    const [funcDeleteModal, setFuncDeleteModal] = useState(() => () => { });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const closeModalDelete = () => setShowDeleteModal(false);
    const modalDeleteInfo = "Si se elimina la categoria tambien se eliminaran sus subcategorias";
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
    const closeAddUpdateModal = () => setShowAddUpdateModal(false);
    const [formDataModal, setFormDataModal] = useState(null);

    const afterUpdatAddCategory = () => {
        closeAddUpdateModal();
        getCategories();
    }

    // Handle
    const handleClickDeleteCategory = id => {
        setShowDeleteModal(true);
        setFuncDeleteModal(() => () => {
            deleteCategoryAPI({
                id,
                funcSuccess: () => {
                    getCategories();
                    closeModalDelete();
                },
                showNotify: true
            })
        })
    }

    const handleClickUpdatecategory = category => {
        setShowAddUpdateModal(true);
        let aux = {};

        Object.entries(FORMDATAMODALCATEGORYCONST).map(([index, value]) => {
            if (index === 'type') {
                aux[index] = value;
                return;
            }

            if (category[index]) aux[index] = category[index];
        });

        aux['id'] = category.id;
        setFormDataModal(aux);
    }

    return (
        <>
            {
                categories.map((category, index) => (
                    <tr key={category.id}>
                        <td>{(index + 1) + ((page - 1) * perPage)}</td>
                        <td>{category.name}</td>
                        <td>{category.id}</td>
                        <td>
                            <div className="dropdown">
                                <button className="ps-4 pe-4 btn rounded-0 btn-sm mt-2 btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Acciones
                                </button>
                                <ul className="dropdown-menu rounded-0">
                                    <li><a className="dropdown-item" onClick={() => handleClickDeleteCategory(category.id)}>Eliminar</a></li>
                                    <li><a className="dropdown-item" onClick={() => handleClickUpdatecategory(category)}>Actualizar</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                ))
            }
            {
                showDeleteModal && <ModalDelete closeModal={closeModalDelete} deleteFunction={funcDeleteModal} title="¿Esta seguro de eliminar la categoria?" info={modalDeleteInfo} />
            }

            {
                showAddUpdateModal && <ModalAddUpdateCategory afterAddUpdate={afterUpdatAddCategory} closeModal={closeAddUpdateModal} initialFormdata={formDataModal} />

            }
        </>
    )
}