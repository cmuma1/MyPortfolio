// src/components/Projects.jsx
export default function Projects() {
  const projects = [
    {
      title: "PetPaws – Pet Care Companion",
      img: "",
      role: "Design concept",
      outcome: "Responsive app concept to track pet routines, reminders, and multi-pet profiles.",
    },
    {
      title: "Music Class Website",
      img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1200&q=60",
      role: "html",
      outcome: "Designed my firstwebsite.",
    },
    {
      title: "Portfolio Website",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=60",
      role: "Frontend (Vite + React)",
      outcome: "Deployed site demonstrating component patterns, routing, and clean structure.",
    },
  ];

  return (
    <section style={{ padding: 16 }}>
      <h2>Highlighted Projects</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginTop: 12 }}>
        {projects.map((p) => (
          <article key={p.title} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 12, background: "#fff" }}>
            <img src={p.img} alt={p.title} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }} />
            <h3 style={{ marginTop: 8 }}>{p.title}</h3>
            <p style={{ color: "#64748b", margin: 0 }}>{p.role}</p>
            <p style={{ marginTop: 8 }}>{p.outcome}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
