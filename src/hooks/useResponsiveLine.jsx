import { useState, useEffect } from 'react';

export default function useResponsiveLine() {
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(null);

    useEffect(() => {
        function actualBreakPoint() {
            if (window.matchMedia("(max-width: 575.98px)").matches) {
                return "xs";
            }

            if (window.matchMedia("(min-width: 576px) and (max-width: 767.98px)").matches) {
                return "sm";
            }

            if (window.matchMedia("(min-width: 768px) and (max-width: 991.98px)").matches) {
                return "md";
            }

            if (window.matchMedia("(min-width: 992px) and (max-width: 1199.98px)").matches) {
                return "lg";
            }

            if (window.matchMedia("(min-width: 1200px) and (max-width: 1399.98px)").matches) {
                return "xl";
            }

            if (window.matchMedia("(min-width: 1400px)").matches) {
                return "xxl";
            }
        }

        function isNavbarCollapsedByBreakPoint() {
            const bp = actualBreakPoint();

            if (bp === "xs" || bp === "sm" || bp === "md") {
                setIsNavbarCollapsed(true);
            }
            else {
                setIsNavbarCollapsed(false);
            }
        }

        isNavbarCollapsedByBreakPoint();

        window.addEventListener("resize", isNavbarCollapsedByBreakPoint);

        return function () {
            window.removeEventListener("resize", isNavbarCollapsedByBreakPoint);
        }
    }, []);

    return isNavbarCollapsed;
}