import '../../fontello/css/fontello.css';
import styles from '../../styles/footerStyleOne.module.css';

export default function FooterStyleOne() {
    return (
        <>
            <div className={`container ${styles.footerContainer} my-4 border rounded`}>
                <div className="row my-4 justify-content-center justify-content-lg-start text-center text-lg-start">
                    <div className="col-12 col-lg-8 ms-0 ms-lg-4 mb-3 mb-lg-0 ps-auto ps-lg-1 align-items-stretch">
                        <div className="row align-items-center h-100">
                            <div className={`col-12 col-lg mb-2 mb-lg-0 ${styles.author}`}>
                                <i className="icon-pokeball me-2"></i>
                                <span>Jean</span>
                            </div>
                            <div className="col-12 col-lg mb-2 mb-lg-0">
                                <a href="mailto:example@example.com">
                                    <i className="bi bi-google me-2"></i>gmail</a>
                            </div>
                            <div className="col-12 col-lg mb-2 mb-lg-0">
                                <a href="https://github.com/lzx10111">
                                    <i className="bi bi-github me-2"></i>lzx10111</a>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-3 mb-2 mb-lg-0">
                        <img src="/src/assets/pikachu_running.gif" alt="pikachu_running_gif" />
                        <div className="row position-relative">
                            <div className="col-12 p-0">
                                <div className={`${styles.customHr} my-1 border-success`}></div>
                            </div>
                            <div className="col position-absolute">
                                <div className={`${styles.customHrAnimated} my-1`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}