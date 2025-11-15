import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    console.log("Contact form submission:", form); // ✅ captured
    navigate("/");                                  // ✅ redirect Home
  }

  return (
    <section style={{ padding: 16 }}>
      <h2 style={{ color: "tomato" }}>CONTACT</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 480, marginTop: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input name="firstName" placeholder="First Name" value={form.firstName} onChange={update} required />
          <input name="lastName"  placeholder="Last Name"  value={form.lastName}  onChange={update} required />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input name="phone"  placeholder="Contact Number" value={form.phone} onChange={update} />
          <input name="email"  type="email" placeholder="Email Address" value={form.email} onChange={update} required />
        </div>
        <textarea name="message" rows={4} placeholder="Message" value={form.message} onChange={update} required />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
