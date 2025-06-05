import { showScreen, logout } from './screens.js';
import { saveUserInfo } from './storage.js';

// Handle Next button on user info form
window.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('user-info-next-btn');
    if (nextBtn) {
        nextBtn.onclick = function() {
            if (saveUserInfo()) {
                showScreen('ambition-choice-screen');
                updateGreeting();
            }
        };
    }
    // Handle logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = logout;
    }
    updateGreeting();
});

// Update greeting with user's name
function updateGreeting() {
    const userName = localStorage.getItem('userName');
    const greeting = document.getElementById('personal-greeting');
    if (userName && greeting) {
        greeting.textContent = `Welcome, ${userName}! What's Your Learning Path?`;
    }
}