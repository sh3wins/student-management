import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "teacher" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 3) er.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address.";
    if (form.password.length < 6) er.password = "Password must be at least 6 characters.";
    if (form.confirm !== form.password) er.confirm = "Passwords do not match.";
    setErrors(er);
    if (!Object.keys(er).length) { setDone(true); setTimeout(() => navigate("/login"), 1500); }
  };

  const field = (k, label, type = "text") => (
    <div className="mb-3" key={k}><label className="form-label">{label}</label><input type={type} className={`form-control ${errors[k] ? "is-invalid" : ""}`} value={form[k]} onChange={set(k)} /><div className="invalid-feedback">{errors[k]}</div></div>
  );

  return (
    <div className="container py-5" style={{ maxWidth: 440 }}>
      <div className="card border-0 shadow-sm"><div className="card-body p-4">
        <h1 className="h3 mb-3">Create an account</h1>
        {done && <div className="alert alert-success">Account created. Taking you to the login page…</div>}
        <form onSubmit={submit} noValidate>
          {field("name", "Full name")}
          {field("email", "Email", "email")}
          {field("password", "Password", "password")}
          {field("confirm", "Confirm password", "password")}
          <div className="mb-3"><label className="form-label">Role</label><select className="form-select" value={form.role} onChange={set("role")}><option value="teacher">Teacher</option><option value="admin">Admin</option></select></div>
          <button className="btn btn-success w-100">Sign up</button>
        </form>
        <p className="mt-3 mb-0 small">Already registered? <Link to="/login">Log in</Link></p>
      </div></div>
    </div>
  );
}
