// Screen navigation function
function showScreen(id) {
    const screens = document.querySelectorAll('[id$="-screen"]');
    screens.forEach(div => {
        div.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) {
        target.style.display = "block";
        window.scrollTo(0, 0);  // Scroll to top on screen change
    }
}

// Generic toggle function for any element
function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with ID "${elementId}" not found`);
        return;
    }
    
    if (element.style.display === "block") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}

// Generic close function for any element
function closeElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with ID "${elementId}" not found`);
        return;
    }
    element.style.display = "none";
}

// Theme toggle function with enhanced functionality
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme");
    const themeButton = document.getElementById("theme-button");
    
    if (themeButton) {
        if (body.classList.contains("dark-theme")) {
            themeButton.textContent = "Light Mode";
        } else {
            themeButton.textContent = "Dark Mode";
        }
    }
}

// Convenience functions using the generic toggle/close functions
const toggleMenu = () => toggleElement("menu");
const closeMenu = () => closeElement("menu");

const toggleSidebar = () => toggleElement("sidebar");
const closeSidebar = () => closeElement("sidebar");

const toggleSearch = () => toggleElement("search");
const closeSearch = () => closeElement("search");

const toggleNotifications = () => toggleElement("notifications");
const closeNotifications = () => closeElement("notifications");

const toggleProfile = () => toggleElement("profile");
const closeProfile = () => closeElement("profile");

const toggleSettings = () => toggleElement("settings");
const closeSettings = () => closeElement("settings");

const toggleHelp = () => toggleElement("help");
const closeHelp = () => closeElement("help");

const toggleAbout = () => toggleElement("about");
const closeAbout = () => closeElement("about");

const toggleFeedback = () => toggleElement("feedback");
const closeFeedback = () => closeElement("feedback");

const toggleTerms = () => toggleElement("terms");
const closeTerms = () => closeElement("terms");

const togglePrivacy = () => toggleElement("privacy");
const closePrivacy = () => closeElement("privacy");

const toggleCookiePolicy = () => toggleElement("cookie-policy");
const closeCookiePolicy = () => closeElement("cookie-policy");

const toggleAccessibility = () => toggleElement("accessibility");
const closeAccessibility = () => closeElement("accessibility");

const toggleLanguage = () => toggleElement("language");
const closeLanguage = () => closeElement("language");

const toggleLogin = () => toggleElement("login");
const closeLogin = () => closeElement("login");

const toggleRegister = () => toggleElement("register");
const closeRegister = () => closeElement("register");

const toggleLogout = () => toggleElement("logout");
const closeLogout = () => closeElement("logout");

const toggleAdminPanel = () => toggleElement("admin-panel");
const closeAdminPanel = () => closeElement("admin-panel");

const toggleUserProfile = () => toggleElement("user-profile");
const closeUserProfile = () => closeElement("user-profile");

const toggleUserSettings = () => toggleElement("user-settings");
const closeUserSettings = () => closeElement("user-settings");

const toggleUserNotifications = () => toggleElement("user-notifications");
const closeUserNotifications = () => closeElement("user-notifications");

const toggleUserMessages = () => toggleElement("user-messages");
const closeUserMessages = () => closeElement("user-messages");

const toggleUserFriends = () => toggleElement("user-friends");
const closeUserFriends = () => closeElement("user-friends");

const toggleUserGroups = () => toggleElement("user-groups");
const closeUserGroups = () => closeElement("user-groups");

const toggleUserEvents = () => toggleElement("user-events");
const closeUserEvents = () => closeElement("user-events");

const toggleUserPosts = () => toggleElement("user-posts");
const closeUserPosts = () => closeElement("user-posts");

const toggleUserPhotos = () => toggleElement("user-photos");
const closeUserPhotos = () => closeElement("user-photos");

const toggleUserVideos = () => toggleElement("user-videos");
const closeUserVideos = () => closeElement("user-videos");

const toggleUserFiles = () => toggleElement("user-files");
const closeUserFiles = () => closeElement("user-files");

const toggleUserBookmarks = () => toggleElement("user-bookmarks");
const closeUserBookmarks = () => closeElement("user-bookmarks");

