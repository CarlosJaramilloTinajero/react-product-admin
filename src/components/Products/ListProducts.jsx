import { useCallback, useState } from "react";
import ModalAddUpdateProduct from "./ModalAddUpdateProduct";
import ModalDelete from "../ModalDelete";
import { deleteProductByID } from "../../services/product/CRUDFecthProduct";
import { FORMDATAMODALPRODUCTCONST } from "../../constants";

export default function ListProducts({ products, perPage, getProducts, page }) {
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [funcDeleteModal, setFuncDeleteModal] = useState(() => () => { });

    const [formDataModal, setFormDataModal] = useState(null);

    // Modal methods
    const closeAddUpdateModal = () => {
        setShowAddUpdateModal(false);
        setFormDataModal(null);
    };

    const openAddUpdateModal = () => setShowAddUpdateModal(true);
    const afterUpdatAddProduct = () => {
        closeAddUpdateModal();
        getProducts();
    };

    const closeDeleteModal = () => setShowDeleteModal(false);

    const deleteProduct = useCallback(id => {
        deleteProductByID({
            id: id, showNotify: true, funcSuccess: () => {
                getProducts();
                setShowDeleteModal(false);
            }
        })
    }, [getProducts]);

    const handleClickDeleteProduct = product => {
        setShowDeleteModal(true);
        setFuncDeleteModal(() => () => deleteProduct(product.id));
    }

    const handleClickUpdateProduct = product => {
        openAddUpdateModal();
        let aux = {};

        Object.entries(FORMDATAMODALPRODUCTCONST).map(([index, value]) => {
            if (index === 'type') {
                aux[index] = value;
                return;
            }

            if (index === 'img_path') {
                aux['img_act'] = product[index];
                aux[index] = '';
                aux['img_data'] = '';
                return;
            }

            if (product[index]) aux[index] = product[index];
        });
        aux['id'] = product.id;
        setFormDataModal(aux);
    }

    return (
        <>
            {
                products.map((product, index) => (
                    <tr key={product.id}>
                        <th>{(index + 1) + ((page - 1) * perPage)}</th>
                        <td>{product.sku}</td>
                        <td>{product.name.substr(0, 20)}...</td>
                        <td>{product.price}</td>
                        <td>
                            <div className="img-table shadow-lg">
                                <img src={product.img_path} alt="" />
                            </div>
                        </td>
                        <td>{product.brand ? product.brand.name : ''}</td>
                        <td>
                            <div className="dropdown">
                                <button className="ps-4 pe-4 btn rounded-0 btn-sm mt-2 btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Acciones
                                </button>
                                <ul className="dropdown-menu rounded-0">
                                    <li><a className="dropdown-item" onClick={() => handleClickDeleteProduct(product)}>Eliminar</a></li>
                                    <li><a className="dropdown-item" onClick={() => handleClickUpdateProduct(product)}>Actualizar</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                ))
            }

            {
                showAddUpdateModal && <ModalAddUpdateProduct closeModal={closeAddUpdateModal} initialFormData={formDataModal} afterAddUpdate={afterUpdatAddProduct} />
            }

            {
                showDeleteModal && <ModalDelete title="¿Estas seguro de elminar el producto?" closeModal={closeDeleteModal} deleteFunction={funcDeleteModal} />
            }
        </>
    );
} 