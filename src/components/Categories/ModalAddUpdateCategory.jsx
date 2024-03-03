import { useState } from "react"
import { addCategoryAPI, updateCategoryAPI } from "../../services/category/CRUDFecthCategory";
import { Modal, Button } from "react-bootstrap";

export function ModalAddUpdateCategory({ afterAddUpdate, initialFormdata, closeModal }) {

    const [formData, setFormData] = useState(initialFormdata || {
        name: '',
        type: 'add-modal'
    });

    const typeModal = formData.type === 'add-modal' ? 'Agregar' : 'Actualizar';
    const title = `${typeModal} categoria`;

    const handleSubmit = e => {
        e.preventDefault();
        addUpdateCategory();
    }

    const addUpdateCategory = () => {
        if (formData.type === 'add-modal') {
            addCategoryAPI({
                requestData: formData,
                showNotify: true,
                funcSuccess: afterAddUpdate
            });
        } else {
            updateCategoryAPI({
                requestData: formData,
                id: formData.id,
                funcSuccess: afterAddUpdate,
                showNotify: true
            });
        }
    }

    const handleChange = e => {
        if (!e.target.name) return;

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
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
                        <input type="text" required defaultValue={formData.name ? formData.name : ''} name="name" onChange={handleChange} className="form-control" />
                    </div>
                    <div className="d-flex justify-content-start">
                        <Button variant="primary" type="submit">
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
    )
}