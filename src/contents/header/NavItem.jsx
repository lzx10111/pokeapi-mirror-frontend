import useResponsiveLine from "../../hooks/useResponsiveLine";
import { useState, useEffect } from 'react';
import { useKeycloak } from "@react-keycloak/web";
import { NavLink } from 'react-router';

export default function NavItem(props) {
    const { keycloak } = useKeycloak();
    const isNavbarCollapsed = useResponsiveLine();
    const [isClicked, setIsClicked] = useState(false);
    const [actualElement, setActualElement] = useState(null);

    // useEffect(() => {
    //     const element = document.querySelector(".navbar-nav li.nav-item a");
    //     element.classList.add("active");
    //     element.classList.add("fw-bold");
    //     element.setAttribute("aria-current", "true");
    // }, []);

    // useEffect(() => {
    //     if (isClicked) {
    //         const list = document.querySelectorAll(".navbar-nav li.nav-item a");

    //         for (let i = 0; i < list.length; i++) {
    //             if (list[i].classList.contains("active")) {
    //                 list[i].classList.remove("active");
    //                 list[i].classList.remove("fw-bold");
    //                 list[i].removeAttribute("aria-current");
    //             }
    //         }
            
    //         actualElement.classList.add("active");
    //         actualElement.classList.add("fw-bold");
    //         actualElement.setAttribute("aria-current", "true");

    //         setActualElement(null);
    //         setIsClicked(false);
    //         props.updateRotatePage(props.pageId);
    //     }
    // }, [isClicked]);


    // function handleClick(event) {
    //     setActualElement(event.currentTarget);
    //     setIsClicked(true);
    // }

    return (
        <>
            {props.showLine ? <li>
                <div className={isNavbarCollapsed ? "customHrNavbar" : "vr h-100"}></div>
            </li> : null}
            {(!keycloak.authenticated && props.pageId === 1) ? <li className="nav-item"><a onClick={() => keycloak.login({ redirectUri: window.location.origin + '/index' })} className="nav-link p-2" href="#">{props.nameItem}</a></li> : null}
            {(!keycloak.authenticated && props.pageId === 2) ? <li className="nav-item"><a onClick={() => keycloak.register()} className="nav-link p-2" href="#">{props.nameItem}</a></li> : null}
            {(keycloak.authenticated && props.pageId === 3) ? <li className="nav-item"><NavLink to={"/index"} className={"nav-link p-2"}>{props.nameItem}</NavLink></li> : null}
            {(keycloak.authenticated && props.pageId === 4) ? <li className="nav-item"><NavLink to={"/edition"} className={"nav-link p-2"}>{props.nameItem}</NavLink></li> : null}
            {(keycloak.authenticated && props.pageId === 5) ? <li className="nav-item"><a onClick={() => keycloak.accountManagement()} className="nav-link p-2" href="#">{props.nameItem}</a></li> : null}
            {(keycloak.authenticated && props.pageId === 6) ? <li className="nav-item"><a onClick={() => keycloak.logout({ redirectUri: window.location.origin + '/' })} className="nav-link p-2" href="#">{props.nameItem}</a></li> : null}
        </>
    )
}