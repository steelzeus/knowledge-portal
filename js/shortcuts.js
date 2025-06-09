// shortcuts.js - Keyboard shortcuts handler
import { showScreen } from './navigation.js';

// Initialize keyboard shortcuts
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', handleKeyboardShortcuts);
});

function handleKeyboardShortcuts(e) {
  // Only handle if Ctrl key is pressed
  if (!e.ctrlKey) return;
  
  switch (e.key) {
    case 'k':
      e.preventDefault();
      showScreen('search-container');
      break;
    case 'j':
      e.preventDefault();
      showScreen('my-journey-dashboard');
      break;
    case 'r':
      e.preventDefault();
      showScreen('roadmap-screen');
      break;
    case 'f':
      e.preventDefault();
      showScreen('feed-screen');
      break;
  }
}
