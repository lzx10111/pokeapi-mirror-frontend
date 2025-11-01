import { useState, useEffect } from 'react';
import { useKeycloak } from "@react-keycloak/web";

export default function Login() {
    const { keycloak } = useKeycloak();
    // const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/api/user/me", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => { console.log(data); console.log(keycloak.resourceAccess["pkm-client"].roles.map(x => `ROLE_${x}`)) });
    }, []);

    return (
        <div className="login">
            <button>Login</button>
        </div>
    )
}