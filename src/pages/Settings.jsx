import { useState } from "react";

export default function Settings({ role }) {
  const [form, setForm] = useState({ name: role === "admin" ? "Admin User" : "Teacher User", email: `${role}@brightpath.test`, emailAlerts: true });
  const [saved, setSaved] = useState(false);
  const change = (k, v) => { setForm({ ...form, [k]: v }); setSaved(false); };

  return (
    <div className="card border-0 shadow-sm" style={{ maxWidth: 560 }}>
      <div className="card-body">
        <h2 className="h4 mb-3">{role === "admin" ? "Admin" : "Teacher"} settings</h2>
        {saved && <div className="alert alert-success">Settings saved.</div>}
        <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
          <div className="mb-3"><label className="form-label">Full name</label><input className="form-control" value={form.name} onChange={(e) => change("name", e.target.value)} /></div>
          <div className="mb-3"><label className="form-label">Email</label><input type="email" className="form-control" value={form.email} onChange={(e) => change("email", e.target.value)} /></div>
          <div className="form-check mb-3"><input id="alerts" type="checkbox" className="form-check-input" checked={form.emailAlerts} onChange={(e) => change("emailAlerts", e.target.checked)} /><label htmlFor="alerts" className="form-check-label">Email me about new records</label></div>
          <button className="btn btn-success">Save settings</button>
        </form>
      </div>
    </div>
  );
}
