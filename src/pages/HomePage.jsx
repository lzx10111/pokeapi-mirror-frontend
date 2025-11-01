import HeaderContent from '../contents/header/HeaderContent';
import FooterContent from '../contents/footer/FooterContent';
import styles from '../styles/homePage.module.css';

export default function HomePage() {
    return (
        <>
            <HeaderContent />
            <main className="py-5">
                <div className={`container d-flex align-items-center justify-content-center ${styles["home-bg"]}`}>
                    <h1 className="text-center">Welcome to PokeApi Mirror!</h1>
                </div>
            </main>
            <FooterContent />
        </>
    )
}