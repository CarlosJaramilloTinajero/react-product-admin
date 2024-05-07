import { useCallback, useState } from "react"
import ModalDelete from '../ModalDelete';
import { FORMDATAMODALBANNERCONST } from "../../constants";
import { deleteBannerAPI } from "../../services/banner/CRUDFecthBanner";
import { ModalAddUpdateBanner } from "./ModalAddUpdateBanner";

export function ListBanners({ banners, page, perPage, getBanners }) {

    // Modals
    const [funcDeleteModal, setFuncDeleteModal] = useState(() => () => { });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const closeModalDelete = () => setShowDeleteModal(false);
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
    const closeModalAddUpdate = () => setShowAddUpdateModal(false);

    const [formDataModal, setFormDataModal] = useState(null);

    const afterAddUpdate = useCallback(() => {
        closeModalAddUpdate();
        getBanners();
    }, [closeModalAddUpdate, getBanners]);

    // handle
    const handleClickUpdateBanner = useCallback(banner => {
        setShowAddUpdateModal(true);
        let aux = {};

        Object.entries(FORMDATAMODALBANNERCONST).map(([index, value]) => {
            if (index === 'type') {
                aux[index] = value;
                return;
            }

            if (index === 'image') {
                aux[index] = null;
                aux['image_act'] = banner[index];
                return;
            }

            if (banner[index]) aux[index] = banner[index];
        });

        aux['id'] = banner.id;
        setFormDataModal(aux);
    }, [setShowAddUpdateModal, setFormDataModal]);

    const handleClickDeleteBanner = useCallback(id => {
        setShowDeleteModal(true);
        setFuncDeleteModal(() => () => {
            deleteBannerAPI({
                id,
                funcSuccess: () => {
                    getBanners();
                    closeModalDelete();
                },
                showNotify: true
            });
        });
    }, [setShowDeleteModal, setFuncDeleteModal, getBanners, closeModalDelete])

    return (
        <>
            {
                banners.map((banner, index) => (
                    <tr key={banner.id}>
                        <td>{banner.id}</td>
                        <td>
                            {
                                banner.image && banner.image.path &&
                                <div className="img-table shadow-lg">
                                    <img src={banner.image.path} alt="" />
                                </div>
                            }
                        </td>
                        <td>{banner.name.substr(0, 20)}
                            {banner.name.length > 20 && <span>...</span>}
                        </td>
                        <td>{banner.device ? banner.device.toUpperCase() : 'NAN'}</td>
                        <td>{banner.position}</td>
                        <td>{banner.section ? banner.section.toUpperCase() : 'NAN'}</td>
                        <td>
                            <div className="dropdown">
                                <button className="ps-4 pe-4 btn rounded-0 btn-sm mt-2 btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Acciones
                                </button>
                                <ul className="dropdown-menu rounded-0">
                                    <li><a className="dropdown-item" onClick={() => handleClickDeleteBanner(banner.id)}>Eliminar</a></li>
                                    <li><a className="dropdown-item" onClick={() => handleClickUpdateBanner(banner)}>Actualizar</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                ))
            }

            {
                showAddUpdateModal && <ModalAddUpdateBanner afterAddUpdate={afterAddUpdate} closeModal={closeModalAddUpdate} initialFormData={formDataModal} />
            }

            {
                showDeleteModal && <ModalDelete closeModal={closeModalDelete} deleteFunction={funcDeleteModal} title="¿Estas seguro de eliminar el banner?" />
            }
        </>
    )
}