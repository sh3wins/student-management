export default function StatCard({ label, value, icon, color = "primary" }) {
  return (
    <div className="col-6 col-lg-3">
      <div className={`card border-0 shadow-sm border-start border-4 border-${color} h-100`}>
        <div className="card-body">
          <div className="fs-3">{icon}</div>
          <div className="fs-2 fw-bold">{value}</div>
          <div className="text-muted small">{label}</div>
        </div>
      </div>
    </div>
  );
}
