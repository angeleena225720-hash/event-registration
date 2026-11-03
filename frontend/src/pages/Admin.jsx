import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../api";

const empty = { name: "", description: "", date: "", venue: "" };

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(empty);

  const load = () => fetch(`${API}/events`).then((r) => r.json()).then(setEvents);
  useEffect(() => { load(); }, []);

  const addEvent = async (e) => {
    e.preventDefault();
    await fetch(`${API}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(empty);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await fetch(`${API}/events/${id}`, { method: "DELETE" });
    load();
  };

  const edit = async (ev) => {
    const name = window.prompt("Event name", ev.name);
    if (!name) return;
    const venue = window.prompt("Venue", ev.venue);
    if (!venue) return;
    await fetch(`${API}/events/${ev._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, venue }),
    });
    load();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="card">
        <h3>Add Event</h3>
        <form onSubmit={addEvent} className="grid">
          <input placeholder="Name" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <textarea placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input type="date" required value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input placeholder="Venue" required value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })} />
          <button type="submit">Add Event</button>
        </form>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Date</th><th>Venue</th><th>Registrations</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev._id}>
                <td>{ev._id.slice(-6)}</td>
                <td>{ev.name}</td>
                <td>{new Date(ev.date).toDateString()}</td>
                <td>{ev.venue}</td>
                <td>{ev.totalRegistrations}</td>
                <td className="row">
                  <Link className="btn" to={`/admin/events/${ev._id}/registrations`}>View</Link>
                  <button onClick={() => edit(ev)}>Edit</button>
                  <button className="danger" onClick={() => remove(ev._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
