import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3000";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
    techStack: "",
    link: "",
  });
  const [status, setStatus] = useState("");

  const [currentUser, setCurrentUser] = useState(null);

  // Load current user from localStorage
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

  // Fetch all projects from API
  async function fetchProjects() {
    try {
      const res = await fetch(`${API_BASE}/api/projects`);
      const contentType = res.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(text || "Server did not return JSON");
      }

      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setStatus(err.message || "Failed to load projects");
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Submit new project (admin only)
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");

    if (!isAdmin) {
      setStatus("Only admin users can add projects.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          ...formData,
          year: formData.year ? Number(formData.year) : undefined,
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
        throw new Error(data.message || "Failed to create project");
      }

      setStatus("Project added successfully!");
      setFormData({
        title: "",
        description: "",
        year: "",
        techStack: "",
        link: "",
      });

      await fetchProjects();
    } catch (err) {
      setStatus(err.message || "Something went wrong");
    }
  }

  // Delete project (admin only)
  async function handleDelete(id) {
    if (!isAdmin) {
      setStatus("Only admin users can delete projects.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
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
        throw new Error(data.message || "Failed to delete project");
      }

      setStatus("Project deleted.");
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setStatus(err.message || "Something went wrong");
    }
  }

  // Sort projects by year (newest first if year exists)
  const sortedProjects = [...projects].sort((a, b) => {
    if (!a.year) return 1;
    if (!b.year) return -1;
    return b.year - a.year;
  });

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <h2>Projects</h2>

      <p style={{ marginBottom: "1.5rem", color: "#4b5563" }}>
        Here are some of the projects I have worked on.
      </p>

      {/* Project list */}
      {sortedProjects.length === 0 ? (
        <p>No projects added yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
          {sortedProjects.map((p) => (
            <li
              key={p._id}
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                marginBottom: "0.75rem",
                background: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>
                  {p.title}{" "}
                  {p.year && (
                    <span style={{ fontWeight: 400, color: "#6b7280" }}>
                      • {p.year}
                    </span>
                  )}
                </h3>

                {p.techStack && (
                  <p style={{ margin: "0.25rem 0", color: "#4b5563" }}>
                    <strong>Tech:</strong> {p.techStack}
                  </p>
                )}

                {p.description && (
                  <p style={{ margin: "0.25rem 0", color: "#4b5563" }}>
                    {p.description}
                  </p>
                )}

                {p.link && (
                  <p style={{ margin: "0.25rem 0" }}>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#2563eb" }}
                    >
                      View project
                    </a>
                  </p>
                )}
              </div>

              {isAdmin && (
                <button
                  onClick={() => handleDelete(p._id)}
                  style={{
                    alignSelf: "center",
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

      {/* Admin-only form */}
      {isAdmin ? (
        <section>
          <h3>Add New Project</h3>
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
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
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
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <label>Tech Stack (e.g. MERN, Node, React)</label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <label>Project Link (optional)</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>

            <button type="submit">Save Project</button>
          </form>
        </section>
      ) : (
        <p style={{ color: "#6b7280" }}>
          Log in as an admin to add or remove projects.
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

export default Projects;
