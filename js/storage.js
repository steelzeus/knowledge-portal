// ============================================
// CORE STORAGE LOGIC
// ============================================

// ============================================
// USER DATA STORAGE
// ============================================

// Main function to save user information
function saveUserInfo() {
    const name = document.getElementById("userName")?.value.trim();
    const age = document.getElementById("userAge")?.value.trim();
    const level = document.getElementById("educationLevel")?.value;

    // Validation before storing
    if (!name || !age || !level) {
        alert("Please fill out all fields!");
        return false;
    }

    // Age validation
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        alert("Please enter a valid age between 1 and 120!");
        return false;
    }

    // Create user info object
    const userInfo = { 
        name: name, 
        age: ageNum, 
        level: level,
        timestamp: new Date().toISOString() // Track when data was saved
    };
    
    // Store in localStorage
    try {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log("User info saved:", userInfo);
        return true;
    } catch (error) {
        console.error("Error saving user info:", error);
        alert("Error saving user information. Please try again.");
        return false;
    }
}

// Load user info from storage into form fields
function loadUserInfo() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            const nameField = document.getElementById("userName");
            const ageField = document.getElementById("userAge");
            const levelField = document.getElementById("educationLevel");
            
            if (nameField) nameField.value = userInfo.name || '';
            if (ageField) ageField.value = userInfo.age || '';
            if (levelField) levelField.value = userInfo.level || '';
            
            console.log("User info loaded from storage");
            return userInfo;
        }
    } catch (error) {
        console.warn("Error loading user info:", error);
        // Clear corrupted data
        localStorage.removeItem("userInfo");
    }
    return null;
}

// Get user info without modifying UI
function getUserInfo() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        return userInfo || null;
    } catch (error) {
        console.warn("Error getting user info:", error);
        return null;
    }
}

// Display user info in designated UI elements
function showUserInfo() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            const displayName = document.getElementById("displayName");
            const displayAge = document.getElementById("displayAge");
            const displayLevel = document.getElementById("displayLevel");
            
            if (displayName) displayName.textContent = `Name: ${userInfo.name}`;
            if (displayAge) displayAge.textContent = `Age: ${userInfo.age}`;
            if (displayLevel) displayLevel.textContent = `Education Level: ${userInfo.level}`;
            
            return true;
        } else {
            alert("No user information found.");
            return false;
        }
    } catch (error) {
        console.warn("Error displaying user info:", error);
        alert("Error loading user information.");
        return false;
    }
}

// ============================================
// AMBITION DATA STORAGE
// ============================================

// Save user's ambition choice
function saveAmbition(ambitionValue) {
    try {
        localStorage.setItem("userAmbition", ambitionValue);
        
        // Also save timestamp
        localStorage.setItem("userAmbitionTimestamp", new Date().toISOString());
        
        console.log("Ambition saved:", ambitionValue);
        return true;
    } catch (error) {
        console.error("Error saving ambition:", error);
        return false;
    }
}

// Get user's ambition
function getAmbition() {
    try {
        return localStorage.getItem("userAmbition");
    } catch (error) {
        console.warn("Error getting ambition:", error);
        return null;
    }
}

// Save ambition from form (used in confirmAmbitionChoice)
function saveSelectedAmbition() {
    const ambition = document.querySelector('input[name="ambition"]:checked');
    
    if (!ambition) {
        return false;
    }
    
    return saveAmbition(ambition.value);
}

// ============================================
// THEME STORAGE
// ============================================

// Save theme preference
function saveTheme(theme) {
    try {
        localStorage.setItem("theme", theme);
        console.log("Theme saved:", theme);
        return true;
    } catch (error) {
        console.error("Error saving theme:", error);
        return false;
    }
}

// Load and apply saved theme
function loadTheme() {
    try {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-theme");
            const themeButton = document.getElementById("theme-button");
            if (themeButton) {
                themeButton.textContent = "Light Mode";
            }
            return "dark";
        }
        return "light";
    } catch (error) {
        console.warn("Error loading theme:", error);
        return "light";
    }
}

// ============================================
// COMPREHENSIVE DATA MANAGEMENT
// ============================================

// Get all stored user data
function getAllUserData() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const ambition = localStorage.getItem("userAmbition");
        const theme = localStorage.getItem("theme");
        const ambitionTimestamp = localStorage.getItem("userAmbitionTimestamp");
        
        return {
            userInfo: userInfo || null,
            ambition: ambition || null,
            theme: theme || "light",
            ambitionTimestamp: ambitionTimestamp || null,
            isComplete: !!(userInfo?.name && userInfo?.age && ambition)
        };
    } catch (error) {
        console.warn("Error getting all user data:", error);
        return {
            userInfo: null,
            ambition: null,
            theme: "light",
            ambitionTimestamp: null,
            isComplete: false
        };
    }
}

// Clear all user data
function clearAllUserData() {
    try {
        const keysToRemove = [
            "userInfo",
            "userAmbition", 
            "userAmbitionTimestamp"
            // Note: theme is preserved intentionally
        ];
        
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
        
        console.log("All user data cleared");
        return true;
    } catch (error) {
        console.error("Error clearing user data:", error);
        return false;
    }
}

// Reset all data including theme
function resetAllData() {
    try {
        localStorage.clear();
        console.log("All localStorage data cleared");
        return true;
    } catch (error) {
        console.error("Error resetting all data:", error);
        return false;
    }
}

// ============================================
// DATA VALIDATION AND INTEGRITY
// ============================================

