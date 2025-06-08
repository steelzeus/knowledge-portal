window.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('user-info-next-btn');
    if (nextBtn) {
        nextBtn.onclick = function() {
            // Save user info using the correct function
            const name = document.getElementById('userName').value.trim();
            const age = document.getElementById('userAge').value.trim();
            const educationLevel = document.getElementById('educationLevel').value;
            if (name && age && educationLevel && educationLevel !== 'Select one') {
                localStorage.setItem('userName', name);
                localStorage.setItem('userAge', age);
                localStorage.setItem('educationLevel', educationLevel);
                // Show ambition choice screen
                const userInfoScreen = document.getElementById('user-info-screen');
                const ambitionScreen = document.getElementById('ambition-choice-screen');
                if (userInfoScreen && ambitionScreen) {
                    userInfoScreen.style.display = 'none';
                    ambitionScreen.style.display = 'block';
                }
                // Update greeting if needed
                const greeting = document.getElementById('personal-greeting');
                if (greeting) greeting.textContent = `Welcome, ${name}! What's Your Learning Path?`;
            } else {
                alert('Please fill in all fields.');
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

// Safe logout function
function logout() {
  localStorage.clear();
  if (typeof showScreen === 'function') {
    showScreen('welcome-screen');
  } else {
    window.location.reload();
  }
}

// Update greeting with user's name
function updateGreeting() {
    const userName = localStorage.getItem('userName');
    const greeting = document.getElementById('personal-greeting');
    if (userName && greeting) {
        greeting.textContent = `Welcome, ${userName}! What's Your Learning Path?`;
    }
}