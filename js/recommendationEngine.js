// recommendationEngine.js
// Content recommendation engine for learning portal
// No DOM, ES6 module, localStorage for persistence, upgradeable to cloud

import { SUBJECTS } from './subjectConfig.js';

// =====================
// Simulated User Profiles
// =====================
const FAKE_USERS = {
    'user1': {
        id: 'user1',
        age: 15,
        education: 'High School',
        preferredTopics: ['javascript','beginner','logic'],
        availableTime: 30,
        completed: ['cs_vid_1','cs_read_1'],
        progress: 1 // beginner
    },
    'user2': {
        id: 'user2',
        age: 20,
        education: 'Undergraduate',
        preferredTopics: ['math','algebra','trig'],
        availableTime: 20,
        completed: ['math_vid_1','math_read_1','math_quiz_1'],
        progress: 2 // intermediate
    },
    'user3': {
        id: 'user3',
        age: 25,
        education: 'Graduate',
        preferredTopics: ['physics','advanced','thermo'],
        availableTime: 60,
        completed: ['phy_vid_1','phy_read_1','phy_quiz_1','phy_proj_1'],
        progress: 3 // advanced
    }
};

/**
 * Retrieve current user profile (simulate for now)
 * @param {string} userId
 * @returns {object} user profile
 */
export function getUserProfile(userId) {
    // In real app, merge FAKE_USERS with localStorage data
    return FAKE_USERS[userId] || null;
}

/**
 * Mark content as completed for a user and update localStorage
 * @param {string} userId
 * @param {string} contentId
 */
export function markContentCompleted(userId, contentId) {
    let user = getUserProfile(userId);
    if (!user) return;
    if (!user.completed.includes(contentId)) user.completed.push(contentId);
    // Save to localStorage for persistence
    localStorage.setItem(`completed_${userId}`, JSON.stringify(user.completed));
}

/**
 * Score a content item for a user (0-100)
 * @param {object} user
 * @param {object} content
 * @param {object} [history] - optional, for diversity
 * @returns {number} score
 */
export function scoreContent(user, content, history = {}) {
    // Interest: tag overlap
    const interestScore = user.preferredTopics && content.tags ?
        (content.tags.filter(t => user.preferredTopics.includes(t)).length / content.tags.length) * 100 : 0;
    // Skill fit: closer difficulty to user progress is better
    const skillMatchScore = 100 - (Math.abs(content.difficulty - user.progress) * 33);
    // Popularity: normalize to 100
    const popularityScore = (content.popularity / 100) * 100;
    // Diversity: boost if type is less frequent in history
    let diversityBoost = 0;
    if (history.typeCounts) {
        const minType = Object.values(history.typeCounts).reduce((a,b) => Math.min(a,b), 1000);
        if (history.typeCounts[content.type] === minType) diversityBoost = 100;
    }
    // Weighted sum
    let score = (0.4 * interestScore) + (0.3 * skillMatchScore) + (0.2 * popularityScore) + (0.1 * diversityBoost);
    // Clamp
    return Math.round(Math.max(0, Math.min(100, score)));
}

/**
 * Get user interaction history from localStorage
 * @returns {object} history
 */
function getUserHistory() {
  return JSON.parse(localStorage.getItem('userHistory') || '{}');
}

/**
 * Add or update a user interaction in localStorage
 * @param {string} type - interaction type (e.g., 'resourceClick')
 * @param {string} id - resource or content ID
 */
export function addUserInteraction(type, id) {
  const history = getUserHistory();
  if (!history[type]) history[type] = {};
  history[type][id] = (history[type][id] || 0) + 1;
  localStorage.setItem('userHistory', JSON.stringify(history));
}

/**
 * Get recommended resources based on user profile and history
 * @returns {Array} recommended resources
 */
