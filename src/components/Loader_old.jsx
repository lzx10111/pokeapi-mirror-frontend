import '../styles/loader.css';
import { useState, useEffect } from "react"

export default function Loader() {
    const [marginSize, setMarginSize] = useState(null);

    useEffect(() => {
        const elem = document.getElementById("loader");
        listenerFunc()

        function listenerFunc() {
            const scrollBarSize = window.innerWidth - document.documentElement.offsetWidth;

            setMarginSize((window.innerWidth - elem.offsetWidth - scrollBarSize) / 2);
        }

        window.addEventListener("resize", listenerFunc);

        return function () {
            window.removeEventListener("resize", listenerFunc);
        }
    }, []);

    const myStyle = {
        marginLeft: `calc(${marginSize}px - 2.5rem)`
    }

    return (
        <>
            <div className="row m-0">
                <div className="col-5" id="loader" style={myStyle}>
                    {marginSize !== null ? <svg xmlns="http://www.w3.org/2000/svg" className="loader" viewBox="0 0 100 100">
                        <path d="M 30 50
                                    a 1 1 1 0 1 40 0
                                    h-12.5
                                    a 1 1 1 0 0 -15 0
                                    z"
                            fill="#f00" stroke="#222"
                        ></path>
                        <circle
                            cx="50"
                            cy="50"
                            r="5"
                            fill="#222" stroke="#222"
                        ></circle>
                        <path d="M 30 50
                                    a 1 1 1 0 0 40 0
                                    h-12.5
                                    a 1 1 1 0 1 -15 0
                                    z"
                            fill="#fff" stroke="#222"
                        ></path>
                    </svg> : null}
                </div>
            </div>
        </>
    )
}