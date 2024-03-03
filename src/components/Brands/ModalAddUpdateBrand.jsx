import { Modal, Button } from "react-bootstrap";
import { useState } from 'react';
import { addBrandAPI, updateBrandAPI } from "../../services/brand/CRUDFecthBrand";

export function ModalAddUpdateBrand({ closeModal, initialFormData, afterAddUpdate }) {

    const [formData, setFormData] = useState(initialFormData || {
        name: '',
        type: 'add-modal'
    });

    const typeModal = formData.type === 'add-modal' ? 'Agregar' : 'Actualizar';
    const title = `${typeModal} marca`

    const handleChange = e => {
        if (!e.target.name) return;

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        updateAddBrand();
    }

    const updateAddBrand = () => {
        if (formData.type === 'add-modal') {
            addBrandAPI({
                requestData: formData,
                funcSuccess: afterAddUpdate,
                showNotify: true
            })
        } else {
            updateBrandAPI({
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