import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    ["Manage students", "Add, edit, search and remove student records in one place."],
    ["Manage teachers", "Admins keep teacher details organised and up to date."],
    ["Two dashboards", "Admins and teachers each get tools built for their work."],
  ];
  return (
    <>
      <section className="hero py-5">
        <div className="container py-4">
          <h1 className="display-5 fw-bold">Student records, organised.</h1>
          <p className="lead col-lg-6">BrightPath College uses this system to keep student and teacher information accurate and easy to find.</p>
          <Link to="/login" className="btn btn-light btn-lg me-2">Login</Link>
          <Link to="/signup" className="btn btn-outline-light btn-lg">Sign Up</Link>
        </div>
      </section>
      <section className="container py-5">
        <div className="row g-4">
          {features.map(([t, d]) => (
            <div className="col-md-4" key={t}><div className="card h-100 border-0 shadow-sm"><div className="card-body"><h2 className="h5">{t}</h2><p className="text-muted m-0">{d}</p></div></div></div>
          ))}
        </div>
      </section>
    </>
  );
}
