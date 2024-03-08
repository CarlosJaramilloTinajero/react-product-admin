function Pagination({ gotoPage, pages, page }) {

    // Maximo de links de paginas de la tabla
    const pagesLinkMax = 10;
    const pageArray = Array.from({ length: pagesLinkMax }, (_, index) => index);

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

                {/* {
                    pageArray.map(index => (
                        <div key={index}>
                            {
                                index + (page - pagesLinkMax) > 0 &&
                                <button className={`page-link ${page === (index + (page - pagesLinkMax)) ? 'link-selected' : ''} `}
                                    onClick={() => gotoPage((index + (page - pagesLinkMax)))}>
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
                                    onClick={() => gotoPage(index + page)}>{index + page
                                    }</button>
                            }
                        </div>
                    ))
                } */}

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