import ErrorComponent from './ErrorComponent';

export default function FilterPokemon(props) {

    function handleSubmit(formData) {
        let obj = {};

        formData.forEach((value, key) => {
            switch (key) {
                case "nameFilter":
                    return obj["name"] = value;
                case "idFilter":
                    return obj["id"] = value;
                case "heightFilterMax":
                    return obj["height_max"] = value;
                case "heightFilterMin":
                    return obj["height_min"] = value;
                case "weightFilterMax":
                    return obj["weight_max"] = value;
                case "weightFilterMin":
                    return obj["weight_min"] = value;
            }
        });

        const isEmpty = Object.values(obj).every(x => x === null || x === '');

        if (isEmpty) {
            props.updateFilterObject(null);
        } else {
            props.updateFilterObject(obj);
        }

        props.updateIsStarted(true);
        props.updateIsChanged(true);
    }

    return (
        <>
            <div className="accordion ms-4 me-4 mt-4" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed pt-1 pb-2 fw-semibold rounded-top" type="button"
                            data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false"
                            aria-controls="collapseOne">{`Filtros de Búsqueda (Resultados encontrados: ${props.totalElements})`}</button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse ps-3 pe-3 rounded-bottom" data-bs-parent="#accordionExample">
                        <form action={handleSubmit}>
                            <div className="row pt-3 pb-3 m-0">
                                <div className="col-6 col-lg ps-0 ps-lg-3">
                                    <label htmlFor="nameFilter" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" name="nameFilter" id="nameFilter" />
                                </div>
                                <div className="col-6 col-lg pe-0 pe-lg-3">
                                    <label htmlFor="idFilter" className="form-label">ID</label>
                                    <input type="text" th:field="*{idFilter}" className="form-control" name="idFilter" id="idFilter" />
                                </div>
                                <div className="col-12 col-lg mx-0 mx-lg-2 mt-4 mt-lg-0 border rounded overflow-hidden">
                                    <div className="row py-3">
                                        <div className="col-12 mb-2">
                                            <label htmlFor="heightFilterMax" className="form-label">Altura</label>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" className="form-control" placeholder="Max" name="heightFilterMax"
                                                id="heightFilterMax" />
                                        </div>
                                        <div className="col-6">
                                            <input type="text" className="form-control" placeholder="Min" name="heightFilterMin"
                                                id="heightFilterMin" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg mx-0 mx-lg-2 mt-4 mt-lg-0 border rounded overflow-hidden">
                                    <div className="row py-3">
                                        <div className="col-12 mb-2">
                                            <label htmlFor="weightFilterMax" className="form-label">Peso</label>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" className="form-control" placeholder="Max" name="weightFilterMax"
                                                id="weightFilterMax" />
                                        </div>
                                        <div className="col-6">
                                            <input type="text" className="form-control" placeholder="Min" name="weightFilterMin"
                                                id="weightFilterMin" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="btn-search" className="form-label">&nbsp;</label>
                                    <button type="submit" className="btn btn-customColor d-block form-control" id="btn-search">
                                        <i className="bi bi-search me-1 mb-1"></i>Buscar
                                    </button>
                                </div>
                            </div>
                            {props.errorValidationData.length !== 0 ? <div className="row pt-3 pb-3">
                                <ErrorComponent data={props.errorValidationData} format={0} divClass={"col-12 col-lg-6 text-danger"} />
                                <div className="col-12 col-lg-6 text-center text-lg-start">
                                    <img src="./src/assets/pikachu_sad.gif" alt="pikachu_sad_gif" />
                                </div>
                            </div> : null}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}