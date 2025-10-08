import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import OrbTree from "./OrbTree.jsx";
import { useState, useEffect } from "react";
import { projects } from "../data/data";
import Orb from "./Orb.jsx";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search: only return results if searchTerm hasn't changed in the last 500ms
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  const [displayLevel, setDisplayLevel] = useState(0);
  const [selectetOrb, setSelectedOrb] = useState("");
  const [previousOrb, setPreviousOrb] = useState("");
  const [project, setProject] = useState([]);

  const [breadcrubms, setBreadCrumbs] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('query') || '';
    setSearchTerm(query);
  }, []); // Run once on mount


  useEffect(() => {
    resetData();

    const params = new URLSearchParams(window.location.search);
    if (debouncedTerm) {
      params.set('query', debouncedTerm);
    } else {
      params.delete('query');
    }

    // Update URL without reloading
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);

  }, [debouncedTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  function resetData() {
    setDisplayLevel(0);
    setSelectedOrb("");
    setPreviousOrb("");
    setProject(null);
    setBreadCrumbs([]);
  }

  function getSearchResults() {
    //return only if the search term is not updated in the last 300ms
    if (debouncedTerm !== searchTerm) return [];

    return projects.filter((project) =>
      project.tags.some((tag) =>
        tag.toLowerCase().includes(debouncedTerm.toLowerCase())
      )
    );
  }

  function onOrbPressed(name, description, url, github) {
    // console.log("Orb pressed:", name);
    // console.log("Current selected orb:", selectetOrb);
    // console.log("Current previous orb:", previousOrb);
    // console.log("Current display level:", displayLevel);

    if (searchTerm) {
      setProject({ name, description, url, github });
      return;
    } else if (displayLevel === 1 && name === selectetOrb) {
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

      console.log("Setting project:", { name, description, url, github });
      setProject({ name, description, url, github });
    }
  }

  return (
    <>
      <Header onSearch={setSearchTerm} searchTerm={searchTerm} />
      <main>
        <div className="main-content">
          {/* <div className="breadcrumbs">{breadcrubms.join(" > ")}</div> */}

          {searchTerm ? (
            <div className="search-results">
              {getSearchResults().map((project) => (
                <Orb
                  key={project.key}
                  label={project.name}
                  description={project.description}
                  url={project.url}
                  github={project.github}
                  className={`search-orb`}
                  onOrbPressed={onOrbPressed}
                />
              ))}
            </div>
          ) : (
            <div className="orb-tree-container">
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
                At BCIT, I applied .NET, React, Node.js, and cloud technologies
                to design and deploy full-stack applications with modern best
                practices.
                <br />
                <br />
                My versatility across domains allows me to connect systems,
                troubleshoot deeply, and deliver scalable solutions that balance
                practicality with innovation.
              </p>
            </div>
          )}

          <div
            className={`side-content ${
              displayLevel > 1 || searchTerm ? "expanded" : "hidden"
            }`}
          >
            {displayLevel === 2 && <div className="category-description"></div>}
            {(displayLevel === 3 || searchTerm) && (
              <div>
                {project?.url ? (
                  <div className="project-content">
                    <iframe src={project?.url} title={project?.name} />
                    <div className="bottom-bar">
                      <div className="project-description">
                        {project?.description}
                      </div>
                      <div className="iframe-actions">
                        <a
                          href={project?.url}
                          target="_blank"
                          rel="noopener"
                          className="btn"
                        >
                          Open in new tab
                        </a>
                        {project?.github && (
                          <a
                            href={project?.github}
                            target="_blank"
                            rel="noopener"
                            className="btn"
                          >
                            Github
                          </a>
                        )}
                        <button
                          className="btn"
                          id="close-content"
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
