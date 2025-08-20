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

const getDisplayClass = (orbName) => {
    if (orbName === selectedOrb) {
      return "selected";
    } else if (orbName === previousOrb) {
      return "previous";
    } else if (
      (displayLevel === 0 && orbName === "JB Balahadia") ||
      (displayLevel === 1 &&
        skillTree.categories.some((cat) => cat.name === orbName)) ||
      (displayLevel === 2 &&
        skillTree.categories.some((cat) =>
          cat.tech.some((techItem) => techItem.name === orbName)
        )) ||
      (displayLevel === 3 &&
        skillTree.tech.some((techItem) =>
          techItem.projects.some((project) => project.name === orbName)
        ))
    ) {
      return "selections";
    } else {
      return "hidden";
    }
  };

  // Create a counter for the index of projects
  const getProjectIndex = createIndexCounter();
  const getTechIndex = createIndexCounter();
  const getCategoryIndex = createIndexCounter();

  function createIndexCounter(orbName) {
    let counter = -1;
    return (shouldCount = getDisplayClass(orbName) == "selections") => {
      if (shouldCount) {
        counter += 1;
        return counter;
      }
      return null;
    };
  }

  return (
    <div className="orb-tree">
      <Orb
        label="JB Balahadia"
        className={`main-orb ${getDisplayClass("JB Balahadia")}`}
        onOrbPressed={() => onOrbPressed("JB Balahadia")}
      />

      <div className="orb-category">
        {skillTree.categories.map((category) => (
          <Orb
            key={category.key}
            label={category.name}
            className={`category-orb ${getDisplayClass(category.name)}`}
            onOrbPressed={() => onOrbPressed(category.name)}
            index={getCategoryIndex(category.name)}
          />
        ))}
      </div>

      <div className="orb-tech">
        {skillTree.categories.map((category) =>
          category.tech.map((techItem) => (
            <Orb
              key={techItem.key}
              label={techItem.name}
              className={`tech-orb ${getDisplayClass(techItem.name)}`}
              onOrbPressed={() => onOrbPressed(techItem.name)}
              index={getTechIndex(techItem.name)}
            />
          ))
        )}
      </div>

      <div className="orb-projects">
        {skillTree.tech.map((techItem) =>
          techItem.projects.map((project) => (
            <Orb
              key={project.key}
              label={project.name}
              className={`project-orb ${getDisplayClass(project.name)}`}
              onOrbPressed={() =>
                onOrbPressed(project.name, project.description, project.url)
              }
              index={getProjectIndex(project.name)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrbTree;
