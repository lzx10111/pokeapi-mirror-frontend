export default function ErrorComponent(props) {
    const elements = getResult();

    function getResult() {
        if (isObject(props.data)) {
            return !isEmpty(props.data) ? formattedWithObject() : null;
        }

        if (isArray(props.data)) {
            return props.data.length !== 0 ? formattedWithArray() : null;
        }

        return null;
    }

    function formattedWithObject() {
        switch (props.format) {
            case 0:
                return fieldMsgToList(props.data.fieldMsg);
            case 1:
                return <li>{`Error (${props.data.fieldName}):`}<ul>{fieldMsgToList(props.data.fieldMsg)}</ul></li>;
            case 2:
                return <li>{`Error (${props.data.fieldName}): Valor rechazado (${fieldValueCorrector(props.data.fieldValue)}).`}<ul>{fieldMsgToList(props.data.fieldMsg)}</ul></li>;
            default:
                return fieldMsgToList(props.data.fieldMsg);
        }
    }

    function formattedWithArray() {
        switch (props.format) {
            case 0:
                return props.data.map((x) => fieldMsgToList(x.fieldMsg));
            case 1:
                return props.data.map((x, index) => <li key={index}>{`Error (${x.fieldName}):`}<ul>{fieldMsgToList(x.fieldMsg)}</ul></li>);
            case 2:
                return props.data.map((x, index) =>
                    <li key={index}>{`Error (${x.fieldName}): Valor rechazado (${fieldValueCorrector(x.fieldValue)}).`}<ul>{fieldMsgToList(x.fieldMsg)}</ul></li>);
            default:
                return props.data.map((x) => fieldMsgToList(x.fieldMsg));
        }
    }

    function fieldValueCorrector(value) {
        return value === "" ? undefined : value;
    }

    function fieldMsgToList(arr) {
        return arr.map((x, index) => <li key={index}>{x}</li>);
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
            <div className={props.divClass}>
                <ul>
                    {elements}
                </ul>
            </div>
        </>
    )
}