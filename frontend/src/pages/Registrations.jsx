import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../api";

export default function Registrations() {
  const { id } = useParams();
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    fetch(`${API}/events/${id}/registrations`).then((r) => r.json()).then(setRegs);
  }, [id]);

  return (
    <div>
      <Link to="/admin">Back to dashboard</Link>
      <h2>Registrations ({regs.length})</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Registered on</th></tr>
        </thead>
        <tbody>
          {regs.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