const toggleUserActivity = () => toggleElement("user-activity");
const closeUserActivity = () => closeElement("user-activity");

const toggleUserSubscriptions = () => toggleElement("user-subscriptions");
const closeUserSubscriptions = () => closeElement("user-subscriptions");

const toggleUserAchievements = () => toggleElement("user-achievements");
const closeUserAchievements = () => closeElement("user-achievements");

const toggleUserSupport = () => toggleElement("user-support");
const closeUserSupport = () => closeElement("user-support");

const toggleUserFeedback = () => toggleElement("user-feedback");
const closeUserFeedback = () => closeElement("user-feedback");

const toggleUserHelp = () => toggleElement("user-help");
const closeUserHelp = () => closeElement("user-help");

const toggleUserTerms = () => toggleElement("user-terms");
const closeUserTerms = () => closeElement("user-terms");

const toggleUserPrivacy = () => toggleElement("user-privacy");
const closeUserPrivacy = () => closeElement("user-privacy");

const toggleUserCookiePolicy = () => toggleElement("user-cookie-policy");
const closeUserCookiePolicy = () => closeElement("user-cookie-policy");

// Alternative approach: Event delegation for toggle/close operations
// This allows you to add data attributes to HTML elements instead of individual functions
document.addEventListener('click', function(e) {
    // Handle toggle operations
    if (e.target.dataset.toggle) {
        toggleElement(e.target.dataset.toggle);
    }
    
    // Handle close operations
    if (e.target.dataset.close) {
        closeElement(e.target.dataset.close);
    }
});

// Usage examples for the event delegation approach:
// <button data-toggle="menu">Toggle Menu</button>
// <button data-close="menu">Close Menu</button>






// Core utility function to show/hide screens
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    
    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'block';
    }
}

// Function to store user data
function storeUserData() {
    const name = document.getElementById("userName").value.trim();
    const age = document.getElementById("userAge").value.trim();
    
    if (!name || !age) {
        alert("Please enter both name and age.");
        return;
    }
    
    localStorage.setItem("userName", name);
    localStorage.setItem("userAge", age);
    showScreen('ambition-choice-screen');
}

// Function to personalize welcome message
function personalizeWelcome() {
    const name = localStorage.getItem("userName");
    const welcomeElement = document.getElementById("personal-greeting");
    const welcomeMessageElement = document.getElementById("welcome-message");
    
    if (name) {
        if (welcomeElement) {
            welcomeElement.textContent = `Hi ${name}, ready to explore?`;
        }
        if (welcomeMessageElement) {
            welcomeMessageElement.textContent = `Welcome back, ${name}!`;
        }
    } else {
        if (welcomeMessageElement) {
            welcomeMessageElement.textContent = "Welcome to our platform!";
        }
    }
}

// Function to handle ambition choice
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

// Function to show welcome screen
function showWelcomeScreen() {
    showScreen('welcome-screen');
    personalizeWelcome();
}

