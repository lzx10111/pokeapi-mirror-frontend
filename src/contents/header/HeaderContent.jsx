import NavItem from "./NavItem";
import navItemsData from "./navItemData";
import { useKeycloak } from "@react-keycloak/web";
import { useRef } from "react";
import { NavLink } from 'react-router';

export default function HeaderContent() {
    const { keycloak, initialized } = useKeycloak();
    const data = useRef(navItemsData);

    const elements = data.current.filter(x => isAllowed(x.pageId, x.role))
        .map((x, index) => {
            if (index === 0) {
                return <NavItem key={index} nameItem={x.nameItem} pageId={x.pageId} showLine={false} />
            }
            else {
                return <NavItem key={index} nameItem={x.nameItem} pageId={x.pageId} showLine={true} />
            }
        });

    function isAllowed(pageId, role) {
        let roles_grant = []

        if (initialized && keycloak.authenticated) {
            roles_grant = keycloak.resourceAccess["pkm-client"].roles.map(x => `ROLE_${x}`)
        }
        else {
            roles_grant = ["ROLE_ANONYMOUS"]
        }

        if (!keycloak.authenticated && pageId === 1) {
            return true;
        }

        if (!keycloak.authenticated && pageId === 2) {
            return true;
        }

        if (keycloak.authenticated && pageId === 3 && roles_grant.includes(role)) {
            return true;
        }

        if (keycloak.authenticated && pageId === 4 && roles_grant.includes(role)) {
            return true;
        }

        if (keycloak.authenticated && pageId === 5 && roles_grant.includes(role)) {
            return true;
        }

        if (keycloak.authenticated && pageId === 6 && roles_grant.includes(role)) {
            return true;
        }

        return false;
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-bg-customColor">
                    <div className="container-fluid navbar-bg-customColor">
                        <NavLink to={"/"} className={"navbar-brand"}>
                            <img src="/src/assets/pokeapi_logo.png" alt="PokéApi Logo" />
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse navbar-bg-customColor" id="navbarNavDropdown">
                            <ul className="navbar-nav mt-3 mb-2 mt-lg-0 mb-lg-0 ms-auto">
                                {elements}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}