import SuccessComponent from './SuccessComponent';
import ErrorComponent from './ErrorComponent';
import EditionLoading from './EditionLoading';
import { useState, useEffect } from 'react';
import { useKeycloak } from "@react-keycloak/web";

export default function EditionForm(props) {
    const { keycloak } = useKeycloak();
    const [isChanged, setIsChanged] = useState(false);
    const [formData, setFormData] = useState(null);
    const [successValidationData, setSuccessValidationData] = useState(null);
    const [errorValidationData, setErrorValidationData] = useState([]);
    const myClassName = `bi ${props.obj.buttonSvg} me-1`

    useEffect(() => {
        if (isChanged) {

            function disabled(value) {
                for (let i = 0; i < 4; i++) {
                    let elem = document.getElementById(`button-update-${i}`);
                    
                    if (value === "true") {
                        elem.setAttribute("disabled", value); 
                    }
                    
                    if (value === "false") {
                        elem.removeAttribute("disabled");
                    }
                }
            }

            disabled("true");

            fetch(`/api/admin/${props.obj.u}`,
                {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(res => res.json().then(data => ({ status: res.status, body: data })))
                .then(data => {
                    if (data.status === 200) {
                        setSuccessValidationData(data.body);
                        setErrorValidationData([]);
                    } else {
                        setErrorValidationData(data.body);
                        setSuccessValidationData(null);
                    }

                    disabled("false");
                    setIsChanged(false);
                });
        }
    }, [isChanged]);

    function handleSubmit(formData) {
        let obj = {};

        formData.forEach((value, key) => {
            if (props.obj.inputName1 === key && props.obj.inputName1.includes("group")) {
                return obj["start"] = value;
            }

            if (props.obj.inputName2 === key && props.obj.inputName1.includes("group")) {
                return obj["end"] = value;
            }

            if (props.obj.inputName1 === key && props.obj.inputName1.includes("specific")) {
                return obj["id"] = value;
            }

            if (props.obj.inputName2 === key && props.obj.inputName1.includes("specific")) {
                return obj["name"] = value;
            }
        });

        setFormData(obj);
        setIsChanged(true);
    }

    return (
        <>
            <div className="row">
                <div className="col pt-1 pb-1 bg-primary fw-semibold rounded-top">{props.obj.labelTitle}</div>
            </div>
            <form action={handleSubmit}>
                <div className="row pt-3 pb-3">
                    <div className="col">
                        <label htmlFor={props.obj.inputName1} className="form-label">{props.obj.labelText1}</label>
                        <input type="text" className="form-control" name={props.obj.inputName1} id={props.obj.inputName1} />
                    </div>
                    <div className="col">
                        <label htmlFor={props.obj.inputName2} className="form-label">{props.obj.labelText2}</label>
                        <input type="text" className="form-control" name={props.obj.inputName2} id={props.obj.inputName2} />
                    </div>
                    <div className="col">
                        <label htmlFor={`button-update-${props.i}`} className="form-label">&nbsp;</label>
                        <button type="submit" className="btn d-block form-control btn-primary" id={`button-update-${props.i}`}>
                            <i className={myClassName}></i>{props.obj.labelTitle}
                        </button>
                    </div>
                </div>
            </form>
            <div className="row pt-3 pb-3">
                <div className="col-12">
                    <i className="bi bi-info-circle"></i>
                    <span>{props.obj.labelTextInfo}</span>
                </div>
                {errorValidationData.length !== 0 ? <ErrorComponent data={errorValidationData} divClass={"col-12"} /> : null}
                {successValidationData !== null ? <SuccessComponent data={"".concat(props.obj.successMsg[0], successValidationData.total, props.obj.successMsg[1])} /> : null}
                {isChanged ? <EditionLoading /> : null}
            </div>
        </>
    )
}