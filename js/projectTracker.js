// projectTracker.js
// JSON-based project progress model with localStorage persistence

const PROJECTS_KEY = 'projectMentorSystem.projects';

function getProjects() {
  const data = localStorage.getItem(PROJECTS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

function addProject(project) {
  const projects = getProjects();
  projects.push(project);
  saveProjects(projects);
}

function updateProject(index, updatedProject) {
  const projects = getProjects();
  projects[index] = updatedProject;
  saveProjects(projects);
}

function removeProject(index) {
  const projects = getProjects();
  projects.splice(index, 1);
  saveProjects(projects);
}

export {
  getProjects,
  saveProjects,
  addProject,
  updateProject,
  removeProject
};

// Project model example:
// {
//   projectName: "Calculator App",
//   steps: [
//     { step: "Design UI", status: "not started", notes: "", resources: [] },
//     ...
//   ],
//   userNotes: "",
//   lastUpdated: "timestamp"
// }
