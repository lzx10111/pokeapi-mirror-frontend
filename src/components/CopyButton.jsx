import { useState, useEffect } from 'react';

export default function CopyButton(props) {
    const [isVisible, setIsVisible] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (isChanged) {
            setTimeout(() => {
                setIsVisible(false);
            }, 2000);

            setIsChanged(false);
        }
    }, [isChanged]);

    function handleClick() {
        navigator.clipboard.writeText(props.text);
        setIsVisible(true);
        setIsChanged(true);
    }

    return (
        <button onClick={() => handleClick()} className="btn ms-1 p-0 position-relative">
            <i className="bi bi-copy px-1"></i>
            {isVisible ? <i className={`bi bi-check ${props.checkClassName} position-absolute top-0 start-100 translate-middle`}></i> : null}
        </button>
    )
}