// Function to show ambition choice screen
function showAmbitionChoiceScreen() {
    const name = localStorage.getItem("userName");
    
    if (!name) {
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
}

// Function to show ambition confirmation screen
function showAmbitionConfirmationScreen() {
    const ambition = localStorage.getItem("userAmbition");
    
    if (!ambition) {
        alert("No ambition selected.");
        return;
    }
    
    // Update confirmation message
    const confirmationElement = document.getElementById("ambition-confirmation");
    if (confirmationElement) {
        confirmationElement.textContent = `You chose: ${ambition}`;
    }
    
    showScreen('ambition-confirmation-screen');
}

// Function to show user data input screen
function showUserDataInputScreen() {
    showScreen('user-data-input-screen');
    
    // Clear input fields
    const nameInput = document.getElementById("userName");
    const ageInput = document.getElementById("userAge");
    
    if (nameInput) nameInput.value = '';
    if (ageInput) ageInput.value = '';
}

// Function to handle "Get Started" button
function getStarted() {
    const name = localStorage.getItem("userName");
    const age = localStorage.getItem("userAge");
    
    if (name && age) {
        showWelcomeScreen();
    } else {
        showUserDataInputScreen();
    }
}

// Function to reset all user data
function resetUserData() {
    // Clear localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("userAge");
    localStorage.removeItem("userAmbition");
    
    // Clear input fields
    const nameInput = document.getElementById("userName");
    const ageInput = document.getElementById("userAge");
    
    if (nameInput) nameInput.value = '';
    if (ageInput) ageInput.value = '';
    
    // Reset ambition choices
    const ambitions = document.querySelectorAll('input[name="ambition"]');
    ambitions.forEach(ambition => {
        ambition.checked = false;
    });
    
    // Show user data input screen
    showUserDataInputScreen();
}

// Function to go back to welcome screen
function backToWelcome() {
    showWelcomeScreen();
}

// Initialization function
function init() {
    // Set up event listeners
    const storeButton = document.getElementById("store-user-data-button");
    const confirmAmbitionButton = document.getElementById("confirm-ambition-button");
    const getStartedButton = document.getElementById("get-started-button");
    const resetButton = document.getElementById("reset-user-data-button");
    const backToWelcomeButton = document.getElementById("back-to-welcome-button");
    
    if (storeButton) {
        storeButton.addEventListener("click", storeUserData);
    }
    
    if (confirmAmbitionButton) {
        confirmAmbitionButton.addEventListener("click", confirmAmbitionChoice);
    }
    
    if (getStartedButton) {
        getStartedButton.addEventListener("click", getStarted);
    }
    
    if (resetButton) {
        resetButton.addEventListener("click", resetUserData);
    }
    
    if (backToWelcomeButton) {
        backToWelcomeButton.addEventListener("click", backToWelcome);
    }
    
    // Initialize the application
    getStarted();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);





function saveUserInfo() {
  const name = document.getElementById("userName").value;
  const age = document.getElementById("userAge").value;
  const level = document.getElementById("educationLevel").value;
  localStorage.setItem("userInfo", JSON.stringify({ name, age, level }));
}
function loadUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) {
    document.getElementById("userName").value = userInfo.name;
    document.getElementById("userAge").value = userInfo.age;
    document.getElementById("educationLevel").value = userInfo.level;
  }
}
function showUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) {
    document.getElementById("displayName").textContent = `Name: ${userInfo.name}`;
    document.getElementById("displayAge").textContent = `Age: ${userInfo.age}`;
    document.getElementById("displayLevel").textContent = `Education Level: ${userInfo.level}`;
  } else {
    alert("No user information found.");
  }
}
function saveUserInfo() {
    const name = document.getElementById("userName").value.trim();
    const age = document.getElementById("userAge").value.trim();
    const level = document.getElementById("educationLevel").value;

        if (!name || !age || !level) {
                alert("Please fill out all fields!");
                return;
            }
    }

    function showWelcomeMessage() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.name) {
        document.getElementById("userGreetingName").textContent = userInfo.name;
    }
}
function showScreen(id) {
    const screens = document.querySelectorAll('div[id$="-screen"]');
    screens.forEach(div => div.style.display = "none");
    document.getElementById(id).style.display = "block";

    // Custom behavior for ambition-choice-screen
    if (id === "ambition-choice-screen") {
        showWelcomeMessage();
    }
}
function init() {
    loadUserInfo();
    showScreen('user-data-input-screen');
    
    // Set up event listeners
    document.getElementById("saveUserInfoButton").addEventListener("click", saveUserInfo);
    document.getElementById("showUserInfoButton").addEventListener("click", showUserInfo);
    
    // Show the initial screen
    showScreen('user-data-input-screen');
}

// Add navigation to Project Mentor System from subject detail screen
function goToProjectMentorSystem() {
    showScreen('project-dashboard-screen');
    import('./js/projectTrackerUI.js').then(m => m.initProjectMentorSystem());
}

// Add navigation to QuizForge from subject detail screen
function goToQuizForge() {
    showScreen('quizforge-screen');
    import('./js/quizUI.js').then(m => m.initQuizForge());
}

