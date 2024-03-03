import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { updateProduct, addProduct } from '../../services/product/CRUDFecthProduct';
import { useCategories, useSubcategories, useBrands } from '../../hooks/useRelationsProduc';

export default function ModalAddUpdateProduct({ closeModal, initialFormData, afterAddUpdate }) {
    const { categories } = useCategories();
    const { subcategories } = useSubcategories();
    const { brands } = useBrands();

    // Estado con el objeto para el formulario
    const [formData, setFormData] = useState(initialFormData || {
        sku: '',
        name: '',
        price: 0,
        largo: 0,
        alto: 0,
        ancho: 0,
        peso: 0,
        img_path: '',
        category_id: null,
        subcategory_id: null,
        brand_id: null,
        type: 'add_modal'
    });

    const handleChange = e => {
        // if (!formData[e.target.name]) return;
        // console.log(e.target.name, e.target.value, formData[e.target.name]);

        if (e.target.name === 'category_id') formData.subcategory_id = '';

        // Seteamos la propiedad que fue cambiada desde el formulario
        const inputTypeFile = ['img_path', 'img_data'];
        setFormData({
            ...formData,
            [e.target.name]: inputTypeFile.includes(e.target.name) ? e.target.files[0] : e.target.value
        });
    };

    // Mandar el formulario
    const handleSubmit = e => {
        e.preventDefault();
        updateAddProduct();
    }

    const updateAddProduct = () => {
        if (formData.type === 'add_modal') {
            addProduct({
                formData, showNotify: true, funcSuccess: () => {
                    afterAddUpdate();
                    setFormData({
                        sku: '',
                        name: '',
                        price: 0,
                        largo: 0,
                        alto: 0,
                        ancho: 0,
                        peso: 0,
                        img_path: '',
                        category_id: null,
                        subcategory_id: null,
                        brand_id: null,
                        type: 'add_modal'
                    });
                }
            });
        } else {
            updateProduct({
                idProduct: formData.id,
                formData,
                showNotify: true,
                funcSuccess: afterAddUpdate
            })
        }
    }

    return (
        <Modal show={true} onHide={closeModal} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>{formData.type === 'add_modal' ? 'Agregar' : 'Actualizar'} producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* <input type="hidden" name="_method" value={formData.type === 'update_modal' ? 'PUT' : 'POST'} /> */}
                    <div className="mb-3">
                        <label className="form-label">SKU *</label>
                        <input type="text" required value={formData.sku} onChange={handleChange} name="sku" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nombre *</label>
                        <input type="text" required value={formData.name} onChange={handleChange} name="name" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Precio *</label>
                        <input type="number" required min={10} step={0.001} value={formData.price} onChange={handleChange} name="price" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Peso *</label>
                        <input type="number" required step={0.001} value={formData.peso} onChange={handleChange} name="peso" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Largo *</label>
                        <input type="number" required step={0.001} value={formData.largo} onChange={handleChange} name="largo" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ancho *</label>
                        <input type="number" required step={0.001} value={formData.ancho} onChange={handleChange} name="ancho" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Alto *</label>
                        <input type="number" required step={0.001} value={formData.alto} onChange={handleChange} name="alto" className="form-control" />
                    </div>

                    {formData.type === 'update_modal' && formData.img_act &&
                        <div className="mb-3">
                            <label htmlFor="Imagen actual" className="form-label mb-2">Imagen actual</label>
                            <div className="img-table" style={{ cursor: 'pointer' }}>
                                <a href={formData.img_act} target="_blank">
                                    <img src={formData.img_act} alt="imagen actual" />
                                </a>
                            </div>
                        </div>
                    }

                    <div className="mb-3">
                        <label className="form-label">{`Imagen ${formData.type === 'update_modal' ? 'nueva' : ''}`} *</label>
                        <input type="file" required={!formData.img_act} accept="image/*" onChange={handleChange} name={formData.type === 'add_modal' ? 'img_path' : 'img_data'} placeholder="imagen" className="form-control" />
                    </div>

                    {
                        brands.length > 0 && <div className="mb-3">
                            <label className="form-label">Marca *</label>
                            <select name="brand_id" required className="form-control" defaultValue={formData.brand_id ? formData.brand_id : ''} onChange={handleChange}>
                                <option value="">Seleccione una marca</option>
                                {
                                    brands.map(value => (
                                        <option key={value.name} value={value.id}>{value.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    }

                    {
                        categories.length > 0 && <div className="mb-3">
                            <label className="form-label">Categoria *</label>
                            <select name="category_id" required defaultValue={formData.category_id ? formData.category_id : ""} onChange={handleChange} className="form-control">
                                <option value="">seleccione una categoria</option>
                                {
                                    categories.map(value => (
                                        <option key={value.slug} value={value.id}>{value.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    }

                    {
                        formData.category_id && subcategories.length > 0 &&
                        <div className="mb-3">
                            <label className="form-label">Subcategoria *</label>
                            <select name="subcategory_id" required defaultValue={formData.subcategory_id ? formData.subcategory_id : ""} onChange={handleChange} className="form-control">
                                <option value="">seleccione una subcategoria</option>
                                {
                                    subcategories.filter(value => value.category_id == formData.category_id).map(value => (
                                        <option key={value.slug} value={value.id}>{value.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    }
                    <Button type="submit" variant="primary">
                        Guardar
                    </Button>
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