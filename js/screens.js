// Handles showing/hiding screens
export function showScreen(id) {
    const screens = document.querySelectorAll('div[id$="-screen"]');
    screens.forEach(div => div.style.display = "none");
    const target = document.getElementById(id);
    if (target) target.style.display = "block";
}

// Handles logout: clears user data and returns to welcome screen
export function logout() {
    localStorage.clear();
    showScreen('welcome-screen');
}

// On page load, show welcome or ambition screen if user data exists
window.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        showScreen('ambition-choice-screen');
    } else {
        showScreen('welcome-screen');
    }
});