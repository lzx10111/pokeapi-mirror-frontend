export default function InfoForm(props) {
    
    function handleSubmit(formData) {
        props.updateRotatePage(2);
        props.updatePokemonId(formData.get("id"));
    }

    return (
        <>
            <form action={handleSubmit}>
                <input type="hidden" defaultValue={props.id} name="id"/>
                <button className="btn btn-Custom-Two ms-2 pt-0 pb-1" type="submit">
                    <i className="bi bi-eye-fill"></i></button>
            </form>
        </>
    )
}