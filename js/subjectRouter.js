// subjectRouter.js
// Handles dynamic subject routing, tab switching, and section rendering
import { subjects } from './subjectConfig.js';

function renderSubjectList(containerId = 'subject-list') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  subjects.forEach(subj => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary m-2';
    btn.textContent = subj.name;
    btn.onclick = () => showSubject(subj.id);
    container.appendChild(btn);
  });
}

function showSubject(subjectId) {
  const subj = subjects.find(s => s.id === subjectId);
  if (!subj) return;
  document.getElementById('subject-section-title').textContent = subj.name;
  renderTabs(subj);
  showSection(subj.id, subj.sections[0]);
}

function renderTabs(subj) {
  const tabNav = document.getElementById('subject-tabs');
  if (!tabNav) return;
  tabNav.innerHTML = '';
  subj.sections.forEach(section => {
    const tabBtn = document.createElement('button');
    tabBtn.className = 'nav-link';
    tabBtn.textContent = section;
    tabBtn.onclick = () => showSection(subj.id, section);
    tabNav.appendChild(tabBtn);
  });
}

function showSection(subjectId, section) {
  const content = document.getElementById('subject-section-content');
  if (!content) return;
  // Loader animation placeholder
  content.innerHTML = `<div class='text-center my-4'><div class='spinner-border text-primary' role='status'></div></div>`;
  setTimeout(() => {
    // Placeholder for unimplemented sections
    content.innerHTML = `<div class='alert alert-info text-center my-4'>${section} for ${subjectId.toUpperCase()} coming soon!</div>`;
  }, 500);
}

export { renderSubjectList, showSubject };
