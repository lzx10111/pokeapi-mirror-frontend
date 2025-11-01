import { useState, useEffect } from 'react';
import { useKeycloak } from "@react-keycloak/web";

export default function useFavorite(props) {
    const { keycloak } = useKeycloak();
    const [isStarted, setIsStarted] = useState(false);
    const [id, setId] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (isStarted) {
            fetch("http://localhost:8090/api/user/addFavorite",
                {
                    method: "POST",
                    body: JSON.stringify({
                        "id": id
                    }),
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(res => res.json())
                .then(data => setIsFavorite(Boolean(Number(data.isFavorite)))
                );
            
            setIsStarted(false);
            props.isReady(true);
        }
    }, [isStarted]);

    console.log(isFavorite)

    return [isFavorite, setIsStarted, setId, setIsFavorite];
}