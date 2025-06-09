// main.js - Application entry point
import { renderSubjectList } from './js/subjectRouter.js';
import { renderRecommendations } from './js/recommendationEngine.js';
import { showScreen } from './js/navigation.js';

// Utility functions for loading state
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

// Initialize application
function initApp() {
  // Parse subject ID from URL (?subject=cs)
  const params = new URLSearchParams(window.location.search);
  const subjectId = params.get('subject');

  if (subjectId) {
    showScreen('subject-detail-screen');
  } else {
    showScreen('welcome-screen');
    renderRecommendations('recommendation-container');
  }

  // Set up screen change handlers
  document.addEventListener('screenChange', (e) => {
    const { screenId } = e.detail;
    showLoading();
    
    if (screenId === 'modular-subject-screen') {
      renderSubjectList();
    }
    if (screenId === 'welcome-screen') {
      renderRecommendations('recommendation-container');
      const rec = document.getElementById('recommendation-container');
      if (rec) rec.style.display = 'block';
    }
    
    hideLoading();
  });
}

// Initialize AOS library after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    offset: 100
  });
  
  // Initialize the application
  initApp();
});