import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import DashboardLayout from "./components/DashboardLayout";
import RecordsPage from "./components/RecordsPage";
import RecordForm from "./components/RecordForm";
import RecordDetails from "./components/RecordDetails";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Overview from "./pages/Overview";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

const dashboard = (role, kinds) => (
  <Route path={`/${role}`} element={<DashboardLayout role={role} />}>
    <Route index element={<Overview role={role} />} />
    {kinds.map((k) => (
      <Route key={k} path={k}>
        <Route index element={<RecordsPage kind={k} base={`/${role}`} />} />
        <Route path="new" element={<RecordForm kind={k} base={`/${role}`} />} />
        <Route path=":id" element={<RecordDetails kind={k} base={`/${role}`} />} />
        <Route path=":id/edit" element={<RecordForm kind={k} base={`/${role}`} />} />
      </Route>
    ))}
    <Route path="settings" element={<Settings role={role} />} />
    <Route path="help" element={<Help role={role} />} />
  </Route>
);

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<div className="container py-5"><h1 className="h3">Page not found</h1></div>} />
      </Route>
      {dashboard("admin", ["students", "teachers"])}
      {dashboard("teacher", ["students"])}
    </Routes>
  );
}
