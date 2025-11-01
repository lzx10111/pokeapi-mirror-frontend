import styles from '../styles/notFoundPage.module.css';
import { NavLink } from 'react-router';

export default function NotFoundPage() {
    return (
        <main>
            <div className="container mt-5 d-flex justify-content-center">
                <div className={`row pt-3 pb-4 justify-content-center text-center border rounded ${styles["row-width"]}`}>
                    <div className={`col-12 fs-1 ${styles.text}`}>
                        <div>Página no encontrada</div>
                    </div>
                    <div className="col-7 mt-3">
                        <img className="w-100" src="/src/assets/pikachu-searching.png" alt="Pikachu searching image" />
                    </div>
                    <div className="col-12 mt-2 fs-2">
                        <NavLink to={"/"} className={styles.text}>Volver al inicio</NavLink>
                    </div>
                </div>
            </div>
        </main>
    )
}