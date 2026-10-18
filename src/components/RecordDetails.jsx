import { Link, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { KINDS } from "../data/sampleData";

export default function RecordDetails({ kind, base }) {
  const cfg = KINDS[kind];
  const { id } = useParams();
  const item = useData()[kind].find((x) => String(x.id) === id);

  if (!item) return <div className="alert alert-warning">That record was not found. <Link to={`${base}/${kind}`}>Back to list</Link></div>;

  return (
    <div className="card border-0 shadow-sm" style={{ maxWidth: 560 }}>
      <div className="card-body">
        <h2 className="h4">{item.name}</h2>
        <div className="mb-3">
          {cfg.fields.filter(([k]) => k !== "name").map(([k, label]) => (
            <div className="row mb-1" key={k}><div className="col-5 fw-semibold">{label}</div><div className="col-7">{item[k]}</div></div>
          ))}
          <div className="row"><div className="col-5 fw-semibold">Added on</div><div className="col-7">{item.addedOn}</div></div>
        </div>
        <Link to={`${base}/${kind}/${item.id}/edit`} className="btn btn-primary me-2">Edit</Link>
        <Link to={`${base}/${kind}`} className="btn btn-outline-secondary">Back</Link>
      </div>
    </div>
  );
}
