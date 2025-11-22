// client/src/components/Layout.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [location]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
  }

  return (
    <>
      <header
        style={{
          width: "100%",
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* LEFT: Logo + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/logo_c.jpg"
            alt="Logo"
            style={{
              height: "40px",
              width: "40px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
          <span
            style={{ fontSize: "1.3rem", fontWeight: 600, color: "#111827" }}
          >
            Ceren Muma
          </span>
        </div>

        {/* MIDDLE: Nav links */}
        <nav
          style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "1rem",
            fontWeight: 500,
          }}
        >
          <Link style={{ color: "#2f4cff" }} to="/">
            Home
          </Link>
          <Link style={{ color: "#2f4cff" }} to="/about">
            About
          </Link>
          <Link style={{ color: "#2f4cff" }} to="/education">
            Education
          </Link>
          <Link style={{ color: "#2f4cff" }} to="/projects">
            Projects
          </Link>
          <Link style={{ color: "#2f4cff" }} to="/contact">
            Contact
          </Link>
        </nav>

        {/* RIGHT: Auth area */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {currentUser ? (
            <>
              <span style={{ fontSize: "0.95rem", color: "#374151" }}>
                Hi, <strong>{currentUser.firstname}</strong> (
                {currentUser.role})
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "0.4rem 0.9rem",
                  fontSize: "0.9rem",
                  borderRadius: "999px",
                  backgroundColor: "#111827",
                  color: "#ffffff",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link style={{ color: "#2f4cff" }} to="/login">
              Login
            </Link>
          )}
        </div>
      </header>

      <main style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
        {children}
      </main>
    </>
  );
}

