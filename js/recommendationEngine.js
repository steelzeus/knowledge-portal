// recommendationEngine.js
// Content recommendation engine for learning portal
// Shows top 3 recommended subjects on the welcome screen

import { SUBJECTS } from './subjectConfig.js';

/**
 * Render top 3 recommended subjects as cards in the given container.
 * @param {string} containerId - The DOM id to render into
 */
export function renderRecommendations(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '<h3 class="fw-bold mb-3">Recommended Subjects</h3>';
  if (!SUBJECTS || SUBJECTS.length === 0) {
    container.innerHTML += '<div class="text-muted">No recommendations available.</div>';
    return;
  }
  const top = SUBJECTS.slice(0, 3);
  const cards = top.map(subject => `
    <div class="card subject-card mb-3 p-3 d-flex flex-row align-items-center" style="min-width:220px;">
      <div class="subject-icon me-3" style="font-size:2rem;"><i class="fa ${subject.icon}"></i></div>
      <div>
        <div class="fw-bold">${subject.name}</div>
        <div class="small text-muted">${subject.description || ''}</div>
      </div>
    </div>
  `).join('');
  container.innerHTML += `<div class="d-flex flex-wrap gap-3">${cards}</div>`;
}
