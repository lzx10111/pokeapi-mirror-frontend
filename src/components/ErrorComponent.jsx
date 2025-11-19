export default function ErrorComponent(props) {
    const elements = getResult();

    function getResult() {
        if (isObject(props.data)) {
            return !isEmpty(props.data) ? <div className={props.divClass}>{formattedWithObject(props.data)}</div> : null;
        }

        if (isArray(props.data)) {
            return props.data.length !== 0 ? formattedWithArray(props.data) : null;
        }

        return null;
    }

    function formattedWithObject(obj) {
        if (obj.fieldName === null && obj.fieldValue === null) {
            return (
                <>
                    <i className="bi bi-x-circle text-danger"></i>
                    <span className="text-danger"> {obj.fieldMsg}</span>
                </>
            );
        }

        if (obj.fieldValue === null) {
            return (
                <>
                    <i className="bi bi-x-circle text-danger"></i>
                    <span className="text-danger"> Error en <b>{obj.fieldName}</b>: {obj.fieldMsg}</span>
                </>
            );
        }

        if (obj.fieldName === null) {
            return (
                <>
                    <i className="bi bi-x-circle text-danger"></i>
                    <span className="text-danger"> Error con el valor <b>{obj.fieldValue}</b>: {obj.fieldMsg}</span>
                </>
            );
        }

        if (obj.fieldName !== null && obj.fieldValue !== null) {
            return (
                <>
                    <i className="bi bi-x-circle text-danger"></i>
                    <span className="text-danger"> Error en <b>{obj.fieldName}</b> con el valor <b>{obj.fieldValue}</b>: {obj.fieldMsg}</span>
                </>
            );
        }
    }

    function formattedWithArray(array) {
        return array.map((x, index) => <div key={index} className={props.divClass}>{formattedWithObject(x)}</div>);
    }

    function isObject(obj) {
        return obj != null && obj.constructor.name === "Object";
    }

    function isArray(obj) {
        return Array.isArray(obj);
    }

    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }

    return (
        <>
            {elements}
        </>
    )
}