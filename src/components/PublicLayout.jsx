import { Link, NavLink, Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark" style={{ background: "#0f3d3e" }}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">BrightPath SMS</Link>
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <NavLink className="nav-link text-white p-0" to="/" end>Home</NavLink>
            <NavLink className="nav-link text-white p-0" to="/about">About</NavLink>
            <NavLink className="nav-link text-white p-0" to="/login">Login</NavLink>
            <Link className="btn btn-light btn-sm" to="/signup">Sign Up</Link>
          </div>
        </div>
      </nav>
      <Outlet />
      <footer className="text-center text-muted small py-4">© 2026 BrightPath College. Demo project with sample data.</footer>
    </>
  );
}
