import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "admin" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address.";
    if (form.password.length < 6) er.password = "Password must be at least 6 characters.";
    setErrors(er);
    if (!Object.keys(er).length) navigate(`/${form.role}`);
  };

  return (
    <div className="container py-5" style={{ maxWidth: 440 }}>
      <div className="card border-0 shadow-sm"><div className="card-body p-4">
        <h1 className="h3 mb-3">Log in</h1>
        <form onSubmit={submit} noValidate>
          <div className="mb-3"><label className="form-label">Email</label><input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><div className="invalid-feedback">{errors.email}</div></div>
          <div className="mb-3"><label className="form-label">Password</label><input type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><div className="invalid-feedback">{errors.password}</div></div>
          <div className="mb-3"><label className="form-label">Log in as</label><select className="form-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="admin">Admin</option><option value="teacher">Teacher</option></select></div>
          <button className="btn btn-success w-100">Log in</button>
        </form>
        <p className="mt-3 mb-0 small">No account? <Link to="/signup">Sign up</Link></p>
      </div></div>
    </div>
  );
}
