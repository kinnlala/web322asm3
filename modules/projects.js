const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = [];

      projectData.forEach(project => {
        const sector = sectorData.find(sec => sec.id === project.sector_id);
        if (sector) {
          projects.push({
            ...project,
            sector: sector.sector_name
          });
        }
      });

      resolve();
    } catch (err) {
      reject("Unable to load project data");
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) {
      resolve(projects);
    } else {
      reject("No projects available");
    }
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const proj = projects.find(p => p.id === projectId);
    if (proj) {
      resolve(proj);
    } else {
      reject("Project not found");
    }
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const matches = projects.filter(p =>
      p.sector.toLowerCase().includes(sector.toLowerCase())
    );
    if (matches.length > 0) {
      resolve(matches);
    } else {
      reject("No projects found for that sector");
    }
  });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
