import { useState, useEffect } from 'react';
import { useKeycloak } from "@react-keycloak/web";
import { NavLink } from 'react-router'

export default function TableBodyPokemon(props) {
    const { keycloak } = useKeycloak();
    const [isStarted, setIsStarted] = useState(true);
    const [isFavorite, setIsFavorite] = useState(props.isFavorite);
    const [ref, setRef] = useState(null);

    useEffect(() => {
        if (!isStarted) {
            fetch("/api/user/add_favorite",
                {
                    method: "POST",
                    body: JSON.stringify({
                        "id": props.obj.id
                    }),
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(res => res.json())
                .then(data => {
                    setIsFavorite(Boolean(Number(data.isFavorite)));
                    setIsStarted(true);
                });
        }
    }, [isStarted]);

    useEffect(() => {
        if (ref !== null) {
            const list = ref.querySelectorAll("i.bi.bi-dash");

            handleMouseOut();

            function handleMouseOver() {
                for (let i = 0; i < list.length; i++) {
                    list[i].style.visibility = "visible";
                }
            }

            function handleMouseOut() {
                for (let i = 0; i < list.length; i++) {
                    list[i].style.visibility = "hidden";
                }
            }

            ref.addEventListener("mouseover", handleMouseOver);
            ref.addEventListener("mouseout", handleMouseOut);
        }
    }, [ref]);

    function handleClick() {
        setIsStarted(false);
    }

    return (
        <>
            <tr>
                <td>{props.obj.id}</td>
                <td>{props.obj.name}</td>
                <td>{props.obj.height}</td>
                <td>{props.obj.weight}</td>
                <td>{props.obj.base_experience}</td>
                <td>
                    <div onClick={handleClick} className="favorite d-inline-block" ref={newRef => setRef(newRef)}>
                        <i className="bi bi-dash"></i>
                        <i className={isFavorite ? "bi bi-star-fill" : "bi bi-star"}></i>
                        <i className="bi bi-dash"></i>
                        <input type="hidden" />
                    </div>
                </td>
                <td>
                    <NavLink to={`/pokemon/${props.obj.id}`} className={"btn btn-Custom-Two ms-2 pt-0 pb-1"}><i className="bi bi-eye-fill"></i></NavLink>
                </td>
            </tr>
        </>
    )
}