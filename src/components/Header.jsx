import React, { useState } from "react";
import Profile from "../assets/profile.json";

//get data from profile.json
const email = Profile.email;
const linkedin = Profile.linkedin;
const github = Profile.github;
const resume = Profile.resume;

//Header with hamburger menu, home, email, and linkedin links
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      {/* <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <img
          src="/burger-icon.svg"
          alt="Menu"
          style={{ width: "24px", height: "24px" }}
        />
      </button> */}
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
      <a href="./">Home</a>
      <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
        Email
      </a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href={github} target="_blank" rel="noopener noreferrer">
        Github
      </a>
      <a href={resume} target="_blank" rel="noopener noreferrer">
        Resume
      </a>
    </header>
  );
};

export default Header;
