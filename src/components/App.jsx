import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import OrbTree from "./OrbTree.jsx";
import { useState } from "react";

const App = () => {
  const [displayLevel, setDisplayLevel] = useState(0);
  const [selectetOrb, setSelectedOrb] = useState("");
  const [previousOrb, setPreviousOrb] = useState("");
  const [project, setProject] = useState([]);

  const [breadcrubms, setBreadCrumbs] = useState([]);

  function onOrbPressed(name, description, url) {
    // console.log("Orb pressed:", name);
    // console.log("Current selected orb:", selectetOrb);
    // console.log("Current previous orb:", previousOrb);
    // console.log("Current display level:", displayLevel);

    if (displayLevel === 1 && name === selectetOrb) {
      //console.log("Going back to main orb , resetting states");
      setBreadCrumbs([]);
      setSelectedOrb("");
      setPreviousOrb("");
      setDisplayLevel(0);
      setProject(null);
    } else if (previousOrb == name) {
      //console.log("Going back to previous orb");
      setPreviousOrb(breadcrubms[breadcrubms.length - 3] || "");

      setBreadCrumbs(breadcrubms.slice(0, -1));
      setSelectedOrb(name);
      setProject(null);

      setDisplayLevel(displayLevel - 1);
    } else if (name !== selectetOrb && displayLevel < 3) {
      // console.log("Moving up the tree to:", name);
      setBreadCrumbs([...breadcrubms, name]);

      setPreviousOrb(selectetOrb);
      setDisplayLevel(displayLevel + 1);
      setSelectedOrb(name);
    } else {
      //last display level, selecting projects
      // console.log("Selecting project:", name);
      if (!description || !url) {
        // Not a valid project, do not update project state
        return;
      }
      setProject({ name, description, url });
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="main-content">
          <div>
            {displayLevel} , {breadcrubms.join(" > ")} , {selectetOrb} ,{" "}
            {previousOrb}
          </div>
          <OrbTree
            displayLevel={displayLevel}
            previousOrb={previousOrb}
            selectedOrb={selectetOrb}
            onOrbPressed={onOrbPressed}
          />

          {displayLevel === 0 && (
            <p>
              As a software engineer with diverse experience, I have a strong
              background in software development and maintenance, system
              integration, and process optimization. During my time at
              Accenture, I led the integration of enterprise systems, driving
              efficiency and solving complex problems across multiple platforms.
              <br />
              <br />
              I recently completed the Software Systems Development program at
              BCIT, where I gained hands-on experience with modern frameworks
              such as .NET, React, Node.js, and cloud technologies.
              <br />
              <br />I take a generalist approach to engineering, applying a
              broad skill set to solve problems and deliver practical,
              well-integrated solutions across different domains.
            </p>
          )}
        </div>

        {displayLevel >= 2 && (
          <div className="side-content">
            {displayLevel === 2 && <div className="category-description"></div>}
            {displayLevel === 3 && (
              <div>
                {project?.url ? (
                  <div className="project-content">
                    <iframe src={project?.url} title={project?.name} />
                    <div className="bottom-bar">
                      <div className="project-description">
                        Project descripion
                      </div>
                      <div className="iframe-actions">
                        <a href={project?.url} target="_blank" rel="noopener"><button>Open in new tab</button></a>
                        <button>Github</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="tech-description"></div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
