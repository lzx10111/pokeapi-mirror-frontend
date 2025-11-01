export default function Modal(props) {
    return (
        <>
            <div className="modal" id="myModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {props.comp}
                    </div>
                </div>
            </div>
        </>
    )
}