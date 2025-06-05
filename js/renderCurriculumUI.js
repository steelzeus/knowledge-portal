// renderCurriculumUI.js
// Renders curriculum as Bootstrap 5 collapsible cards, supports progress, tips, and focus mode
import { updateTopicStatus, saveCurriculumProgress } from './curriculumGenerator.js';

/**
 * Render the curriculum in a container
 * @param {Object} curriculum - { title, sections }
 * @param {string} userId
 * @param {HTMLElement} container
 * @param {boolean} focusMode
 */
export function renderCurriculumUI(curriculum, userId, container, focusMode = false) {
  if (!curriculum || !container) return;
  container.innerHTML = '';
  // Title
  const title = document.createElement('h3');
  title.className = 'mb-3';
  title.textContent = `Curriculum: ${capitalize(curriculum.title)}`;
  container.appendChild(title);
  // Focus mode toggle
  const focusBtn = document.createElement('button');
  focusBtn.className = 'btn btn-outline-primary btn-sm mb-3';
  focusBtn.textContent = focusMode ? 'Exit Focus Mode' : 'Focus Mode';
  focusBtn.onclick = () => renderCurriculumUI(curriculum, userId, container, !focusMode);
  container.appendChild(focusBtn);
  // Collapsible cards for each section
  Object.entries(curriculum.sections).forEach(([section, topics], idx) => {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    // Card header
    const header = document.createElement('div');
    header.className = 'card-header';
    header.innerHTML = `<button class="btn btn-link" data-bs-toggle="collapse" data-bs-target="#collapse${idx}">${section}</button>`;
    card.appendChild(header);
    // Card body (collapsible)
    const body = document.createElement('div');
    body.className = `collapse${focusMode && idx === 0 ? ' show' : ''}`;
    body.id = `collapse${idx}`;
    // List topics
    topics.forEach(t => {
      const row = document.createElement('div');
      row.className = 'd-flex align-items-center mb-2';
      // Status color
      let color = 'secondary';
      if (t.status === 'done') color = 'success';
      else if (t.status === 'in-progress') color = 'warning';
      // Checkbox
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = `form-check-input me-2 border-${color}`;
      cb.checked = t.status === 'done';
      cb.indeterminate = t.status === 'in-progress';
      cb.onchange = () => {
        const newStatus = cb.checked ? 'done' : (cb.indeterminate ? 'in-progress' : 'not-started');
        updateTopicStatus(curriculum, section, t.topic, newStatus);
        saveCurriculumProgress(userId, curriculum);
        renderCurriculumUI(curriculum, userId, container, focusMode);
      };
      // Topic label
      const label = document.createElement('span');
      label.textContent = t.topic;
      label.className = `badge bg-${color} ms-2`;
      // Tip
      const tip = document.createElement('div');
      tip.className = 'small text-muted ms-4';
      tip.textContent = t.tip;
      // Row layout
      row.appendChild(cb);
      row.appendChild(label);
      row.appendChild(tip);
      body.appendChild(row);
    });
    card.appendChild(body);
    container.appendChild(card);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
