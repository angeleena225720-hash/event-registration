import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";

export default function RegisterEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`${API}/events`)
      .then((r) => r.json())
      .then((list) => setEvent(list.find((e) => e._id === id)));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/events/${id}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMsg(res.ok ? "Registered successfully!" : data.message);
    if (res.ok) setForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="card" style={{ maxWidth: 420, margin: "0 auto" }}>
      <h2>{event ? event.name : "Event"}</h2>
      {event && <p>{new Date(event.date).toDateString()} · {event.venue}</p>}
      <form onSubmit={submit} className="grid">
        <input placeholder="Name" required value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Phone" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <button type="submit">Register</button>
      </form>
      {msg && <p><strong>{msg}</strong></p>}
    </div>
  );
}
