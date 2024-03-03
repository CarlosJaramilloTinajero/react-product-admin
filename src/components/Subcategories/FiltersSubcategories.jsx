
export function FiltersSubcategories({ setFilter }) {

    return (
        <section className="filters p-3 pb-0">
            <div className="row mb-2">
                <div className="col-12 mb-2">
                    <input type="text" name="search" placeholder="Bucar por nombre..." className="form-control" onChange={e => setFilter({ name: e.target.name, value: e.target.value })} />
                </div>

                <div className="row row-cols-lg-5 row-cols-md-3 row-cols-2 m-auto">
                    <div className="col mt-2">
                        <div className="col mt-2">
                            <div className="d-flex">
                                <select defaultValue={""} className="form-select" onChange={e => setFilter({ name: 'orderBy', value: e.target.value })}>
                                    <option value="">Ordenar por</option>
                                    <option value="new">Más nuevo</option>
                                    <option value="z-a">Z-A</option>
                                    <option value="a-z">A-Z</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}