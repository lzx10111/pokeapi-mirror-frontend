import HeaderContent from '../contents/header/HeaderContent';
import FooterContent from '../contents/footer/FooterContent';
import FilterPokemon from '../components/FilterPokemon';
import TablePokemon from '../components/TablePokemon';
import Modal from '../components/Modal';
import usePagination from '../hooks/usePagination';
import { useState, useEffect } from 'react';
import { useKeycloak } from "@react-keycloak/web";

export default function IndexPage() {
    const { keycloak } = useKeycloak();
    const [isStarted, setIsStarted] = useState(true);
    const [isChanged, setIsChanged] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [filterObject, setFilterObject] = useState(null);
    const [errorValidationData, setErrorValidationData] = useState([]);
    const [modalContent, setModalContent] = useState(null);
    const myPagination = usePagination({
        isStarted: false, isReady: function (params) {
            updateIsChanged(params);
        }
    });

    useEffect(() => {
        if (isChanged && filterObject === null) {
            fetch(`/api/pokemon/find?page=${isStarted ? 1 : myPagination[3]}&elements_per_page=10`, {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json().then(data => ({ status: res.status, body: data })))
                .then(data => {
                    if (!(data.status === 200)) {
                        setErrorValidationData(data.body);
                        setTableData([]);
                        setFilterObject(null);
                        setTotalElements(0);
                        myPagination[5](1, 1);
                    } else {
                        setErrorValidationData([]);
                        setTableData(data.body.content);

                        if (isStarted) {
                            if (data.body.totalPages === 0) {
                                myPagination[5](1, 1);
                            } else {
                                myPagination[5](data.body.totalPages, 6);
                            }

                            setTotalElements(data.body.totalElements);
                        }
                    }
                });

            setIsStarted(false);
            setIsChanged(false);
        }
    }, [isChanged]);

    useEffect(() => {
        if (isChanged && filterObject !== null) {
            fetch("/api/pokemon/find/filter?".concat(new URLSearchParams({ ...filterObject, page: isStarted ? 1 : myPagination[3], elements_per_page: 10 }).toString()), {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json().then(data => ({ status: res.status, body: data })))
                .then(data => {
                    if (!(data.status === 200)) {
                        setErrorValidationData(data.body);
                        setTableData([]);
                        setFilterObject(null);
                        setTotalElements(0);
                        myPagination[5](1, 1);
                    } else {
                        setErrorValidationData([]);
                        setTableData(data.body.content);

                        if (isStarted) {
                            if (data.body.totalPages === 0) {
                                myPagination[5](1, 1);
                            } else {
                                myPagination[5](data.body.totalPages, data.body.totalPages);
                            }

                            setTotalElements(data.body.totalElements);
                        }
                    }
                });

            setIsStarted(false);
            setIsChanged(false);
        }
    }, [isChanged]);

    const updateIsStarted = (state) => {
        setIsStarted(state);
    }

    const updateIsChanged = (state) => {
        setIsChanged(state);
    }

    const updateFilterObject = (state) => {
        setFilterObject(state);
    }

    const updateModalContent = (state) => {
        setModalContent(state);
    }

    return (
        <>
            <HeaderContent />
            <main>
                <Modal comp={modalContent} />
                <FilterPokemon totalElements={totalElements} updateIsStarted={updateIsStarted} updateIsChanged={updateIsChanged} updateFilterObject={updateFilterObject}
                    errorValidationData={errorValidationData} />
                <TablePokemon tableData={tableData} updateModalContent={updateModalContent}
                    isStarted={isStarted} myPagination={myPagination} />
            </main>
            <FooterContent />
        </>
    )
}