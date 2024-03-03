import { Modal, Button } from "react-bootstrap"

const ModalDelete = ({ closeModal, deleteFunction, title, info = null }) => {
    return (
        <Modal show={true} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            {info &&
                <Modal.Body>
                    <div className="alert alert-warning rounded-0s p-2 my-3"><p className="fs-6 mb-0">{info}</p></div>
                </Modal.Body>
            }
            <Modal.Footer>
                <Button variant="danger" onClick={deleteFunction}>
                    Eliminar
                </Button>
                <Button variant="secondary" onClick={closeModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelete;