import { useState } from "react"
import { useCategories } from "../../hooks/useRelationsProduc"
import { addSubcategoryAPI, updateSubcategoryAPI } from "../../services/subcategory/CRUDFecthSubcategory";
import { Modal, Button } from "react-bootstrap";

export function ModalAddUpdateSubcategory({ initialFormdata, closeModal, afterAddUpdate }) {

    const { categories } = useCategories();

    const [formaData, setFormata] = useState(initialFormdata || {
        name: '',
        category_id: '',
        type: 'add_modal'
    });

    const typeModal = formaData.type === 'add_modal' ? 'Agregar' : 'Actualizar';
    const title = `${typeModal} subcategoria`;

    // Handle
    const handleChange = e => {
        if (!e.target.name) return;

        setFormata({
            ...formaData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        addUpdateSucategory();
    }

    const addUpdateSucategory = () => {
        // console.log(formaData);
        if (formaData.type === 'add_modal') {
            addSubcategoryAPI({
                showNotify: true,
                funcSuccess: afterAddUpdate,
                requestData: formaData,
            });
        } else {
            updateSubcategoryAPI({
                showNotify: true,
                funcSuccess: afterAddUpdate,
                requestData: formaData,
                id: formaData.id
            });
        }
    }

    return (
        <Modal show={true} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre *</label>
                        <input type="text" defaultValue={formaData.name} name="name" required className="form-control" onChange={handleChange} />
                    </div>

                    {
                        categories.length > 0 &&
                        <div className="mb-3">
                            <label className="form-label">Categoria *</label>
                            <select name="category_id" required defaultValue={formaData.category_id ? formaData.category_id : ''} className="form-select" onChange={handleChange}>
                                <option value="">Seleccione una categoria</option>
                                {
                                    categories.map(value => (
                                        <option key={value.id} value={value.id}>{value.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    }
                    <Button variant="primary" type="submit">{typeModal}</Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}