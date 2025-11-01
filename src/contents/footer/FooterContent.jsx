import FooterStyleOne from "./FooterStyleOne"
import FooterStyleTwo from "./FooterStyleTwo";
import FooterStyleThree from "./FooterStyleThree";
import FooterStyleFour from "./FooterStyleFour";
import PaginationFooter from "../../components/PaginationFooter";
import usePagination from "../../hooks/usePagination";
import { useState, useEffect, useRef } from "react"

export default function FooterContent() {
    const [numberStyle, setNumberStyle] = useState(4);
    const [isChanged, setIsChanged] = useState(false);
    const refContent = useRef(null);
    const myPagination = usePagination({
        totalPages: 4, totalButtonPages: 3, isReady: function (params) {
            updateIsChanged(params);
        }
    });

    useEffect(() => {
        if (isChanged && refContent != null) {
            setNumberStyle(myPagination[3]);
            refContent.current.scrollIntoView({ behavior: "instant" });
            setIsChanged(false);
        }
    }, [isChanged]);

    const updateIsChanged = (state) => {
        setIsChanged(state);
    }

    return (
        <>
            <footer>
                {numberStyle === 1 ? <FooterStyleOne /> : null}
                {numberStyle === 2 ? <FooterStyleTwo /> : null}
                {numberStyle === 3 ? <FooterStyleThree /> : null}
                {numberStyle === 4 ? <FooterStyleFour /> : null}
                <PaginationFooter refContent={refContent} myPagination={myPagination} />
            </footer>
        </>
    )
}