// Add navigation to Roadmap from subject detail screen
function goToRoadmap() {
    showScreen('roadmap-screen');
    import('./js/roadmapUI.js').then(m => {
        // Example: load user progress from localStorage or default
        const userProgress = JSON.parse(localStorage.getItem('curriculumFlow.progress') || '{}');
        m.renderRoadmap('Computer Science', userProgress);
    });
}

// Add navigation to Feed from welcome screen
function goToFeed() {
    showScreen('feed-screen');
    import('./js/feedUI.js').then(m => {
        // Example user object (should be built from real user data)
        const user = {
            userId: localStorage.getItem('userName') || 'user1',
            subject: 'Computer Science',
            recentActivity: JSON.parse(localStorage.getItem('recentActivity') || '[]'),
            quizPerformance: JSON.parse(localStorage.getItem('quizPerformance') || '{"functions":"weak","loops":"strong"}'),
            roadmapStatus: JSON.parse(localStorage.getItem('roadmapStatus') || '[]'),
            timeAvailable: '15',
            XP: parseInt(localStorage.getItem('quizForge.xp') || '0', 10),
            preferredFormat: localStorage.getItem('preferredFormat') || 'video'
        };
        m.renderFeed(user);
    });
}

// Add button handler for Project Mentor System
window.goToProjectMentorSystem = goToProjectMentorSystem;

// Add button handler for QuizForge
window.goToQuizForge = goToQuizForge;

// Add button handler for Roadmap
window.goToRoadmap = goToRoadmap;

// Add button handler for Feed
window.goToFeed = goToFeed;

document.addEventListener('DOMContentLoaded', () => {
  import('./js/mentorChatUI.js').then(m => {
    m.setupMentorChatUI();
    m.animateAvatar();
  });
});

// --- My Journey Dashboard Logic ---
import { generateLearningPath } from './js/learningPathEngine.js';
import { generateFeed } from './js/aiFeedEngine.js';
import { renderRoadmap } from './js/roadmapUI.js';
import { loadProgress, saveProgress } from './js/userProgressTracker.js';

window.showMyJourneyDashboard = function() {
  showScreen('my-journey-dashboard');
  // Load user data
  const name = localStorage.getItem('userName') || 'Learner';
  const age = parseInt(localStorage.getItem('userAge') || '18', 10);
  const educationLevel = localStorage.getItem('educationLevel') || 'High School';
  const ambition = localStorage.getItem('userAmbition') || 'Learn Computer Science';
  const userId = name.toLowerCase().replace(/\s+/g, '_');
  // Progress
  let progress = {};
  try { progress = loadProgress(userId); } catch { progress = {}; }
  // Generate learning path
  const path = generateLearningPath({ name, age, educationLevel, ambition });
  // XP, streak, level (mock/demo)
  let xp = 0, streak = 3, level = 1;
  if (progress && progress.xp) xp = progress.xp;
  if (progress && progress.streak) streak = progress.streak;
  if (progress && progress.level) level = progress.level;
  document.getElementById('my-journey-xp').textContent = xp;
  document.getElementById('my-journey-streak').textContent = streak;
  document.getElementById('my-journey-level').textContent = level;
  // Recent topics
  const recent = (progress && progress.recentTopics) || [path[0]?.title];
  const ul = document.getElementById('my-journey-recent-topics');
  ul.innerHTML = '';
  recent.forEach(t => { const li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });
  // Badges & milestones (mock/demo)
  const badges = (progress && progress.badges) || ['🔥', '🏅'];
  const badgeDiv = document.getElementById('my-journey-badges');
  badgeDiv.innerHTML = badges.map(b => `<span style='font-size:2rem;'>${b}</span>`).join(' ');
  const milestones = (progress && progress.milestones) || ['First Quiz', 'First Project'];
  const msUl = document.getElementById('my-journey-milestones');
  msUl.innerHTML = '';
  milestones.forEach(m => { const li = document.createElement('li'); li.textContent = m; msUl.appendChild(li); });
  // Roadmap
  renderRoadmap('Computer Science', progress.modules || {}, 'my-journey-roadmap');
  // Daily Spark
  function renderSpark() {
    const user = { quizPerformance: {}, preferredFormat: 'video', roadmapStatus: [], timeAvailable: 10, recentActivity: [], XP: xp };
    const feed = generateFeed(user);
    const spark = feed[0];
    document.getElementById('daily-spark-suggestion').innerHTML = spark ? `<div><span style='font-size:2rem;'>${spark.icon}</span><br><b>${spark.title}</b><br><small>${spark.reason || ''}</small><br><span class='badge bg-success'>+${spark.XP} XP</span></div>` : 'No suggestion.';
  }
  renderSpark();
  document.getElementById('refresh-daily-spark').onclick = renderSpark;
  // Focus Mode & Pomodoro
  let focus = false, pomodoro = null, pomodoroTime = 25*60;
  function updatePomodoro() {
    const min = String(Math.floor(pomodoroTime/60)).padStart(2,'0');
    const sec = String(pomodoroTime%60).padStart(2,'0');
    document.getElementById('pomodoro-time').textContent = `${min}:${sec}`;
  }
  document.getElementById('focus-mode-toggle').onclick = function() {
    focus = !focus;
    document.body.classList.toggle('dark-mode', focus);
    this.textContent = focus ? 'Exit Focus' : 'Toggle Focus';
  };
  document.getElementById('pomodoro-start').onclick = function() {
    if (pomodoro) return;
    pomodoro = setInterval(() => {
      if (pomodoroTime > 0) { pomodoroTime--; updatePomodoro(); }
      else { clearInterval(pomodoro); pomodoro = null; alert('Pomodoro complete!'); pomodoroTime = 25*60; updatePomodoro(); }
    }, 1000);
  };
  document.getElementById('pomodoro-reset').onclick = function() {
    if (pomodoro) { clearInterval(pomodoro); pomodoro = null; }
    pomodoroTime = 25*60; updatePomodoro();
  };
  updatePomodoro();
};

