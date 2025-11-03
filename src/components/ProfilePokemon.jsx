import styles from '../styles/infoPage.module.css';
import { useState, useEffect } from 'react';
import { useKeycloak } from "@react-keycloak/web";

export default function ProfilePokemon(props) {
    const { keycloak } = useKeycloak();
    const [isChanged, setIsChanged] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (isChanged) {
            const getIsFavorite = async () => {
                try {
                    const response = await fetch("/api/user/add_favorite",
                        {
                            method: "POST",
                            body: JSON.stringify({
                                "id": props.pokemonData.id.toString()
                            }),
                            headers: {
                                'Authorization': `Bearer ${keycloak.token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    const result = await response.json();
                    setIsFavorite(result.isFavorite);
                    getTotal();
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }

            const getTotal = async () => {
                try {
                    const response = await fetch(`/api/pokemon/total_count/${props.pokemonData.id}`, {
                        headers: {
                            'Authorization': `Bearer ${keycloak.token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    const result = await response.json();
                    setTotalCount(result);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }

            getIsFavorite();
            setIsChanged(false);
        }
    }, [isChanged]);

    useEffect(() => {
        fetch(`/api/pokemon/total_count/${props.pokemonData.id}`, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setTotalCount(data));
    }, []);

    useEffect(() => {
        fetch(`/api/user/is_user_favorite/${props.pokemonData.id}`, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setIsFavorite(data.isFavorite));
    }, []);

    useEffect(() => {
        const img1 = document.getElementById("img-carousel-front-default");
        const img2 = document.getElementById("img-carousel-front-shiny");
        const myCarousel = document.getElementById('carouselExample')

        function onImgError(img, fn) {
            if (img.complete) {
                if (!img.naturalWidth || !img.naturalHeight) {
                    fn(new Error("Image not loaded"))
                }
            }
            img.addEventListener('error', fn)
        }

        function onImgErrorForSlide(img) {
            if (img.complete) {
                if (!img.naturalWidth || !img.naturalHeight) {
                    img.setAttribute("src", "/src/assets/no-image-available.svg");
                    img.classList.add("p-4");
                }
            }
        }

        onImgError(img1, (e) => {
            img1.setAttribute("src", "/src/assets/no-image-available.svg");
            img1.classList.add("p-4");
        })
        onImgError(img2, (e) => {
            img2.setAttribute("src", "/src/assets/no-image-available.svg");
            img2.classList.add("p-4");
        })

        myCarousel.addEventListener('slide.bs.carousel', onImgErrorForSlide(img1));
        myCarousel.addEventListener('slide.bs.carousel', onImgErrorForSlide(img2));
    }, []);

    const elements = props.pokemonData.abilities.map((x, index) => <li key={index}>{x.ability.name}</li>);

    function handleClick() {
        setIsChanged(true);
    }

    return (
        <>
            <main>
                <div className="container my-4 border rounded">
                    <div className="my-5">
                        <div className={`mx-auto ${styles["pokemon-profile-frame"]}`}>{props.pokemonData.name}</div>
                    </div>
                    <div className={`container mb-5 p-0 ${styles["container-carousel"]} justify-content-center rounded`}>
                        <div id="carouselExample" className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={props.pokemonData.sprites.other["official-artwork"].front_default} className="d-block w-100" alt="Pokemon image front default" id="img-carousel-front-default" />
                                </div>
                                <div className="carousel-item">
                                    <img src={props.pokemonData.sprites.other["official-artwork"].front_shiny} className="d-block w-100" alt="Pokemon image front shiny" id="img-carousel-front-shiny" />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className={`mx-auto ${styles["container-profile"]}`}>
                        <div className={`mx-auto my-3 px-5 ${styles["pokemon-profile-frame"]} w-100`}>
                            <div onClick={handleClick} className={`${styles.favorite} text-center fs-3`}>
                                <i className={isFavorite ? "bi bi-star-fill" : "bi bi-star"}></i>
                                <span>{` ${totalCount.totalCount}`}</span>
                            </div>
                        </div>
                        <div className={`mx-auto my-5 ${styles["pokemon-profile-frame"]}`}>
                            <span className='px-2 px-lg-5'>Habilidades</span>
                            <ul className={`${styles.listHabilities} fs-3 ps-0 text-center`}>
                                {elements}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}