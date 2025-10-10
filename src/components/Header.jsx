import React, { useState } from "react";
import Profile from "../assets/profile.json";

//get data from profile.json
const email = Profile.email;
const linkedin = Profile.linkedin;
const github = Profile.github;
const resume = Profile.resume;

//Header with hamburger menu, home, email, and linkedin links
const Header = ({ onSearch, searchTerm }) => {
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
      {/* <a href={resume} target="_blank" rel="noopener noreferrer">
        Resume
      </a> */}
      <a
        href="https://docs.google.com/document/d/1KB6gwwtwsAupukV_HcgXS_oV3RcVkKVcDgNRJawVLPM"
        target="_blank"
        rel="noopener noreferrer"
      >
        Dev log
      </a>
      <div id="search-container">
        <input
          id="searchInput"
          aria-label="search"
          placeholder="search: tech, skill, etc."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        {searchTerm && (
          <button
            id="searchClear"
            aria-label="clear search"
            onClick={() => onSearch("")}
          >
            clear
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