// Optionally, add a button or nav to open My Journey Dashboard
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.navbar .container-fluid');
  if (nav && !document.getElementById('my-journey-nav-btn')) {
    const btn = document.createElement('button');
    btn.id = 'my-journey-nav-btn';
    btn.className = 'btn btn-outline-primary ms-2';
    btn.innerHTML = '<i class="fa fa-map-signs"></i> My Journey';
    btn.onclick = () => window.showMyJourneyDashboard();
    nav.appendChild(btn);
  }
});

/* 🔧 1. DEBUG BROKEN BUTTONS */
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const action = btn.getAttribute('onclick');
    if (!action) {
      console.warn(`Missing onclick handler for button:`, btn);
      btn.style.border = '2px solid red';
    }
  });
});

/* 🧠 2. LOAD COMPUTER SCIENCE CONTENT */
const csProjects = [
  {
    title: "Build a Weather App",
    description: "Use HTML, CSS, JS, and a free weather API to build a real-time weather dashboard.",
    difficulty: "Intermediate",
    link: "https://open-meteo.com/"
  },
  {
    title: "Create a Markdown Blog Engine",
    description: "Let users write and render markdown notes/blogs. Use marked.js and localStorage.",
    difficulty: "Advanced",
    link: "https://marked.js.org/"
  },
  {
    title: "Build a Sorting Visualizer",
    description: "Visualize Bubble, Merge, Quick sorts with colorful bars. Use setTimeout + canvas/DOM.",
    difficulty: "Intermediate",
    link: "https://visualgo.net/en/sorting"
  },
];

