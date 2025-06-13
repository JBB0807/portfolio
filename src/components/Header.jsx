import React, { useState } from "react";

//Header with hamburger menu, home, email, and linkedin links
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <img src="/burger-icon.svg" alt="Menu" style={{ width: "24px", height: "24px" }} />
      </button>
      <nav
        style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          position: "absolute",
          top: "60px",
          left: 0,
          background: "#222",
          width: "200px",
          padding: "1rem",
        }}
      ></nav>
      <a href="/">Home</a>
      <a href="mailto:your.email@example.com">Email</a>
      <a
        href="https://www.linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </header>
  );
};

export default Header;

