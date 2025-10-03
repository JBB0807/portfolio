import Categories from "../assets/categories.json";
import Projects from "../assets/projects.json";
import Tech from "../assets/tech.json";
import Profile from "../assets/profile.json";

//get data from profile.json
const profileName = Profile.name;

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
  tags: Projects[key].tags,
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

export { profileName, categories, tech, projects, skillTree };