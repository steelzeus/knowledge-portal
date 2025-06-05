// projectTrackerUI.js
// Dashboard UI for ProjectMentorSystem
// Uses Bootstrap 5 for layout and Animate.css for transitions (if available)

import { getProjects, addProject, updateProject, removeProject } from './projectTracker.js';
import { generateFeedback } from './mentorFeedback.js';

let streak = 0;
let lastActiveDay = null;

function renderProjects() {
  const projects = getProjects();
  const container = document.getElementById('project-dashboard');
  if (!container) return;
  container.innerHTML = '';
  projects.forEach((project, pIdx) => {
    const card = document.createElement('div');
    card.className = 'card mb-3 shadow-sm animate__animated animate__fadeIn';
    card.innerHTML = `
      <div class="card-header d-flex justify-content-between align-items-center">
        <span><b>${project.projectName}</b></span>
        <button class="btn btn-danger btn-sm" onclick="window.removeProject(${pIdx})">Delete</button>
      </div>
      <div class="card-body">
        <ul class="list-group mb-2">
          ${project.steps.map((step, sIdx) => `
            <li class="list-group-item d-flex align-items-center">
              <span class="me-2">${getStatusIcon(step.status)}</span>
              <span class="flex-grow-1">${step.step}</span>
              <select class="form-select form-select-sm w-auto ms-2" onchange="window.updateStepStatus(${pIdx},${sIdx},this.value)">
                <option value="not started" ${step.status==='not started'?'selected':''}>Not started</option>
                <option value="in progress" ${step.status==='in progress'?'selected':''}>In progress</option>
                <option value="done" ${step.status==='done'?'selected':''}>Done</option>
              </select>
            </li>
            <li class="list-group-item bg-light">
              <textarea class="form-control form-control-sm mb-1" placeholder="Notes/questions..." oninput="window.updateStepNotes(${pIdx},${sIdx},this.value)">${step.notes||''}</textarea>
              <div class="small text-muted">${generateFeedback(step, step.notes, step.status, streak)}</div>
            </li>
          `).join('')}
        </ul>
        <div class="mb-2">
          <label class="form-label">Project Notes</label>
          <textarea class="form-control" rows="2" oninput="window.updateProjectNotes(${pIdx},this.value)">${project.userNotes||''}</textarea>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="window.exportProjectMarkdown(${pIdx})">Export to Markdown</button>
      </div>
      <div class="card-footer text-end small text-muted">Last updated: ${project.lastUpdated||'-'}</div>
    `;
    container.appendChild(card);
  });
}

function getStatusIcon(status) {
  if (status === 'done') return '✅';
  if (status === 'in progress') return '⏳';
  return '⬜';
}

// UI event handlers (to be attached to window for inline HTML)
window.updateStepStatus = (pIdx, sIdx, value) => {
  const projects = getProjects();
  projects[pIdx].steps[sIdx].status = value;
  projects[pIdx].lastUpdated = new Date().toLocaleString();
  updateProject(pIdx, projects[pIdx]);
  renderProjects();
};
window.updateStepNotes = (pIdx, sIdx, value) => {
  const projects = getProjects();
  projects[pIdx].steps[sIdx].notes = value;
  projects[pIdx].lastUpdated = new Date().toLocaleString();
  updateProject(pIdx, projects[pIdx]);
  renderProjects();
};
window.updateProjectNotes = (pIdx, value) => {
  const projects = getProjects();
  projects[pIdx].userNotes = value;
  projects[pIdx].lastUpdated = new Date().toLocaleString();
  updateProject(pIdx, projects[pIdx]);
  renderProjects();
};
window.removeProject = (pIdx) => {
  removeProject(pIdx);
  renderProjects();
};
window.exportProjectMarkdown = (pIdx) => {
  const projects = getProjects();
  const project = projects[pIdx];
  let md = `# ${project.projectName}\n`;
  project.steps.forEach((step, i) => {
    md += `\n## Step ${i+1}: ${step.step}\n- Status: ${step.status}\n- Notes: ${step.notes||''}\n`;
  });
  md += `\n## Project Notes\n${project.userNotes||''}\n`;
  navigator.clipboard.writeText(md);
  alert('Project exported to clipboard as Markdown!');
};

// New Project Form
window.startNewProject = () => {
  const name = prompt('Project name?');
  if (!name) return;
  const stepsRaw = prompt('List steps, separated by commas:');
  if (!stepsRaw) return;
  const steps = stepsRaw.split(',').map(s => ({ step: s.trim(), status: 'not started', notes: '', resources: [] }));
  const newProject = {
    projectName: name,
    steps,
    userNotes: '',
    lastUpdated: new Date().toLocaleString()
  };
  addProject(newProject);
  renderProjects();
};

// Streak tracker (simple version)
function updateStreak() {
  const today = new Date().toDateString();
  if (lastActiveDay === today) return;
  if (lastActiveDay && (new Date(today) - new Date(lastActiveDay) === 86400000)) {
    streak++;
  } else {
    streak = 1;
  }
  lastActiveDay = today;
  localStorage.setItem('projectMentorSystem.streak', streak);
  localStorage.setItem('projectMentorSystem.lastActiveDay', lastActiveDay);
}

function loadStreak() {
  streak = parseInt(localStorage.getItem('projectMentorSystem.streak') || '1', 10);
  lastActiveDay = localStorage.getItem('projectMentorSystem.lastActiveDay') || null;
}

// Initialize
export function initProjectMentorSystem() {
  loadStreak();
  updateStreak();
  renderProjects();
}

// Optionally, call initProjectMentorSystem() on page load
// window.addEventListener('DOMContentLoaded', initProjectMentorSystem);

// For future: link step completion to curriculum engine to unlock modules
// and add dark mode toggle, Discord-style mentor bot, etc.
