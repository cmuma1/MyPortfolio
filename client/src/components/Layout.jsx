import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <header
      style={{
        padding: 16,
        borderBottom: "1px solid #eee",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 50,
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <img src="/logo_c.jpg" alt="C logo" style={{ height: 32, width: 32, objectFit: "contain" }} />
        <h1 style={{ margin: 0 }}>My Portfolio</h1>
      </div>

      <nav style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 8 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/education">Education</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

