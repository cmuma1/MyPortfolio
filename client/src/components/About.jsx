export default function About() {
  return (
    <section style={{ padding: 16 }}>
      <h2>About Me</h2>

      <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 16, marginTop: 12 }}>
        <img
          alt="Ceren headshot"
          src="/IMG_5731.png"  // from public/
          style={{ width: 160, height: 160, objectFit: "cover", borderRadius: 12 }}
        />

        <div>
          <p>
            I’m <strong>Ceren Muma</strong>, a Toronto/Niagara-based musician and Software Engineering Technology
            student at Centennial College. I teach general music and piano (ages 4–16) and enjoy building small React projects.
          </p>

          <ul style={{ marginTop: 8 }}>
            <li>🎹 Music teacher (piano & cello)</li>
            <li>💻 Frontend: React, basic Node/Express</li>
            <li>🎧 Interested in music tech + education tools</li>
          </ul>

          {/* If you saved a DOCX: */}
          <a href="/resume.docx" download style={{ display: "inline-block", marginTop: 12 }}>
            Download Résumé (DOCX)
          </a>
          {/* If you saved a PDF instead, use: 
              <a href="/resume.pdf" target="_blank" rel="noreferrer">Open Résumé (PDF)</a> */}
        </div>
      </div>
    </section>
  );
}

