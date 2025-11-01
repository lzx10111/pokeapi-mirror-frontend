import TableBodyPokemon from "./TableBodyPokemon";
import PaginationTable from "./PaginationTable";
import Loader from "./Loader";
import styles from '../styles/indexPage.module.css'
import { useState, useEffect } from "react"
import { useKeycloak } from "@react-keycloak/web";

export default function TablePokemon(props) {
    const { keycloak } = useKeycloak();
    const [userFavorites, setUserFavorites] = useState([]);

    useEffect(() => {
        fetch("/api/user/find_favorites", {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setUserFavorites(data));
    }, []);

    const tableBodyElements = props.tableData.map(x => <TableBodyPokemon key={x.id} obj={x}
        isFavorite={userFavorites.some(y => y.pokemonId === x.id)}
        updatePokemonId={props.updatePokemonId} />);

    const tbodyContent = content();

    function content() {
        if (props.isStarted) {
            return <tr>
                <td colSpan="7"><Loader className={styles["loader-row"]} /></td>
            </tr>;
        }
        else if (tableBodyElements !== null && tableBodyElements.length !== 0) {
            return tableBodyElements;
        }
        else {
            return <tr>
                <td colSpan="7" className="p-3 text-center">Ningún Pokémon ha sido encontrado.</td>
            </tr>;
        }
    }

    return (
        <>
            <div className="table-responsive mt-4 mx-4 p-2 border rounded">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Altura</th>
                            <th scope="col">Peso</th>
                            <th scope="col">Experiencia Base</th>
                            <th scope="col">Favorito</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbodyContent}
                    </tbody>
                </table>
                <PaginationTable myPagination={props.myPagination} />
            </div>
        </>
    )
}