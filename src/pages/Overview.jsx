import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import { useData } from "../context/DataContext";
import { CLASSES } from "../data/sampleData";

export default function Overview({ role }) {
  const { students, teachers } = useData();
  const recent = [...students].sort((a, b) => b.addedOn.localeCompare(a.addedOn)).slice(0, 5);
  const topGrade = students.filter((s) => s.grade === "A").length;

  return (
    <>
      <h2 className="h4 mb-3">{role === "admin" ? "Admin" : "Teacher"} overview</h2>
      <div className="row g-3 mb-4">
        <StatCard label="Total students" value={students.length} icon="🎓" />
        {role === "admin" && <StatCard label="Total teachers" value={teachers.length} icon="👩‍🏫" color="success" />}
        <StatCard label="Classes" value={CLASSES.length} icon="🏫" color="warning" />
        <StatCard label="Students with grade A" value={topGrade} icon="⭐" color="danger" />
      </div>
      <div className="row g-3">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white fw-semibold">Recently added students</div>
            <ul className="list-group list-group-flush">
              {recent.map((s) => (
                <li key={s.id} className="list-group-item d-flex justify-content-between">
                  <Link to={`/${role}/students/${s.id}`}>{s.name}</Link>
                  <span className="text-muted small">{s.className} · {s.addedOn}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white fw-semibold">Students per class</div>
            <div className="card-body">
              {CLASSES.map((c) => {
                const n = students.filter((s) => s.className === c).length;
                return (
                  <div key={c} className="mb-2">
                    <div className="small d-flex justify-content-between"><span>{c}</span><span>{n}</span></div>
                    <div className="progress"><div className="progress-bar bg-success" style={{ width: `${students.length ? (n / students.length) * 100 : 0}%` }} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
