import { renderSubjectList, renderSubjectDetail } from './subjectRouter.js';
import { renderRecommendations } from './recommendationEngine.js';

// Show/hide a global loading spinner (for future use)
export function showLoading() {
  let spinner = document.getElementById('global-loading-spinner');
  if (!spinner) {
    spinner = document.createElement('div');
    spinner.id = 'global-loading-spinner';
    spinner.innerHTML = '<div class="spinner"></div>';
    spinner.style.position = 'fixed';
    spinner.style.top = 0;
    spinner.style.left = 0;
    spinner.style.width = '100vw';
    spinner.style.height = '100vh';
    spinner.style.background = 'rgba(0,0,0,0.08)';
    spinner.style.display = 'flex';
    spinner.style.alignItems = 'center';
    spinner.style.justifyContent = 'center';
    spinner.style.zIndex = 9999;
    document.body.appendChild(spinner);
  }
  spinner.style.display = 'flex';
}
export function hideLoading() {
  const spinner = document.getElementById('global-loading-spinner');
  if (spinner) spinner.style.display = 'none';
}

// Parse subject ID from URL (?subject=cs)
function getSubjectIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('subject');
}

// Centralized navigation logic
function showScreen(screenId, opts = {}) {
  showLoading();
  // Hide all screens ending with -screen
  document.querySelectorAll('[id$="-screen"]').forEach(div => div.style.display = 'none');
  // Show the target screen
  const target = document.getElementById(screenId);
  if (target) {
    target.style.display = 'block';
    if (screenId === 'modular-subject-screen') {
      renderSubjectList();
    }
    if (screenId === 'welcome-screen') {
      renderRecommendations('recommendation-container');
      const rec = document.getElementById('recommendation-container');
      if (rec) rec.style.display = 'block';
    }
    if (screenId === 'subject-detail-screen') {
      // Use subjectId from opts or URL
      const subjectId = opts.subjectId || getSubjectIdFromURL();
      renderSubjectDetail(subjectId);
    }
  } else {
    // Fallback: show welcome screen if invalid screenId
    const fallback = document.getElementById('welcome-screen');
    if (fallback) fallback.style.display = 'block';
  }
  window.scrollTo(0, 0);
  setTimeout(hideLoading, 300); // Simulate loading
}

// Expose to global for inline HTML use
window.showScreen = showScreen;

// App initialization
function initApp() {
  // If ?subject=... is present, go directly to subject detail
  const subjectId = getSubjectIdFromURL();
  if (subjectId) {
    showScreen('subject-detail-screen', { subjectId });
  } else {
    showScreen('welcome-screen');
  }
  const getStartedBtn = document.getElementById('get-started-button');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => showScreen('modular-subject-screen'));
  }
}

document.addEventListener('DOMContentLoaded', initApp);

// For navigation from subject cards
export function goToSubjectDetail(subjectId) {
  // Update URL (no reload)
  window.history.pushState({}, '', `?subject=${subjectId}`);
  showScreen('subject-detail-screen', { subjectId });
}
window.goToSubjectDetail = goToSubjectDetail;

// Handle browser navigation (back/forward)
window.addEventListener('popstate', () => {
  const subjectId = getSubjectIdFromURL();
  if (subjectId) {
    showScreen('subject-detail-screen', { subjectId });
  } else {
    showScreen('welcome-screen');
  }
});