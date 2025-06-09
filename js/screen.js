import DEBUG from './debug.js';

// ============================================
// CORE NAVIGATION LOGIC
// ============================================

// Main screen navigation function with custom behaviors
function showScreen(screenId) {
    // Hide all screens (using multiple selectors to catch all variations)
    const screens = document.querySelectorAll('[id$="-screen"], .screen');
    screens.forEach(screen => {
        screen.style.display = "none";
    });

    // Show the target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.style.display = "block";
        window.scrollTo(0, 0); // Scroll to top on screen change
        
        // Custom behavior for specific screens
        if (screenId === "ambition-choice-screen") {
            showWelcomeMessage();
        }
        if (screenId === "welcome-screen") {
            personalizeWelcome();
        }    } else {
        DEBUG.warn(`Screen with ID "${screenId}" not found`);
    }
}

// ============================================
// SCREEN-SPECIFIC NAVIGATION FUNCTIONS
// ============================================

// Show welcome screen with personalization
function showWelcomeScreen() {
    showScreen('welcome-screen');
}

// Show ambition choice screen with validation
function showAmbitionChoiceScreen() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        
        if (!userInfo?.name) {
            alert("Please enter your name and age first.");
            showScreen('user-data-input-screen');
            return;
        }
        
        showScreen('ambition-choice-screen');
        
        // Reset ambition choices
        const ambitions = document.querySelectorAll('input[name="ambition"]');
        ambitions.forEach(ambition => {
            ambition.checked = false;
        });
    } catch (error) {
        DEBUG.warn("Error showing ambition choice screen:", error);
        showScreen('user-data-input-screen');
    }
}

// Show ambition confirmation screen
function showAmbitionConfirmationScreen() {
    const ambition = localStorage.getItem("userAmbition");
    
    if (!ambition) {
        alert("No ambition selected.");
        return;
    }
    
    const confirmationElement = document.getElementById("ambition-confirmation");
    if (confirmationElement) {
        confirmationElement.textContent = `You chose: ${ambition}`;
    }
    
    showScreen('ambition-confirmation-screen');
}

// Show user data input screen
function showUserDataInputScreen() {
    showScreen('user-data-input-screen');
    
    // Clear input fields
    const nameInput = document.getElementById("userName");
    const ageInput = document.getElementById("userAge");
    const levelInput = document.getElementById("educationLevel");
    
    if (nameInput) nameInput.value = '';
    if (ageInput) ageInput.value = '';
    if (levelInput) levelInput.value = '';
}

// ============================================
// NAVIGATION FLOW CONTROL
// ============================================

// Handle "Get Started" button - determines initial screen
function getStarted() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        
        if (userInfo?.name && userInfo?.age) {
            showWelcomeScreen();
        } else {
            showUserDataInputScreen();
        }
    } catch (error) {
        DEBUG.warn("Error in getStarted:", error);
        showUserDataInputScreen();
    }
}

// Go back to welcome screen
function backToWelcome() {
    showWelcomeScreen();
}

// Handle user data storage and navigate to next screen
function storeUserData() {
    if (saveUserInfo()) {
        showScreen('ambition-choice-screen');
    }
}

// Handle ambition confirmation and navigate to confirmation screen
function confirmAmbitionChoice() {
    const ambition = document.querySelector('input[name="ambition"]:checked');
    
    if (!ambition) {
        alert("Please select an ambition.");
        return;
    }
    
    localStorage.setItem("userAmbition", ambition.value);
    
    // Update confirmation message
    const confirmationElement = document.getElementById("ambition-confirmation");
    if (confirmationElement) {
        confirmationElement.textContent = `You chose: ${ambition.value}`;
    }
    
    showScreen('ambition-confirmation-screen');
}

// Reset application state and return to beginning
function resetUserData() {
    // Clear localStorage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userAmbition");
    
    // Clear input fields
    const nameInput = document.getElementById("userName");
    const ageInput = document.getElementById("userAge");
    const levelInput = document.getElementById("educationLevel");
    
    if (nameInput) nameInput.value = '';
    if (ageInput) ageInput.value = '';
    if (levelInput) levelInput.value = '';
    
    // Reset ambition choices
    const ambitions = document.querySelectorAll('input[name="ambition"]');
    ambitions.forEach(ambition => {
        ambition.checked = false;
    });
    
    // Navigate back to start
    showUserDataInputScreen();
}

// ============================================
// EVENT DELEGATION FOR NAVIGATION
// ============================================

// Modern approach using data attributes for navigation
document.addEventListener('click', function(e) {
    // Handle screen navigation via data attributes
    if (e.target.dataset.screen) {
        showScreen(e.target.dataset.screen);
    }
});

// ============================================
// NAVIGATION FLOW DIAGRAM (as comments)
// ============================================

/*
NAVIGATION FLOW:

1. Application Start
   └── getStarted()
       ├── Has user info? → showWelcomeScreen()
       └── No user info? → showUserDataInputScreen()

2. User Data Input Screen
   └── storeUserData()
       ├── Valid data? → showScreen('ambition-choice-screen')
       └── Invalid data? → Stay on current screen

3. Ambition Choice Screen
   └── confirmAmbitionChoice()
       ├── Selected ambition? → showScreen('ambition-confirmation-screen')
       └── No selection? → Stay on current screen

4. Ambition Confirmation Screen
   └── backToWelcome() → showWelcomeScreen()

5. Welcome Screen
   └── Various navigation options available

6. Reset Flow
   └── resetUserData() → showUserDataInputScreen()

SCREEN IDs USED:
- 'user-data-input-screen'
- 'ambition-choice-screen'
- 'ambition-confirmation-screen'
- 'welcome-screen'
*/

// ============================================
// NAVIGATION HELPER FUNCTIONS
// ============================================

// Check if user has completed onboarding
function isOnboardingComplete() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const ambition = localStorage.getItem("userAmbition");
        return !!(userInfo?.name && userInfo?.age && ambition);
    } catch (error) {
        return false;
    }
}

// Get current screen ID
function getCurrentScreen() {
    const visibleScreen = document.querySelector('[id$="-screen"][style*="block"], .screen[style*="block"]');
    return visibleScreen ? visibleScreen.id : null;
}

// Navigate to appropriate screen based on user state
function navigateToAppropriateScreen() {
    if (isOnboardingComplete()) {
        showWelcomeScreen();
    } else {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        if (userInfo.name && userInfo.age) {
            showAmbitionChoiceScreen();
        } else {
            showUserDataInputScreen();
        }
    }
}

// ============================================
// USAGE EXAMPLES
// ============================================

/*
HTML Usage Examples:

<!-- Direct function calls -->
<button onclick="showScreen('welcome-screen')">Go to Welcome</button>
<button onclick="showUserDataInputScreen()">Edit Profile</button>
<button onclick="getStarted()">Get Started</button>

<!-- Using data attributes (recommended) -->
<button data-screen="welcome-screen">Go to Welcome</button>
<button data-screen="user-data-input-screen">Edit Profile</button>

<!-- Navigation with validation -->
<button onclick="showAmbitionChoiceScreen()">Choose Ambition</button>
<button onclick="confirmAmbitionChoice()">Confirm Choice</button>

<!-- Reset and back navigation -->
<button onclick="resetUserData()">Start Over</button>
<button onclick="backToWelcome()">Back to Welcome</button>
*/
// ============================================
// END OF NAVIGATION LOGIC