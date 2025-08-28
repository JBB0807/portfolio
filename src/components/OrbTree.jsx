import React from "react";
import Orb from "./Orb";
import Categories from "../assets/categories.json";
import Projects from "../assets/projects.json";
import Tech from "../assets/tech.json";
import Profile from "../assets/profile.json";

//get data from profile.json
const profileName = Profile.name;

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
    github: Projects[key].github,
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

  const getDisplayClass = (orbName, selectionClass) => {
    if (orbName === selectedOrb) {
      return "selected";
    } else if (orbName === previousOrb) {
      return "previous";
    } else if (
      (displayLevel === 0 && orbName == profileName) ||
      //if display level is 1, show categories
      (displayLevel === 1 &&
        skillTree.categories.some((cat) => cat.name === orbName)) ||
      //if display level is 2, show tech under the selected category
      (displayLevel === 2 &&
        skillTree.categories
          .find((cat) => cat.name === selectedOrb)
          ?.tech.some((techItem) => techItem.name === orbName)) ||
      //if display level is 3, show projects under the selected tech
      (displayLevel === 3 &&
        skillTree.tech
          .find((t) => t.name === selectedOrb)
          ?.projects.some((project) => project.name === orbName))
    ) {
      return selectionClass;
    } else {
      let hide = "hidden";
      //temporary fix to hide the main orb without the twitching bug
      if (orbName == profileName) {
        hide += " previous";
      }
      return hide;
    }
  };
  
  function getPosition(orbName){
    let index = 0;
    if (displayLevel === 0) {
      return 0; // Main orb index
    } else if (displayLevel === 1) {
      index = skillTree.categories.findIndex((cat) => cat.name === orbName);
    } else if (displayLevel === 2) {
      const category = skillTree.categories.find(
        (cat) => cat.name === selectedOrb
      );
      index = category ? category.tech.findIndex((t) => t.name === orbName) : 0;
    } else if (displayLevel === 3) {
      const techItem = skillTree.tech.find(
        (t) => t.name === selectedOrb
      );
      index = techItem ? techItem.projects.findIndex((p) => p.name === orbName) : 0;
    }

    return getAngleMultipler(index); // Default case
  }
  
  // Function to calculate the angle multiplier based on the index
  // To achieve altenating angles for each orb
  // e.g. index | multiplier
  //       0     | 0
  //       1     | 1
  //       2     | -1
  //       3     | 2
  //       4     | -2
  function getAngleMultipler(x) {
  const sign = 1 - 2 * ((x + 1) % 2);       
  const magnitude = Math.floor((x + 1) / 2);
  return sign * magnitude;
}
  return (
    <div className="orb-tree">
      <Orb
        label={profileName}
        className={`main-orb ${getDisplayClass(profileName, "selections")}`}
        onOrbPressed={() => onOrbPressed(profileName)}
      />

      {/* <div className="category-container"> */}
      {categories.map((category) => (
        <Orb
          key={category.key}
          label={category.name}
          className={`category-orb ${getDisplayClass(
            category.name,
            "orbital-selections"
          )}`}
          onOrbPressed={() => onOrbPressed(category.name)}
          index={getPosition(category.name)}
        />
      ))}
      {/* </div> */}

      {/* <div className="orb-tech"> */}
      {tech.map((techItem) => (
        <Orb
          key={techItem.key}
          label={techItem.name}
          className={`tech-orb ${getDisplayClass(
            techItem.name,
            "orbital-selections"
          )}`}
          onOrbPressed={() => onOrbPressed(techItem.name)}
          index={getPosition(techItem.name)}
        />
      ))}
      {/* </div> */}

      {/* <div className="orb-projects"> */}
      {projects.map((project) => (
        <Orb
          key={project.key}
          label={project.name}
          className={`project-orb ${getDisplayClass(
            project.name,
            "selections"
          )}`}
          onOrbPressed={() =>
            onOrbPressed(project.name, project.description, project.url, project.github)
          }
          index={getPosition(project.name)}
        />
      ))}
    </div>
    // </div>
  );
};

export default OrbTree;
