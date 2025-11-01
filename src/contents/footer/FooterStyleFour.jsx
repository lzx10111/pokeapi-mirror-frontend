import CopyButton from '../../components/CopyButton';
import styles from '../../styles/footerStyleFour.module.css';

export default function FooterStyleFour() {
    return (
        <>
            <div className={`container ${styles.footerContainer} my-4 border rounded`}>
                <div className="row">
                    <div className={`col p-0 ${styles["icons-area"]}`}>
                        <div className="row text-center">
                            <div className="col-12 mt-4 px-0 position-relative">
                                <img src="/src/assets/pokemon-plataform.svg" className={`position-relative ${styles["icons-area-plataform"]}`} alt="" />
                                <div className={`position-absolute ${styles["icons-area-logo"]} top-0 start-50 translate-middle-x`}>
                                    <a href="https://spring.io/" target="_blank">
                                        <img src="/src/assets/spring-icon.svg" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 mt-4 px-0 position-relative">
                                <img src="/src/assets/pokemon-plataform.svg" className={`position-relative ${styles["icons-area-plataform"]}`} alt="" />
                                <div className={`position-absolute ${styles["icons-area-logo"]} top-0 start-50 translate-middle-x`}>
                                    <a href="https://es.react.dev/" target="_blank">
                                        <img src="/src/assets/react-icon.svg" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 mt-4 px-0 position-relative">
                                <img src="/src/assets/pokemon-plataform.svg" className={`position-relative ${styles["icons-area-plataform"]}`} alt="" />
                                <div className={`position-absolute ${styles["icons-area-logo"]} top-0 start-50 translate-middle-x`}>
                                    <a href="https://getbootstrap.com/" target="_blank">
                                        <img src="/src/assets/bootstrap-icon.svg" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 mt-4 px-0 position-relative">
                                <img src="/src/assets/pokemon-plataform.svg" className={`position-relative ${styles["icons-area-plataform"]}`} alt="" />
                                <div className={`position-absolute ${styles["icons-area-logo"]} top-0 start-50 translate-middle-x`}>
                                    <a href="https://mysql.com/" target="_blank">
                                        <img src="/src/assets/mysql-icon.svg" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 mt-4 px-0 position-relative">
                                <img src="/src/assets/pokemon-plataform.svg" className={`position-relative ${styles["icons-area-plataform"]}`} alt="" />
                                <div className={`position-absolute ${styles["icons-area-logo"]} top-0 start-50 translate-middle-x`}>
                                    <a href="https://vite.dev/" target="_blank">
                                        <img src="/src/assets/vitejs-icon.svg" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row gy-3 my-4 text-center">
                            <div className={`col-12 mb-2 mb-lg-0 py-2 ${styles["field-data"]}`}>
                                <span>Author: Jean</span>
                                <CopyButton text={"Jean"} checkClassName={styles["check-complete"]} />
                            </div>
                            <div className={`col-12 mb-2 mb-lg-0 py-2 ${styles["field-data"]}`}>
                                <span>Email: email@gmail.com</span>
                                <CopyButton text={"email@gmail.com"} checkClassName={styles["check-complete"]} />
                            </div>
                            <div className={`col-12 mb-2 mb-lg-0 py-2 ${styles["field-data"]}`}>
                                <span>Github: https://github.com/lzx10111</span>
                                <CopyButton text={"https://github.com/lzx10111"} checkClassName={styles["check-complete"]} />
                            </div>
                            <div className={`col-12 mb-2 ${styles["field-info"]}`}>
                                <span className="text-decoration-underline">Descripcion</span><br />
                                <span>Una aplicacion web basada en PokeApi</span>
                            </div>
                            <div className={`col-12 mb-2 ${styles["field-info"]}`}>
                                <span className="text-decoration-underline">Objetivo</span><br />
                                <span>Aprender de frontend y backend</span>
                            </div>
                            <div className={`col-12 ${styles["field-stack"]} justify-content-center`}>
                                <span className="text-decoration-underline">Stack</span><br />
                                <ul>
                                    <li>Spring boot</li>
                                    <li>MySQL</li>
                                    <li>React</li>
                                    <li>Bootstrap</li>
                                </ul>
                            </div>
                            <div className={`col-12 ${styles["last-field-data"]}`}>
                                <span className={styles["custom-silver-style"]}>PokeApi Mirror / 2024 - 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}