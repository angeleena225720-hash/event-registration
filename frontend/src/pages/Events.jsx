import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API}/events`).then((r) => r.json()).then(setEvents);
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.length === 0 && <p>No events yet.</p>}
      {events.map((e) => (
        <div className="card" key={e._id}>
          <h3>{e.name}</h3>
          <p>{e.description}</p>
          <p>{new Date(e.date).toDateString()} · {e.venue}</p>
          <Link className="btn" to={`/events/${e._id}/register`}>Register</Link>
        </div>
      ))}
    </div>
  );
}
