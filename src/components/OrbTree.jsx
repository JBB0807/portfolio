import React from "react";
import Orb from "./Orb";
import Categories from "../assets/categories.json";
import Projects from "../assets/projects.json";
import Tech from "../assets/tech.json";

const OrbTree = ({
  displayLevel = 0,
  selectedOrb = "",
  previousOrb = "",
  onOrbPressed,
}) => {
  //convert json data to a map
  const categories = Object.keys(Categories).map((key) => ({
    key: key,
    name: Categories[key].name,
    description: Categories[key].description,
    tech: Categories[key].tech,
  }));

  const tech = Object.keys(Tech).map((key) => ({
    key: key,
    name: Tech[key].name,
    description: Tech[key].description,
    projects: Tech[key].projects,
  }));

  const projects = Object.keys(Projects).map((key) => ({
    key: key,
    name: Projects[key].name,
    description: Projects[key].description,
    url: Projects[key].url,
  }));

  // Create a skill tree structure using the categories, tech, and projects
  const skillTree = {
    categories: categories.map((category) => ({
      ...category,
      tech: tech.filter((t) => category.tech.includes(t.name)),
    })),
    tech: tech.map((t) => ({
      ...t,
      projects: projects.filter((p) => t.projects.includes(p.name)),
    })),
  };


  return (
    <>
      <Orb label="JB Balahadia" className="main-orb" onOrbPressed={onOrbPressed}/>
      { displayLevel === 1 && (
        <div className="orb-tree">
          {skillTree.categories.map((category) => (
            <Orb
              key={category.key}
              label={category.name}
              className={`category-orb`}
              onOrbPressed={() => onOrbPressed(category.name, category.description, "")}
            />
          ))}
        </div>
      )}
      { displayLevel === 2 && (
        <div className="orb-tree">
          {skillTree.categories.find(cat => cat.name === selectedOrb)?.tech.map((t) => (
            <Orb
              key={t.name}
              label={t.name}
              className={`tech-orb`}
              onOrbPressed={() => onOrbPressed(t.name, t.description, "")}
            />
          ))}
        </div>
      )}
      { displayLevel === 3 && (
        <div className="orb-tree">
          {skillTree.tech.find(t => t.name === selectedOrb)?.projects.map((p) => (
            <Orb
              key={p.name}
              label={p.name}
              className={`project-orb`}
              onOrbPressed={() => onOrbPressed(p.name, p.description, p.url)}
            />
          ))}
        </div>
      )}
    </>
  );
};
export default OrbTree;
