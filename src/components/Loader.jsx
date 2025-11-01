import styles from '../styles/loader.module.css';

export default function Loader({ className }) {

    return (
        <>
            <div className={`row m-0 align-items-center justify-content-center${className !== undefined ? " ".concat(className) : ""}`}>
                <div className="col-8 col-lg-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.loader} viewBox="0 0 100 100">
                        <path d="M 30 50
                                    a 1 1 1 0 1 40 0
                                    h-12.5
                                    a 1 1 1 0 0 -15 0
                                    z"
                            fill="#f00" stroke="#222"
                        ></path>
                        <circle
                            cx="50"
                            cy="50"
                            r="5"
                            fill="#222" stroke="#222"
                        ></circle>
                        <path d="M 30 50
                                    a 1 1 1 0 0 40 0
                                    h-12.5
                                    a 1 1 1 0 1 -15 0
                                    z"
                            fill="#fff" stroke="#222"
                        ></path>
                    </svg>
                </div>
            </div>
        </>
    )
}