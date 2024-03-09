function Pagination({ gotoPage, pages, page }) {

    // Maximo de links de paginas de la tabla
    const pagesLinkMax = 10;

    const generateButtons = () => {
        const buttons = [];
        const startPage = Math.max(1, page - Math.floor(pagesLinkMax / 2));
        const endPage = Math.min(pages, startPage + pagesLinkMax);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button key={i} className={`page-link ${page === i ? 'link-selected' : ''}`} onClick={() => gotoPage(i)} children={i} />
            );
        }

        return buttons;
    }

    return (
        <>
            {/* <!-- Paginacion --> */}
            <div className="pagination">
                {page > pagesLinkMax && <button className={`page-link ${page === 1 ? 'link-selected' : ''}`}
                    onClick={() => gotoPage(1)}> 1</button>}

                {page > pagesLinkMax && <button className={`page-link ${page === 2 ? 'link-selected' : ''}`}
                    onClick={() => gotoPage(2)}> 2</button>}

                {page > pagesLinkMax && <button className={`page-link ${page === 3 ? 'link-selected' : ''}`}
                    onClick={() => gotoPage(3)}> 3</button>}

                {generateButtons()}

                {
                    page < pages - pagesLinkMax &&
                    <button className={`page-link ${page === (pages - 2) ? 'link-selected' : ''}`}
                        onClick={() => gotoPage((pages - 2))}>{
                            (pages - 2)}</button>
                }

                {
                    page < pages - pagesLinkMax &&
                    <button className={`page-link ${page === (pages - 1) ? 'link-selected' : ''}`}
                        onClick={() => gotoPage((pages - 1))}>{
                            (pages - 1)}</button>
                }

                {
                    page < pages - pagesLinkMax &&
                    <button className={`page-link ${page === pages ? 'link-selected' : ''}`}
                        onClick={() => gotoPage(pages)}>{
                            pages}</button>
                }

            </div>
        </>
    );
}

export default Pagination;