// feedUI.js
// Renders the AI-powered personalized learning feed
import { generateFeed } from './aiFeedEngine.js';

function renderFeed(user, containerId = 'feed-container') {
  const feed = generateFeed(user);
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  feed.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'feed-card card my-3 shadow-sm';
    cardDiv.innerHTML = `
      <div class="card-body d-flex align-items-center">
        <span class="display-5 me-3">${card.icon}</span>
        <div class="flex-grow-1">
          <h5 class="card-title">${card.title}</h5>
          <p class="card-text mb-1">${card.reason || ''}</p>
          <div class="mb-2">
            ${card.duration ? `<span class='badge bg-info me-1'><i class='fa fa-clock'></i> ${card.duration} min</span>` : ''}
            ${card.XP ? `<span class='badge bg-success'><i class='fa fa-bolt'></i> +${card.XP} XP</span>` : ''}
          </div>
          <button class="btn btn-primary btn-sm">${card.action}</button>
        </div>
      </div>
    `;
    container.appendChild(cardDiv);
  });
}

export { renderFeed };
