import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { KINDS } from "../data/sampleData";

export default function RecordForm({ kind, base }) {
  const cfg = KINDS[kind];
  const { id } = useParams();
  const data = useData();
  const navigate = useNavigate();
  const existing = id ? data[kind].find((x) => String(x.id) === id) : null;

  const [values, setValues] = useState(() => {
    if (existing) return existing;
    const blank = {};
    cfg.fields.forEach(([k, , type, opts]) => (blank[k] = type === "select" ? opts[0] : ""));
    return blank;
  });
  const [errors, setErrors] = useState({});

  if (id && !existing) return <div className="alert alert-warning">That record was not found. <Link to={`${base}/${kind}`}>Back to list</Link></div>;

  const validate = () => {
    const e = {};
    if (values.name.trim().length < 3) e.name = "Enter a full name (at least 3 characters).";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Enter a valid email address.";
    if (!/^\d{10}$/.test(values.phone)) e.phone = "Phone must be exactly 10 digits.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    existing ? data.update(kind, existing.id, values) : data.add(kind, values);
    navigate(`${base}/${kind}`);
  };

  return (
    <div className="card border-0 shadow-sm" style={{ maxWidth: 560 }}>
      <div className="card-body">
        <h2 className="h4 mb-3">{existing ? "Edit" : "Add"} {cfg.label.toLowerCase()}</h2>
        <form onSubmit={handleSubmit} noValidate>
          {cfg.fields.map(([k, label, type, opts]) => (
            <div className="mb-3" key={k}>
              <label className="form-label">{label}</label>
              {type === "select" ? (
                <select className="form-select" value={values[k]} onChange={(e) => setValues({ ...values, [k]: e.target.value })}>
                  {opts.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input type={type} className={`form-control ${errors[k] ? "is-invalid" : ""}`} value={values[k]} onChange={(e) => setValues({ ...values, [k]: e.target.value })} />
              )}
              {errors[k] && <div className="invalid-feedback">{errors[k]}</div>}
            </div>
          ))}
          <button className="btn btn-success me-2">Save {cfg.label.toLowerCase()}</button>
          <Link to={`${base}/${kind}`} className="btn btn-outline-secondary">Cancel</Link>
        </form>
      </div>
    </div>
  );
}
