import LoadingPage from "./LoadingPage";
import NotAuthorizedPage from "./NotAuthorizedPage";
import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router";
import Login from '../components/Login';

export default function SecurePage({ pageRole, children }) {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <LoadingPage />;
    }

    if (!keycloak.authenticated) {
        return <Navigate to="/" replace />;
    }

    const roles_grant = keycloak.resourceAccess["pkm-client"].roles.map(x => `ROLE_${x}`);

    if (!roles_grant.includes(pageRole)) {
        return <NotAuthorizedPage />;
    }

    return children;
}