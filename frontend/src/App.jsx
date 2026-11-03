import { Routes, Route, Link } from "react-router-dom";
import Events from "./pages/Events";
import RegisterEvent from "./pages/RegisterEvent";
import Admin from "./pages/Admin";
import Registrations from "./pages/Registrations";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Events</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events/:id/register" element={<RegisterEvent />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/events/:id/registrations" element={<Registrations />} />
        </Routes>
      </div>
    </>
  );
}
