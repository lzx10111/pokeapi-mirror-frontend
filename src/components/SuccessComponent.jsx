export default function SuccessComponent({ data }) {
    return (
        <div className="col-12">
            <i className="bi bi-check-circle text-success"></i>
            <span className="text-success">{data}</span>
        </div>
    )
}