function renderCSProjects() {
  const target = document.getElementById("project-detail-screen");
  if (!target) return;
  const projectList = document.createElement("div");
  projectList.className = "row row-cols-1 row-cols-md-2 g-4 mt-4";

  csProjects.forEach(project => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100 shadow">
        <div class="card-body">
          <h5 class="card-title">${project.title}</h5>
          <p class="card-text">${project.description}</p>
          <p class="text-muted small">Difficulty: ${project.difficulty}</p>
          <a href="${project.link}" target="_blank" class="btn btn-sm btn-outline-primary">Learn More</a>
        </div>
      </div>
    `;
    projectList.appendChild(card);
  });

  target.appendChild(projectList);
}

/* 📚 MATH CONTENT INJECTOR */
const mathProjects = [
  {
    title: "Calculus Visualizer",
    description: "Interactive canvas showing real-time slopes and areas under curves using HTML5 Canvas.",
    difficulty: "Advanced",
    link: "https://www.desmos.com/calculator"
  },
  {
    title: "3D Geometry Sandbox",
    description: "Use Three.js to model and rotate 3D geometric shapes on user input.",
    difficulty: "Advanced",
    link: "https://threejs.org/examples/#webgl_geometry_shapes"
  },
  {
    title: "Math Puzzle Generator",
    description: "Generate random math puzzles with increasing difficulty. Use Math.random() and conditionals.",
    difficulty: "Intermediate",
    link: "https://projecteuler.net/"
  }
];

function renderMathProjects() {
  const target = document.getElementById("project-detail-screen");
  if (!target) return;
  const container = document.createElement("div");
  container.className = "row row-cols-1 row-cols-md-2 g-4 mt-4";

  mathProjects.forEach(project => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100 border-0 shadow-sm bg-light">
        <div class="card-body">
          <h5 class="card-title text-dark">${project.title}</h5>
          <p class="card-text">${project.description}</p>
          <p class="text-muted small">Difficulty: ${project.difficulty}</p>
          <a href="${project.link}" target="_blank" class="btn btn-sm btn-dark">Explore</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  target.appendChild(container);
}

/* 🚀 PHYSICS CONTENT LOADER */
const physicsProjects = [
  {
    title: "Projectile Motion Simulator",
    description: "Visualize 2D motion of objects under gravity with user-controlled angle and velocity.",
    difficulty: "Advanced",
    link: "https://phet.colorado.edu/en/simulation/projectile-motion"
  },
  {
    title: "Quantum Double Slit Visualizer",
    description: "Simulate photon/electron wave interference using canvas animations or shaders.",
    difficulty: "Expert",
    link: "https://interactives.ck12.org/simulations/physics/double-slit.html"
  },
  {
    title: "Circuit Builder",
    description: "Interactive drag-and-drop circuit simulator built with SVG and basic logic.",
    difficulty: "Intermediate",
    link: "https://www.falstad.com/circuit/"
  }
];

function renderPhysicsProjects() {
  const target = document.getElementById("project-detail-screen");
  if (!target) return;
  const container = document.createElement("div");
  container.className = "row row-cols-1 row-cols-md-2 g-4 mt-4";

  physicsProjects.forEach(project => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100 border-0 shadow-sm bg-light">
        <div class="card-body">
          <h5 class="card-title text-dark">${project.title}</h5>
          <p class="card-text">${project.description}</p>
          <p class="text-muted small">Difficulty: ${project.difficulty}</p>
          <a href="${project.link}" target="_blank" class="btn btn-sm btn-dark">Explore</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  target.appendChild(container);
}

/* 🧪 CHEMISTRY CONTENT LOADER */
const chemistryProjects = [
  {
    title: "Periodic Table Explorer",
    description: "Interactive periodic table with element details and trends.",
    difficulty: "Intermediate",
    link: "https://ptable.com/"
  },
  {
    title: "Molecule Builder",
    description: "Drag-and-drop atoms to build molecules and see 3D models.",
    difficulty: "Advanced",
    link: "https://molview.org/"
  },
  {
    title: "Reaction Simulator",
    description: "Simulate basic chemical reactions and visualize products.",
    difficulty: "Intermediate",
    link: "https://chemcollective.org/vlabs"
  }
];

function renderChemistryProjects() {
  const target = document.getElementById("project-detail-screen");
  if (!target) return;
  const container = document.createElement("div");
  container.className = "row row-cols-1 row-cols-md-2 g-4 mt-4";

  chemistryProjects.forEach(project => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100 border-0 shadow-sm bg-light">
        <div class="card-body">
          <h5 class="card-title text-dark">${project.title}</h5>
          <p class="card-text">${project.description}</p>
          <p class="text-muted small">Difficulty: ${project.difficulty}</p>
          <a href="${project.link}" target="_blank" class="btn btn-sm btn-dark">Explore</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  target.appendChild(container);
}

/* 🧬 BIOLOGY CONTENT CORE */
const biologyStack = [
  {
    title: "Human Anatomy Atlas",
    description: "Explore interactive 3D models of human anatomy.",
    difficulty: "Intermediate",
    link: "https://www.visiblebody.com/"
  },
  {
    title: "Genetics Simulator",
    description: "Punnett square generator and DNA inheritance game.",
    difficulty: "Advanced",
    link: "https://learn.genetics.utah.edu/content/pigeons/"
  },
  {
    title: "Cell Structure Zoom",
    description: "Microscope-style zoomable interface for cell organelles.",
    difficulty: "Beginner",
    link: "https://www.cellsalive.com/cells/cell_model.htm"
  }
];

function renderBiologyProjects() {
  clearProjectDetailScreen();
  const target = document.getElementById("project-detail-screen");
  if (!target) return;
  const container = document.createElement("div");
  container.className = "row row-cols-1 row-cols-md-2 g-4 mt-4";
  biologyStack.forEach(project => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100 bg-success-subtle shadow border-0">
        <div class="card-body">
          <h5 class="card-title">${project.title}</h5>
          <p class="card-text">${project.description}</p>
          <p class="small text-muted">Difficulty: ${project.difficulty}</p>
          <a href="${project.link}" target="_blank" class="btn btn-outline-dark">Open Resource</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
  target.appendChild(container);
}

// Update unified subject loader
function loadSubjectProjects(subject) {
  switch(subject) {
    case 'cs':
    case 'computer-science':
      renderCSProjects();
      break;
    case 'math':
    case 'mathematics':
      loadMathContent();
      break;
    case 'physics':
      renderPhysicsProjects();
      break;
    case 'chemistry':
      renderChemistryProjects();
      break;
    case 'biology':
      renderBiologyProjects();
      break;
    default:
      clearProjectDetailScreen();
      break;
  }
  showScreen('project-detail-screen');
}

// --- Subject Selection Button Wiring ---
document.addEventListener('DOMContentLoaded', function() {
  // ...existing code for other subjects...
  const bioBtn = document.querySelector('#academic-subject-screen .btn-biology');
  if (bioBtn) {
    bioBtn.onclick = function() { loadSubjectProjects('biology'); };
    bioBtn.disabled = false;
  }
});

/* 🛠 BUTTON DEBUGGING: Log All Buttons + Add Missing Listeners */
function debugAllButtons() {
  const buttons = document.querySelectorAll("button, .btn");
  buttons.forEach(btn => {
    if (!btn.onclick && !btn.hasAttribute("data-action")) {
      console.warn("⚠️ Button missing click handler:", btn);
      btn.style.border = "2px dashed orange";
    }
  });
}

/* 🧭 Smooth Scroll Fixer for Navigation Buttons */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetID = this.getAttribute("href").slice(1);
    const el = document.getElementById(targetID);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

window.addEventListener('load', () => {
  debugAllButtons();
});

/* 📐 MATH CONTENT PAYLOAD */
const mathStack = [
  {
    title: "Calculus Visualizer",
    latex: "f(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
    audio: "https://assets.mixkit.co/active_storage/sfx/3898/3898-preview.mp3",
    link: "https://www.desmos.com/calculator"
  },
  {
    title: "Linear Algebra Sandbox",
    latex: "\\vec{v} = \\begin{bmatrix} 3 \\\\ 4 \\\\ 5 \\end{bmatrix}",
    audio: "https://assets.mixkit.co/active_storage/sfx/4397/4397-preview.mp3",
    link: "https://mathinsight.org/linear_algebra"
  },
  {
    title: "Number Theory Playground",
    latex: "\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}",
    audio: "https://assets.mixkit.co/active_storage/sfx/3647/3647-preview.mp3",
    link: "https://brilliant.org/wiki/number-theory/"
  }
];

function loadMathContent() {
  clearProjectDetailScreen();
  const target = document.getElementById("project-detail-screen");
  if (!target) return;
  const loader = document.createElement("div");
  loader.innerHTML = `<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>`;
  target.appendChild(loader);

  setTimeout(() => {
    loader.remove();
    const container = document.createElement("div");
    container.className = "row row-cols-1 row-cols-md-2 g-4 mt-4";

    mathStack.forEach(project => {
      const card = document.createElement("div");
      card.className = "col";
      card.innerHTML = `
        <div class="card h-100 bg-primary-subtle border-0 shadow">
          <div class="card-body">
            <h5 class="card-title">${project.title}</h5>
            <p class="card-text"><span class="latex">${project.latex}</span></p>
            <audio controls src="${project.audio}" class="w-100 mt-2 mb-2"></audio>
            <a href="${project.link}" target="_blank" class="btn btn-outline-dark">Explore</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    target.appendChild(container);
    if (window.MathJax) MathJax.typesetPromise(); // Re-render LaTeX
  }, 1000);
}

