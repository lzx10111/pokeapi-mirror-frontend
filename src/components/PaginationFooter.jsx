import styles from '../styles/footerContent.module.css';

export default function PaginationFooter(props) {
    const pageElements = props.myPagination[4].map((x, index) => <button key={index} 
        type="button" className={`position-absolute top-0 start-${index * 50} translate-middle btn btn-sm rounded-pill${x === props.myPagination[3] ? ` ${styles.activePage}` : ""}`} 
        onClick={() => props.myPagination[0](x)}>{x}</button>);

    function handleClick(event) {
        event.currentTarget.blur();
    }

    return (
        <>
            <div className={`container ${styles.footerContent} text-center`}>
                <div className={`position-relative m-4 ${styles.pagination}`}>
                    <div>
                    </div>
                    {pageElements}
                </div>
                <div className={`container pt-3 ${styles["pagination-direction"]}`}>
                    <div className="position-relative m-4" ref={props.refContent}>
                        <div></div>
                        <i onClick={props.myPagination[1]} className="bi bi-arrow-left-circle-fill position-absolute top-0 start-0 translate-middle"></i>
                        <i onClick={props.myPagination[2]} className="bi bi-arrow-right-circle-fill position-absolute top-0 start-100 translate-middle"></i>
                    </div>
                </div>
            </div>
        </>
    )
}