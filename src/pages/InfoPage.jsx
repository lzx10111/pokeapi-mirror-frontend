import HeaderContent from '../contents/header/HeaderContent';
import FooterContent from '../contents/footer/FooterContent';
import ProfilePokemon from '../components/ProfilePokemon';
import { useState, useEffect } from 'react';
import { useKeycloak } from "@react-keycloak/web";
import { useParams } from 'react-router'

export default function InfoPage() {
    const { keycloak } = useKeycloak();
    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        fetch(`/api/pokemon/${id}`, {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                setPokemonData(data);
            });
    }, []);

    return (
        <>
            <HeaderContent />
            {pokemonData !== null ? <ProfilePokemon pokemonData={pokemonData} /> : null}
            <FooterContent />
        </>
    )
}