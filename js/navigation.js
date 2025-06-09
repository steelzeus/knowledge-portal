// navigation.js - Central navigation logic
export function goToSubjectDetail(subjectId) {
  const params = new URLSearchParams(window.location.search);
  params.set('subject', subjectId);
  window.history.pushState({}, '', `?${params.toString()}`);
  showScreen('subject-detail-screen');
}

export function showScreen(screenId, opts = {}) {
  // Hide all screens ending with -screen
  document.querySelectorAll('[id$="-screen"]').forEach(div => div.style.display = 'none');
  
  // Show the target screen
  const target = document.getElementById(screenId);
  if (target) {
    target.style.display = 'block';
  }
}