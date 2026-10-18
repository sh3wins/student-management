import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout({ role }) {
  const [open, setOpen] = useState(false);
  const base = `/${role}`;
  const links = [
    ["Overview", base, true],
    ["Students", `${base}/students`],
    ...(role === "admin" ? [["Teachers", `${base}/teachers`]] : []),
    ["Settings", `${base}/settings`],
    ["Help", `${base}/help`],
  ];
  return (
    <>
      <nav className="navbar navbar-dark px-3" style={{ background: "#0f3d3e" }}>
        <span className="navbar-brand fw-bold">BrightPath · {role === "admin" ? "Admin" : "Teacher"}</span>
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-outline-light btn-sm">Logout</Link>
          <button className="btn btn-light btn-sm d-md-none" onClick={() => setOpen(!open)}>Menu</button>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <aside className={`col-md-3 col-lg-2 sidebar p-3 ${open ? "" : "d-none"} d-md-block`}>
            <ul className="nav nav-pills flex-column gap-1">
              {links.map(([text, to, end]) => (
                <li key={to} className="nav-item">
                  <NavLink to={to} end={end} className="nav-link" onClick={() => setOpen(false)}>{text}</NavLink>
                </li>
              ))}
            </ul>
          </aside>
          <main className="col-md-9 col-lg-10 p-3 p-md-4"><Outlet /></main>
        </div>
      </div>
    </>
  );
}
