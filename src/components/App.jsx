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

  function onOrbPressed(name, description, url, github) {
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
      setProject({ name, description, url, github });
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="main-content">
          <div className="breadcrumbs">{breadcrubms.join(" > ")}</div>
          <OrbTree
            displayLevel={displayLevel}
            previousOrb={previousOrb}
            selectedOrb={selectetOrb}
            onOrbPressed={onOrbPressed}
          />

          <p className={displayLevel !== 0 ? "hidden" : ""}>
            Software engineer bridging enterprise integration, mobile
            applications, and modern full-stack development. At Accenture, I
            worked on system integrations that cut processing time and
            stabilized mission-critical platforms for a major U.S. utility.
            <br />
            <br />
            At BCIT, I applied .NET, React, Node.js, and cloud technologies to
            design and deploy full-stack applications with modern best
            practices.
            <br />
            <br />
            My versatility across domains allows me to connect systems,
            troubleshoot deeply, and deliver scalable solutions that balance
            practicality with innovation.
          </p>
        </div>

        <div
          className={`side-content ${displayLevel > 1 ? "expanded" : "hidden"}`}
        >
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
                      <a href={project?.url} target="_blank" rel="noopener">
                        <button>Open in new tab</button>
                      </a>
                      {project?.github && (
                        <a
                          href={project?.github}
                          target="_blank"
                          rel="noopener"
                        >
                          <button>Github</button>
                        </a>
                      )}
                      <button
                        className="close-content"
                        onClick={() => setProject(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="tech-description"></div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