export function getRecommendedResources() {
  const profile = getUserProfile();
  const history = getUserHistory();
  let recs = [];
  // Content-based: recommend resources from selected subjects/ambitions
  profile.subjects.forEach(subjId => {
    const subj = SUBJECTS.find(s => s.id === subjId);
    if (subj && subj.sections) {
      subj.sections.forEach(sectionName => {
        // Dummy resource structure for demo
        recs.push({
          id: `${subj.id}_${sectionName}`,
          title: `${sectionName} in ${subj.name}`,
          type: sectionName,
          subject: subj.name,
          section: sectionName,
          description: `Explore ${sectionName} resources in ${subj.name}.`,
          reason: `Because you selected ${subj.name}`
        });
      });
    }
  });
  // Trending: most clicked by user
  let trending = [];
  if (history['resourceClick']) {
    trending = Object.entries(history['resourceClick'])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id]) => {
        for (const subj of SUBJECTS) {
          for (const sectionName of subj.sections) {
            if (`${subj.id}_${sectionName}` === id) {
              return {
                id,
                title: `${sectionName} in ${subj.name}`,
                type: sectionName,
                subject: subj.name,
                section: sectionName,
                description: `Explore ${sectionName} resources in ${subj.name}.`,
                reason: 'Trending Project'
              };
            }
          }
        }
        return null;
      })
      .filter(Boolean);
  }
  // Remove duplicates
  const seen = new Set();
  recs = recs.filter(r => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });
  // Add trending
  recs = recs.concat(trending.filter(r => !seen.has(r.id)));
  return recs;
}

/**
 * Render recommendations to the page
 * @param {string} containerId - HTML element ID to contain recommendations
 */
export function renderRecommendations(containerId = 'recommendation-container') {
  const recs = getRecommendedResources();
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  if (!recs.length) {
    container.innerHTML = '<div class="alert alert-info">No recommendations yet. Start exploring subjects!</div>';
    return;
  }
  // Group by reason
  const groups = {};
  recs.forEach(r => {
    if (!groups[r.reason]) groups[r.reason] = [];
    groups[r.reason].push(r);
  });
  Object.entries(groups).forEach(([reason, group]) => {
    const section = document.createElement('div');
    section.className = 'mb-4';
    section.innerHTML = `<h4 class="mb-3">${reason}</h4><div class="row g-3"></div>`;
    const row = section.querySelector('.row');
    group.forEach(resource => {
      const card = document.createElement('div');
      card.className = 'col-md-6 col-lg-4';
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center mb-2">
              <i class="fa fa-book fa-2x me-2 text-primary"></i>
              <h5 class="card-title mb-0">${resource.title}</h5>
            </div>
            <div class="mb-2"><span class="badge bg-secondary">${resource.type}</span> <span class="badge bg-info">${resource.subject}</span></div>
            <p class="card-text">${resource.description || ''}</p>
            <div class="progress mb-2" style="height:8px;">
              <div class="progress-bar" role="progressbar" style="width:0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <button class="btn btn-primary btn-sm" data-resource-id="${resource.id}">Go to Resource</button>
          </div>
        </div>
      `;
      row.appendChild(card);
    });
    container.appendChild(section);
  });
  // CTA button handlers
  container.querySelectorAll('button[data-resource-id]').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = btn.getAttribute('data-resource-id');
      addUserInteraction('resourceClick', id);
      // Optionally, navigate to resource (modular subject UI)
      // You can call showScreen('modular-subject-screen') and load the resource
    });
  });
}

// Render recommendations on the homepage
export function renderHomepageRecommendations(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '<h3>Recommended Subjects</h3>';
  SUBJECTS.forEach(subject => {
    const div = document.createElement('div');
    div.className = 'recommendation-card mb-2 p-2';
    div.innerHTML = `
      <div><i class="fa ${subject.icon}"></i> <b>${subject.name}</b></div>
      <div class="small">${subject.description}</div>
    `;
    container.appendChild(div);
  });
}

// =====================
// Test Cases (console)
// =====================
if (typeof window !== 'undefined') {
    console.log('User1 recommendations:', recommendContent('user1'));
    console.log('User2 recommendations:', recommendContent('user2'));
    console.log('User3 recommendations:', recommendContent('user3'));
    // Mark a content completed and re-recommend
    markContentCompleted('user1', 'cs_proj_1');
    console.log('User1 after completing cs_proj_1:', recommendContent('user1'));
}

// Export for future upgrades
export { CONTENT_DB, FAKE_USERS };
