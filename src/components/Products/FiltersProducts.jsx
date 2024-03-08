import { useEffect, useState } from "react";
import { useCategories, useSubcategories, useBrands } from "../../hooks/useRelationsProduc";

function FiltersProducts({ setFilters, filters }) {
    const [selectedCategory, setSelectedCategory] = useState(undefined);
    const { categories } = useCategories();
    const { subcategories } = useSubcategories();
    const { brands } = useBrands();

    const [filtersTo, setFiltersTo] = useState({
        name: '',
        value: ''
    });

    useEffect(() => {
        setFilters({ event: filtersTo });
    }, [filtersTo])

    return (
        <>
            <section className="filters p-3 pb-0">
                <div className="row mb-2">

                    <div className="col-12">
                        <input type="text" onChange={e => e.target.value.length > 2 || e.target.value.length === 0 ? setFiltersTo({ name: 'search', value: e.target.value }) : null} placeholder="Buscar por nombre o SKU..." className="form-control mb-2" />
                    </div>

                    <div className="row row-cols-lg-5 row-cols-md-3 row-cols-2 m-auto">
                        <div className="col mt-2">
                            <select defaultValue={""} className="form-select"
                                onChange={e => setFiltersTo({ name: 'brands', value: e.target.value })}>
                                <option value="">Marca</option>
                                {
                                    brands.length > 0 &&
                                    brands.map((value) => (
                                        <option key={value.id} value={value.name}>{value.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="col mt-2">
                            <select defaultValue={""} className="form-select"
                                onChange={e => {
                                    if (!e.target.value) {
                                        setSelectedCategory(undefined);
                                        setFiltersTo({ name: 'categorySlug', value: '' });
                                        return;
                                    }
                                    const obj = JSON.parse(e.target.value);
                                    setFiltersTo({ name: 'categorySlug', value: obj.slug });
                                    setSelectedCategory({ slug: obj.slug, id: obj.id });
                                }}>
                                <option value="">Categoria</option>
                                {
                                    categories.length > 0 &&
                                    categories.map((value) => (
                                        <option key={value.slug} value={JSON.stringify(value)}>{value.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {
                            selectedCategory &&
                            <div className="col mt-2">
                                <select defaultValue={""} className="form-select"
                                    onChange={e => setFiltersTo({ name: 'categorySlug', value: e.target.value || selectedCategory.slug || '' })}>
                                    <option value="">Subcategoria</option>
                                    {
                                        subcategories.length > 0 &&
                                        subcategories.filter(value => value.category_id == selectedCategory.id).map((value) => (
                                            <option key={value.slug} value={value.slug}>{value.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        }

                        <div className="col mt-2">
                            <select defaultValue={""} onChange={e => {
                                const obj = !e.target.value ? { to: 'all', from: 'all' } : JSON.parse(e.target.value);
                                setFiltersTo({ name: 'price', value: { to: obj.to, from: obj.from } })
                            }} className="form-select">
                                <option value="">Precios</option>
                                {
                                    filters.price.map(value => (
                                        <option key={value.title} value={JSON.stringify(value)}>{value.title}</option>
                                    ))
                                }
                            </select>

                        </div>

                        <div className="col mt-2">
                            <div className="d-flex">
                                <select defaultValue={""} className="form-select" onChange={e => setFiltersTo({ name: 'orderBy', value: e.target.value })}>
                                    <option value="">Ordenar por</option>
                                    <option value="new">Más nuevo</option>
                                    <option value="lower-price">Menor precio</option>
                                    <option value="higher-price">Mayor precio</option>
                                    <option value="z-a">Z-A</option>
                                    <option value="a-z">A-Z</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}

export default FiltersProducts;