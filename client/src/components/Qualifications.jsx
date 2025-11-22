// client/src/components/Qualifications.jsx
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3000";

function Qualifications() {
  const [qualifications, setQualifications] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    institution: "",
    year: "",
    description: "",
  });
  const [status, setStatus] = useState("");

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        setCurrentUser(null);
      }
    }
  }, []);

  const isAdmin = currentUser?.role === "admin";
  const token = localStorage.getItem("token");

  async function fetchQualifications() {
    try {
      const res = await fetch(`${API_BASE}/api/qualifications`);
      const contentType = res.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(text || "Server did not return JSON");
      }

      const data = await res.json();
      setQualifications(data);
    } catch (err) {
      setStatus(err.message || "Failed to load qualifications");
    }
  }

  useEffect(() => {
    fetchQualifications();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");

    if (!isAdmin) {
      setStatus("Only admin users can add qualifications.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/qualifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          ...formData,
          year: Number(formData.year),
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || "Server did not return JSON");
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to create qualification");
      }

      setStatus("Qualification added successfully!");
      setFormData({
        title: "",
        institution: "",
        year: "",
        description: "",
      });

      await fetchQualifications();
    } catch (err) {
      setStatus(err.message || "Something went wrong");
    }
  }

  async function handleDelete(id) {
    if (!isAdmin) {
      setStatus("Only admin users can delete qualifications.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this qualification?"))
      return;

    try {
      const res = await fetch(`${API_BASE}/api/qualifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const contentType = res.headers.get("content-type") || "";
      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || "Server did not return JSON");
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete qualification");
      }

      setStatus("Qualification deleted.");
      setQualifications((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      setStatus(err.message || "Something went wrong");
    }
  }

  const sortedQualifications = [...qualifications].sort(
    (a, b) => b.year - a.year
  );

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>Qualifications</h2>

      <p style={{ marginBottom: "1.5rem", color: "#4b5563" }}>
        Below is a list of my completed qualifications.
      </p>

      {sortedQualifications.length === 0 ? (
        <p>No qualifications added yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
          {sortedQualifications.map((q) => (
            <li
              key={q._id}
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                marginBottom: "0.75rem",
                background: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>
                  {q.title}
                  <span style={{ fontWeight: 400, color: "#6b7280" }}>
                    {" "}
                    • {q.institution}
                  </span>
                </h3>
                <p style={{ margin: "0.25rem 0", color: "#4b5563" }}>
                  Year: {q.year}
                </p>
                {q.description && (
                  <p style={{ margin: 0, color: "#4b5563" }}>
                    {q.description}
                  </p>
                )}
              </div>

              {isAdmin && (
                <button
                  onClick={() => handleDelete(q._id)}
                  style={{
                    padding: "0.35rem 0.75rem",
                    fontSize: "0.85rem",
                    backgroundColor: "#b91c1c",
                    color: "white",
                  }}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {isAdmin ? (
        <section>
          <h3>Add New Qualification</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "0.75rem" }}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <label>Institution</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <label>Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <label>Description (optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>

            <button type="submit">Save Qualification</button>
          </form>
        </section>
      ) : (
        <p style={{ color: "#6b7280" }}>
          Log in as an admin to add or remove qualifications.
        </p>
      )}

      {status && (
        <p
          style={{
            marginTop: "1rem",
            color: status.toLowerCase().includes("success")
              ? "green"
              : "red",
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
}

export default Qualifications;