// Validate stored user data integrity
function validateStoredData() {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        
        if (!userInfo) return { valid: true, errors: [] };
        
        const errors = [];
        
        // Validate required fields
        if (!userInfo.name || typeof userInfo.name !== 'string') {
            errors.push("Invalid or missing name");
        }
        
        if (!userInfo.age || typeof userInfo.age !== 'number' || userInfo.age < 1 || userInfo.age > 120) {
            errors.push("Invalid or missing age");
        }
        
        if (!userInfo.level || typeof userInfo.level !== 'string') {
            errors.push("Invalid or missing education level");
        }
        
        return {
            valid: errors.length === 0,
            errors: errors,
            data: userInfo
        };
        
    } catch (error) {
        return {
            valid: false,
            errors: ["Corrupted data format"],
            data: null
        };
    }
}

// Clean up corrupted data
function cleanupCorruptedData() {
    const validation = validateStoredData();
    
    if (!validation.valid) {
        console.warn("Corrupted data detected, cleaning up:", validation.errors);
        clearAllUserData();
        return true;
    }
    
    return false;
}

// ============================================
// STORAGE UTILITIES
// ============================================

// Check localStorage availability
function isStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (error) {
        console.warn("localStorage not available:", error);
        return false;
    }
}

// Get storage usage information
function getStorageInfo() {
    if (!isStorageAvailable()) {
        return { available: false };
    }
    
    try {
        let totalSize = 0;
        const items = {};
        
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                const value = localStorage[key];
                const size = new Blob([value]).size;
                items[key] = {
                    value: value,
                    size: size
                };
                totalSize += size;
            }
        }
        
        return {
            available: true,
            totalSize: totalSize,
            items: items,
            itemCount: Object.keys(items).length
        };
    } catch (error) {
        console.warn("Error getting storage info:", error);
        return { available: true, error: error.message };
    }
}

// Export data for backup
function exportUserData() {
    try {
        const allData = getAllUserData();
        const exportData = {
            ...allData,
            exportDate: new Date().toISOString(),
            version: "1.0"
        };
        
        return JSON.stringify(exportData, null, 2);
    } catch (error) {
        console.error("Error exporting data:", error);
        return null;
    }
}

// Import data from backup
function importUserData(jsonString) {
    try {
        const importData = JSON.parse(jsonString);
        
        // Validate import data structure
        if (!importData.version) {
            throw new Error("Invalid backup format");
        }
        
        // Import user info
        if (importData.userInfo) {
            localStorage.setItem("userInfo", JSON.stringify(importData.userInfo));
        }
        
        // Import ambition
        if (importData.ambition) {
            localStorage.setItem("userAmbition", importData.ambition);
        }
        
        // Import theme
        if (importData.theme) {
            localStorage.setItem("theme", importData.theme);
        }
        
        console.log("Data imported successfully");
        return true;
    } catch (error) {
        console.error("Error importing data:", error);
        return false;
    }
}

// ============================================
// LEGACY SUPPORT FUNCTIONS
// ============================================

// Legacy function - redirects to saveUserInfo
function storeUserData() {
    return saveUserInfo();
}

// Reset user data (used by resetUserData navigation function)
function resetUserData() {
    const success = clearAllUserData();
    
    // Clear form fields
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
    
    return success;
}

// ============================================
// STORAGE EVENT LISTENERS
// ============================================

// Listen for storage changes across tabs
window.addEventListener('storage', function(e) {
    console.log('Storage changed:', e.key, e.oldValue, e.newValue);
    
    // Handle specific storage changes
    switch(e.key) {
        case 'userInfo':
            // Reload user info in current tab if changed elsewhere
            loadUserInfo();
            break;
        case 'theme':
            // Apply theme changes from other tabs
            loadTheme();
            break;
        case 'userAmbition':
            // Handle ambition changes
            console.log('Ambition updated:', e.newValue);
            break;
    }
});

// ============================================
// INITIALIZATION
// ============================================

// Initialize storage system
function initStorage() {
    console.log("Initializing storage system...");
    
    // Check storage availability
    if (!isStorageAvailable()) {
        console.error("localStorage not available!");
        return false;
    }
    
    // Clean up any corrupted data
    cleanupCorruptedData();
    
    // Load existing data
    loadUserInfo();
    loadTheme();
    
    console.log("Storage system initialized");
    console.log("Storage info:", getStorageInfo());
    
    return true;
}

// ============================================
// USAGE EXAMPLES AND DATA STRUCTURE
// ============================================

/*
STORAGE KEYS USED:
- "userInfo" - JSON object: { name, age, level, timestamp }
- "userAmbition" - String: selected ambition value
- "userAmbitionTimestamp" - ISO date string
- "theme" - String: "light" or "dark"

EXAMPLE DATA STRUCTURE:
{
  "userInfo": {
    "name": "John Doe",
    "age": 25,
    "level": "Bachelor's",
    "timestamp": "2024-01-15T10:30:00.000Z"
  },
  "userAmbition": "Career Growth",
  "userAmbitionTimestamp": "2024-01-15T10:35:00.000Z",
  "theme": "dark"
}

USAGE EXAMPLES:
// Save user data
const success = saveUserInfo();

// Load user data
const userInfo = loadUserInfo();

// Get data without UI updates
const data = getUserInfo();

// Save ambition
saveAmbition("Career Growth");

// Get all data
const allData = getAllUserData();

// Clear everything
clearAllUserData();

// Export for backup
const backup = exportUserData();

// Import from backup
importUserData(backupString);
*/