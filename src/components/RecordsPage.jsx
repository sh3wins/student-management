import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { KINDS } from "../data/sampleData";
import useTable from "../hooks/useTable";

export default function RecordsPage({ kind, base }) {
  const cfg = KINDS[kind];
  const data = useData();
  const t = useTable(data[kind], cfg.filterKey);
  const cols = cfg.fields.filter(([k]) => k !== "phone");

  const onDelete = (r) => window.confirm(`Delete ${r.name}?`) && data.remove(kind, r.id);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 m-0">{cfg.plural}</h2>
        <Link to={`${base}/${kind}/new`} className="btn btn-success">Add {cfg.label.toLowerCase()}</Link>
      </div>
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-6">
          <input className="form-control" placeholder="Search by name or email" value={t.search} onChange={(e) => t.setSearch(e.target.value)} />
        </div>
        <div className="col-12 col-md-4">
          <select className="form-select" value={t.filter} onChange={(e) => t.setFilter(e.target.value)}>
            <option value="">{cfg.filterLabel}</option>
            {cfg.filterOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      {t.total === 0 ? (
        <div className="alert alert-info">No {cfg.plural.toLowerCase()} match your search. Clear the filters or add a new record.</div>
      ) : (
        <div className="table-responsive bg-white shadow-sm rounded">
          <table className="table table-hover align-middle m-0">
            <thead><tr>{cols.map(([k, label]) => <th key={k}>{label}</th>)}<th className="text-end">Actions</th></tr></thead>
            <tbody>
              {t.rows.map((r) => (
                <tr key={r.id}>
                  {cols.map(([k]) => <td key={k}>{r[k]}</td>)}
                  <td className="text-end text-nowrap">
                    <Link to={`${base}/${kind}/${r.id}`} className="btn btn-outline-primary btn-sm me-1">View</Link>
                    <Link to={`${base}/${kind}/${r.id}/edit`} className="btn btn-outline-secondary btn-sm me-1">Edit</Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(r)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="text-muted small">{t.total} record(s)</span>
        <div className="btn-group">
          <button className="btn btn-outline-dark btn-sm" disabled={t.page === 1} onClick={() => t.setPage(t.page - 1)}>Previous</button>
          <button className="btn btn-outline-dark btn-sm" disabled>Page {t.page} of {t.pages}</button>
          <button className="btn btn-outline-dark btn-sm" disabled={t.page === t.pages} onClick={() => t.setPage(t.page + 1)}>Next</button>
        </div>
      </div>
    </>
  );
}
