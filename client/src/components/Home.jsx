
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <section style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 8 }}>
        Hi, I’m <strong>Ceren Muma</strong> — Software Engineering Student
      </h2>
      <p style={{ maxWidth: 720 }}>
      Hello there! My name is Ceren Muma. I am second year Software Engineering student based in Niagara, Ontario. This portfolio
        highlights a few projects, my education, and services I offer. Have a look around!
      </p>

      <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
        <Link to="/about">About me</Link>
        <Link to="/projects">See projects</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <p style={{ marginTop: 16, color: "#64748b" }}>
        Mission: Keep learning, make useful tools, and share the joy of music.
      </p>
    </section>
  );
}
