import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import OrbTree from "./OrbTree.jsx";
import { useState } from "react";

const App = () => {
  const [displayLevel, setDisplayLevel] = useState(0);
  const [selectetOrb, setSelectedOrb] = useState("");
  const [previousOrb, setPreviousOrb] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  function onOrbPressed(name, description, url) {
    console.log("Orb pressed:", name);
    setSelectedOrb(name);
    setPreviousOrb(selectetOrb);
    setDescription(description);
    setUrl(url);
    setDisplayLevel(displayLevel + 1);
  }

  return (
    <>
      <Header />
      <main>
        <OrbTree
          displayLevel={displayLevel}
          selectedOrb={selectetOrb}
          previousOrb={previousOrb}
          onOrbPressed={onOrbPressed}
        />

        {displayLevel === 0 && (
          <p>
            As a software engineer with diverse experience, I have a strong
            background in software development and maintenance, system
            integration, and process optimization. During my time at Accenture,
            I led the integration of enterprise systems, driving efficiency and
            solving complex problems across multiple platforms.
            <br />
            <br />
            I recently completed the Software Systems Development program at
            BCIT, where I gained hands-on experience with modern frameworks such
            as .NET, React, Node.js, and cloud technologies.
            <br />
            <br />I take a generalist approach to engineering, applying a broad
            skill set to solve problems and deliver practical, well-integrated
            solutions across different domains.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
