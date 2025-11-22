import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(formData),
      });

      // Try to read JSON only if the response is JSON
      const contentType = res.headers.get("content-type") || "";

      let data;
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(
          text || "Server returned non-JSON response (check API URL / server)"
        );
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to save contact");
      }

      setStatus("Contact saved successfully!");
      setFormData({ firstname: "", lastname: "", email: "" });
    } catch (err) {
      setStatus(err.message || "Something went wrong");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Contact</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <button type="submit">Submit</button>

        {status && (
          <p style={{ marginTop: "1rem", color: status.startsWith("Contact") ? "green" : "red" }}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

export default Contact;