// Update subject loader for math
function loadSubjectProjects(subject) {
  switch(subject) {
    case 'cs':
    case 'computer-science':
      renderCSProjects();
      break;
    case 'math':
    case 'mathematics':
      loadMathContent();
      break;
    case 'physics':
      renderPhysicsProjects();
      break;
    case 'chemistry':
      renderChemistryProjects();
      break;
    case 'biology':
      renderBiologyProjects();
      break;
    default:
      clearProjectDetailScreen();
      break;
  }
  showScreen('project-detail-screen');
}

/* ⚡ PHYSICS CONTENT STACK */
const physicsStack = [
  {
    title: "Projectile Motion Sim",
    svg: `<svg width="100" height="50" viewBox="0 0 100 50"><circle cx="10" cy="40" r="5" fill="#00f">
    <animateMotion dur="2s" repeatCount="indefinite" path="M0,0 Q50,-40 100,0" /></circle></svg>`,
    link: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html"
  },
  {
    title: "Electric Field Lines",
    svg: `<svg width="100" height="50" viewBox="0 0 100 50"><circle cx="50" cy="25" r="5" fill="#f00">
    <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" /></circle></svg>`,
    link: "https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_en.html"
  },
  {
    title: "Wave Interference",
    svg: `<svg width="100" height="50" viewBox="0 0 100 50"><polyline fill="none" stroke="#0f0" stroke-width="2"
    points="0,25 10,20 20,25 30,30 40,25 50,20 60,25 70,30 80,25 90,20 100,25">
    <animate attributeName="points" dur="2s" repeatCount="indefinite"
    values="0,25 10,20 20,25 30,30 40,25 50,20 60,25 70,30 80,25 90,20 100,25;
            0,25 10,30 20,25 30,20 40,25 50,30 60,25 70,20 80,25 90,30 100,25;
            0,25 10,20 20,25 30,30 40,25 50,20 60,25 70,30 80,25 90,20 100,25" />
    </polyline></svg>`,
    link: "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_en.html"
  }
];

function loadPhysicsContent() {
  clearProjectDetailScreen();
  const target = document.getElementById("project-detail-screen");
  if (!target) return;
  const section = document.createElement("div");
  section.className = "row row-cols-1 row-cols-md-3 g-4 mt-4";

  physicsStack.forEach((item) => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100 bg-dark text-white border-0 neon-float">
        <div class="card-body d-flex flex-column align-items-center justify-content-center">
          <h5 class="card-title">${item.title}</h5>
          <div class="my-2">${item.svg}</div>
          <a href="${item.link}" class="btn btn-outline-light mt-3" target="_blank">Explore</a>
        </div>
      </div>
    `;
    section.appendChild(card);
  });

  target.appendChild(section);
}

// Update subject loader for physics
function loadSubjectProjects(subject) {
  switch(subject) {
    case 'cs':
    case 'computer-science':
      renderCSProjects();
      break;
    case 'math':
    case 'mathematics':
      loadMathContent();
      break;
    case 'physics':
      loadPhysicsContent();
      break;
    case 'chemistry':
      renderChemistryProjects();
      break;
    case 'biology':
      renderBiologyProjects();
      break;
    default:
      clearProjectDetailScreen();
      break;
  }
  showScreen('project-detail-screen');
}