import { useState, useEffect } from "react";

export default function usePagination(props) {
    const [isStarted, setIsStarted] = useState(() => props.isStarted === undefined ? true : props.isStarted);
    const [isSynchronized, setIsSynchronized] = useState(false);
    const [totalPages, setTotalPages] = useState(() => props.totalPages === undefined ? 1 : props.totalPages);
    const [totalButtonPages, setTotalButtonPages] = useState(() => props.totalButtonPages === undefined ? 1 : props.totalButtonPages);
    const [actualPage, setActualPage] = useState(() => props.actualPage === undefined ? 1 : props.actualPage);
    const [next, setNext] = useState(() => props.next === undefined ? false : props.next);
    const [previous, setPrevious] = useState(() => props.previous === undefined ? false : props.previous);
    const [parity, setParity] = useState(() => handleParity(1, 1));
    const [evenShift, setEvenShift] = useState(() => props.evenShift === undefined ? "left" : props.evenShift);
    const [finalPages, setFinalPages] = useState([]);

    useEffect(() => {
        if (isStarted) {
            updatePagination();
            setIsStarted(false);

            if (isSynchronized && props.isReady !== undefined) {
                props.isReady(true);
            }
        }
    }, [isStarted]);

    function setInitialization(totalPages, totalButtonPages) {
        setTotalPages(totalPages);
        setTotalButtonPages(totalButtonPages);
        setParity(() => handleParity(totalPages, totalButtonPages));
        setActualPage(1);
        setIsSynchronized(false);
        setIsStarted(true);
    }

    function updatePagination() {
        if (actualPage === 1 && totalPages === 1) {
            setFinalPages([1]);
        }
        
        if (parity === "odd") {
            setFinalPages(() => handleOdd());

            if (next || previous) {
                setActualPage(() => handleButtonDirection());
            }

            setNext(false);
            setPrevious(false);
        }

        if (parity === "even") {
            setFinalPages(() => handleEven());

            if (next || previous) {
                setActualPage(() => handleButtonDirection());
            }

            setNext(false);
            setPrevious(false);
        }
    }

    function handleOdd() {
        let arr = [];
        let newActualPage = handleButtonDirection();
        let referencePage = newActualPage;
        let referenceTBP = totalButtonPages > totalPages ? totalPages : totalButtonPages;
        let remainder = (referenceTBP - 1) / 2;

        if (newActualPage < remainder + 1) {
            referencePage = remainder + 1;
        }

        if (newActualPage > totalPages - remainder) {
            referencePage = totalPages - remainder;
        }

        for (let i = referencePage - remainder; i < referencePage + remainder + 1; i++) {
            arr.push(i);
        }

        return arr;
    }

    function handleEven() {
        let arr = [];
        let newActualPage = handleButtonDirection();
        let referencePage = newActualPage;
        let referenceTBP = totalButtonPages > totalPages ? totalPages : totalButtonPages;
        let remainder = (referenceTBP - 2) / 2;
        let remainderLeft = evenShift === "left" ? remainder : remainder + 1;
        let remainderRight = evenShift === "right" ? remainder : remainder + 1;

        if (newActualPage < remainderLeft + 1) {
            referencePage = remainderLeft + 1;
        }

        if (newActualPage > totalPages - remainderRight) {
            referencePage = totalPages - remainderRight;
        }

        for (let i = referencePage - remainderLeft; i < referencePage + remainderRight + 1; i++) {
            arr.push(i);
        }

        return arr;
    }

    function handleButtonDirection() {
        if (next && actualPage !== totalPages) {
            return actualPage + 1;
        }

        if (previous && actualPage !== 1) {
            return actualPage - 1;
        }

        return actualPage;
    }

    function handleParity(totalPages, totalButtonPages) {
        let referenceTBP = totalButtonPages > totalPages ? totalPages : totalButtonPages;

        if (referenceTBP % 2 == 0) {

            return "even";
        }

        return "odd";
    }

    function handleClick(index) {
        setActualPage(index)
        setIsSynchronized(true);
        setIsStarted(true);
    }

    function handleNext() {
        setNext(true);
        setIsSynchronized(true);
        setIsStarted(true);
    }
    
    function handlePrevious() {
        setPrevious(true);
        setIsSynchronized(true);
        setIsStarted(true);
    }

    return [handleClick, handlePrevious, handleNext, actualPage, finalPages, setInitialization];
}