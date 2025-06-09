// recommendationEngine.js
// Content recommendation engine for learning portal
// Shows top 3 recommended subjects on the welcome screen

import { SUBJECTS } from './subjectConfig.js';

/**
 * Render top 3 recommended subjects as cards in the given container.
 * @param {string} containerId - The DOM id to render into
 */
export function renderRecommendations(containerId) {
  // Use requestAnimationFrame to ensure DOM is ready and batch updates
  requestAnimationFrame(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    const header = document.createElement('h3');
    header.className = 'fw-bold mb-3';
    header.textContent = 'Recommended Subjects';
    fragment.appendChild(header);

    if (!SUBJECTS || SUBJECTS.length === 0) {
      const noData = document.createElement('div');
      noData.className = 'text-muted';
      noData.textContent = 'No recommendations available.';
      fragment.appendChild(noData);
    } else {
      const top = SUBJECTS.slice(0, 3);
      const cardsContainer = document.createElement('div');
      cardsContainer.className = 'd-flex flex-wrap gap-3';
      
      top.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'card subject-card mb-3 p-3 d-flex flex-row align-items-center';
        card.style.minWidth = '220px';
        card.innerHTML = `
          <div class="subject-icon me-3" style="font-size:2rem;"><i class="fa ${subject.icon}"></i></div>
          <div>
            <div class="fw-bold">${subject.name}</div>
            <div class="small text-muted">${subject.description || ''}</div>
          </div>
        `;
        cardsContainer.appendChild(card);
      });
      
      fragment.appendChild(cardsContainer);
    }

    // Clear and update container in one operation
    container.textContent = '';
    container.appendChild(fragment);
  });
}
