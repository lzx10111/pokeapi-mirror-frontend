import HomePage from './pages/HomePage.jsx';
import IndexPage from './pages/IndexPage';
import InfoPage from './pages/InfoPage';
import EditionPage from './pages/EditionPage';
import SecurePage from './pages/SecurePage';
import NotFoundPage from './pages/NotFoundPage.jsx';
import keycloak from './keycloak.js';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css';

export default function App() {
    // onLoad: 'login-required' / Automaticamente se redirige a la pagina de iniciar sesion si el usuario no es autenticado...
    // initOptions={{checkLoginIframe: false}

    return (
        <>
            <ReactKeycloakProvider authClient={keycloak}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/index" element={<SecurePage pageRole={"ROLE_USER"} ><IndexPage /></SecurePage>} />
                        <Route path="/edition" element={<SecurePage pageRole={"ROLE_ADMIN"} ><EditionPage /></SecurePage>} />
                        <Route path="/pokemon/:id" element={<SecurePage pageRole={"ROLE_USER"} ><InfoPage /></SecurePage>} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </ReactKeycloakProvider>
        </>
    )
}