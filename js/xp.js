// xp.js - Handles XP system and progress tracking
let dailyXP = 0;

// Initialize XP system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Restore XP from localStorage if available
  dailyXP = parseInt(localStorage.getItem('dailyXP') || '0');
  updateXPDisplay();
  
  // Add click listener to track XP
  document.body.addEventListener('click', () => addXP(2));
});

export function addXP(amount) {
  dailyXP += amount;
  if (dailyXP > 100) dailyXP = 100;
  updateXPDisplay();
  localStorage.setItem('dailyXP', dailyXP.toString());
}

function updateXPDisplay() {
  const xpFill = document.getElementById('daily-xp-fill');
  if (xpFill) {
    xpFill.style.width = `${dailyXP}%`;
  }
}
