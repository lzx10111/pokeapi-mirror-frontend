import styles from '../../styles/footerStyleTwo.module.css';

export default function FooterStyleTwo() {
    return (
        <>
            <div className={`container ${styles.footerContainer} my-4 border rounded`}>
                <div className={`row my-4 ${styles.elements} justify-content-evenly text-center`}>
                    <div className="col-auto mb-2 mb-lg-0">
                        <i className={`icon-pokeball me-2 ${styles["custom-golden-style"]}`}></i>
                        <span className={styles["custom-golden-style"]}>Jean</span>
                    </div>
                    <div className="col-auto mb-2 mb-lg-0">
                        <a className={styles["custom-golden-style"]} href="mailto:example@example.com">
                            <i className="bi bi-google me-2"></i>Gmail</a>
                    </div>
                    <div className="col-auto mb-2 mb-lg-0">
                        <a className={styles["custom-golden-style"]} href="https://github.com/lzx10111">
                            <i className="bi bi-github me-2"></i>Github</a>
                    </div>
                    <div className="col-12 mt-3 mt-lg-4 mb-2 mb-lg-0">
                        <span className={styles["custom-silver-style"]} >PokeApi Mirror / 2024 - 2025</span>
                    </div>
                </div>
            </div>
        </>
    )
}