import { Modal, Button } from "react-bootstrap";
import { useState } from 'react';
import { addBannerAPI, updateBannerAPI } from "../../services/banner/CRUDFecthBanner";
import { FORMDATAMODALBANNERCONST } from "../../constants";

export function ModalAddUpdateBanner({ closeModal, initialFormData, afterAddUpdate }) {

    const [formData, setFormData] = useState(initialFormData || { ...FORMDATAMODALBANNERCONST, type: 'add-modal' });

    const typeModal = formData.type === 'add-modal' ? 'Agregar' : 'Actualizar';
    const title = `${typeModal} banner`

    const handleChange = e => {
        if (!e.target.name) return;

        const inputTypeFile = ['image'];

        setFormData({
            ...formData,
            [e.target.name]: inputTypeFile.includes(e.target.name) ? e.target.files[0] : e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        updateAddBanner();
    }

    const updateAddBanner = () => {
        if (formData.type === 'add-modal') {
            addBannerAPI({
                requestData: formData,
                funcSuccess: afterAddUpdate,
                showNotify: true
            });
        } else {
            updateBannerAPI({
                id: formData.id,
                requestData: formData,
                funcSuccess: afterAddUpdate,
                showNotify: true
            })
        }
    };

    return (
        <Modal show={true} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" required name="name" defaultValue={formData.name ? formData.name : ''} onChange={handleChange} className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Dispositivo</label>
                        <select name="device" required className="form-select" defaultValue={formData.device || ''} onChange={handleChange}>
                            <option value="">Seleccione una opción</option>
                            <option value="pc">PC</option>
                            <option value="movil">Movil</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Sección</label>
                        <input required type="text" name="section" className="form-control" onChange={handleChange} defaultValue={formData.section || ''} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Posición</label>
                        <input required min={1} type="number" name="position" className="form-control" onChange={handleChange} defaultValue={formData.position || 0} />
                    </div>

                    {formData.type === 'update_modal' && formData.image_act && formData.image_act.path &&
                        <div className="mb-3">
                            <label htmlFor="Imagen actual" className="form-label mb-2">Imagen actual</label>
                            <div className="img-table" style={{ cursor: 'pointer' }}>
                                <a href={formData.image_act.path} target="_blank">
                                    <img src={formData.image_act.path} alt="imagen actual" />
                                </a>
                            </div>
                        </div>
                    }

                    <div className="mb-3">
                        <label className="form-label">{`Imagen ${formData.type === 'update_modal' ? 'nueva' : ''}`}</label>
                        <input type="file" required={!formData.image_act} onChange={handleChange} accept="image/*" name="image" className="form-control" />
                    </div>

                    <div className="d-flex justify-content-start">
                        <Button type="submit" variant="primary">
                            {typeModal}
                        </Button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}