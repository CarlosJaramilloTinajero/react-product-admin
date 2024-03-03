function Pagination({ gotoPage, pages, page }) {

    // Maximo de links de paginas de la tabla
    const pagesLinkMax = 10;
    const pageArray = Array.from({ length: pagesLinkMax }, (_, index) => index);
    const clickLink = (page) => gotoPage(page);

    return (
        <>
            {/* <!-- Paginacion --> */}
            <div className="pagination">
                {page > pagesLinkMax && <button className={`page-link ${page === 1 ? 'link-selected' : ''}`}
                    onClick={() => clickLink(1)}> 1</button>}

                {page > pagesLinkMax && <button className={`page-link ${page === 2 ? 'link-selected' : ''}`}
                    onClick={() => clickLink(2)}> 2</button>}

                {page > pagesLinkMax && <button className={`page-link ${page === 3 ? 'link-selected' : ''}`}
                    onClick={() => clickLink(3)}> 3</button>}

                {
                    pageArray.map(index => (
                        <div key={index}>
                            {
                                index + (page - pagesLinkMax) > 0 &&
                                <button className={`page-link ${page === (index + (page - pagesLinkMax)) ? 'link-selected' : ''} `}
                                    onClick={() => clickLink((index + (page - pagesLinkMax)))}>
                                    {(index + (page - pagesLinkMax))} </button>
                            }
                        </div>
                    ))
                }

                {
                    pageArray.map(index => (
                        <div key={index * 2}>
                            {
                                index + page < pages + 1 &&
                                <button className={page === (index + page) ? 'page-link link-selected' : 'page-link'}
                                    onClick={() => clickLink(index + page)}>{index + page
                                    }</button>
                            }
                        </div>
                    ))
                }

                {
                    page < pages - pagesLinkMax &&
                    <button className={`page-link ${page === (pages - 2) ? 'link-selected' : ''}`}
                        onClick={() => clickLink((pages - 2))}>{
                            (pages - 2)}</button>
                }

                {
                    page < pages - pagesLinkMax &&
                    <button className={`page-link ${page === (pages - 1) ? 'link-selected' : ''}`}
                        onClick={() => clickLink((pages - 1))}>{
                            (pages - 1)}</button>
                }

                {
                    page < pages - pagesLinkMax &&
                    <button className={`page-link ${page === pages ? 'link-selected' : ''}`}
                        onClick={() => clickLink(pages)}>{
                            pages}</button>
                }

            </div>
        </>
    );
}

export default Pagination;