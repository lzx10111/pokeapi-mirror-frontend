export default function PaginationTable(props) {

    const pageElements = props.myPagination[4].map((x, index) => <li key={index}
        onClick={() => props.myPagination[0](x)} className={`page-item${props.myPagination[3] === x ? " active" : ""}`}>
        <button onClick={(event) => handleClick(event)} className="page-link" aria-current={props.myPagination[3] === x ? "page" : null}>{x}</button></li>);

    function handleClick(event) {
        event.currentTarget.blur();
    }

    return (
        <>
            <div className="container pt-2 pb-3">
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center justify-content-lg-center">
                        <li onClick={props.myPagination[1]} className="page-item">
                            <button onClick={(event) => handleClick(event)} className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {pageElements}
                        <li onClick={props.myPagination[2]} className="page-item">
                            <button onClick={(event) => handleClick(event)} className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}