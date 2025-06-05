// recommendationEngine.js
// Content recommendation engine for learning portal
// No DOM, ES6 module, localStorage for persistence, upgradeable to cloud

// =====================
// Dummy Content Database
// =====================
let CONTENT_DB = [];

/**
 * Loads a local dummy dataset of content items into memory.
 * Each item: { id, title, type, tags, difficulty, popularity, duration }
 */
export function initContentDatabase() {
    CONTENT_DB = [
        // Computer Science
        { id: 'cs_proj_1', title: 'Build a Calculator', type: 'project', tags: ['beginner','javascript','logic'], difficulty: 1, popularity: 85, duration: 30 },
        { id: 'cs_vid_1', title: 'Intro to Programming', type: 'video', tags: ['beginner','cs','basics'], difficulty: 1, popularity: 90, duration: 15 },
        { id: 'cs_read_1', title: 'Variables and Data Types', type: 'reading', tags: ['beginner','cs','variables'], difficulty: 1, popularity: 80, duration: 10 },
        { id: 'cs_quiz_1', title: 'Quiz: Programming Basics', type: 'quiz', tags: ['beginner','quiz','cs'], difficulty: 1, popularity: 70, duration: 10 },
        { id: 'cs_proj_2', title: 'Build a To-Do List', type: 'project', tags: ['intermediate','javascript','dom'], difficulty: 2, popularity: 75, duration: 45 },
        { id: 'cs_vid_2', title: 'Functions in JS', type: 'video', tags: ['intermediate','functions','javascript'], difficulty: 2, popularity: 80, duration: 20 },
        { id: 'cs_read_2', title: 'Control Flow', type: 'reading', tags: ['intermediate','logic','cs'], difficulty: 2, popularity: 70, duration: 15 },
        { id: 'cs_quiz_2', title: 'Quiz: Functions', type: 'quiz', tags: ['intermediate','quiz','functions'], difficulty: 2, popularity: 65, duration: 10 },
        { id: 'cs_proj_3', title: 'Build a Weather App', type: 'project', tags: ['advanced','api','javascript'], difficulty: 3, popularity: 60, duration: 60 },
        { id: 'cs_vid_3', title: 'OOP in JS', type: 'video', tags: ['advanced','oop','javascript'], difficulty: 3, popularity: 70, duration: 25 },
        // Mathematics
        { id: 'math_vid_1', title: 'Algebra Basics', type: 'video', tags: ['beginner','math','algebra'], difficulty: 1, popularity: 85, duration: 20 },
        { id: 'math_read_1', title: 'Numbers and Operations', type: 'reading', tags: ['beginner','math','numbers'], difficulty: 1, popularity: 80, duration: 10 },
        { id: 'math_quiz_1', title: 'Quiz: Algebra', type: 'quiz', tags: ['beginner','quiz','algebra'], difficulty: 1, popularity: 75, duration: 10 },
        { id: 'math_proj_1', title: 'Graph Plotter', type: 'project', tags: ['intermediate','math','graph'], difficulty: 2, popularity: 70, duration: 40 },
        { id: 'math_vid_2', title: 'Calculus Intro', type: 'video', tags: ['advanced','math','calculus'], difficulty: 3, popularity: 65, duration: 30 },
        { id: 'math_read_2', title: 'Trigonometry', type: 'reading', tags: ['intermediate','math','trig'], difficulty: 2, popularity: 60, duration: 15 },
        { id: 'math_quiz_2', title: 'Quiz: Trigonometry', type: 'quiz', tags: ['intermediate','quiz','trig'], difficulty: 2, popularity: 55, duration: 10 },
        { id: 'math_proj_2', title: 'Math Game', type: 'project', tags: ['advanced','math','game'], difficulty: 3, popularity: 50, duration: 50 },
        // Physics
        { id: 'phy_vid_1', title: 'Newton’s Laws', type: 'video', tags: ['beginner','physics','motion'], difficulty: 1, popularity: 80, duration: 20 },
        { id: 'phy_read_1', title: 'Energy and Work', type: 'reading', tags: ['beginner','physics','energy'], difficulty: 1, popularity: 75, duration: 10 },
        { id: 'phy_quiz_1', title: 'Quiz: Motion', type: 'quiz', tags: ['beginner','quiz','motion'], difficulty: 1, popularity: 70, duration: 10 },
        { id: 'phy_proj_1', title: 'Pendulum Simulator', type: 'project', tags: ['intermediate','physics','sim'], difficulty: 2, popularity: 65, duration: 45 },
        { id: 'phy_vid_2', title: 'Thermodynamics', type: 'video', tags: ['advanced','physics','thermo'], difficulty: 3, popularity: 60, duration: 25 },
        { id: 'phy_read_2', title: 'Waves', type: 'reading', tags: ['intermediate','physics','waves'], difficulty: 2, popularity: 55, duration: 15 },
        { id: 'phy_quiz_2', title: 'Quiz: Thermo', type: 'quiz', tags: ['advanced','quiz','thermo'], difficulty: 3, popularity: 50, duration: 10 },
        { id: 'phy_proj_2', title: 'Build a Simple Motor', type: 'project', tags: ['advanced','physics','motor'], difficulty: 3, popularity: 45, duration: 60 }
    ];
}

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
 * Recommend top N content items for a user
 * @param {string} userId
 * @param {number} limit
 * @returns {Array} recommended content
 */
export function recommendContent(userId, limit = 5) {
    const user = getUserProfile(userId);
    if (!user) return [];
    // Load completed from localStorage if present
    const completed = JSON.parse(localStorage.getItem(`completed_${userId}`)) || user.completed || [];
    // Build history for diversity
    const history = { typeCounts: {} };
    completed.forEach(cid => {
        const c = CONTENT_DB.find(x => x.id === cid);
        if (c) history.typeCounts[c.type] = (history.typeCounts[c.type] || 0) + 1;
    });
    // Filter out completed
    const candidates = CONTENT_DB.filter(c => !completed.includes(c.id));
    // Score and sort
    const scored = candidates.map(c => ({ ...c, score: scoreContent(user, c, history) }));
    scored.sort((a,b) => b.score - a.score);
    // Time fit: filter to those <= availableTime, but always return at least 1
    const timeFit = scored.filter(c => c.duration <= user.availableTime);
    return (timeFit.length ? timeFit : scored).slice(0, limit);
}

// =====================
// Test Cases (console)
// =====================
if (typeof window !== 'undefined') {
    initContentDatabase();
    console.log('User1 recommendations:', recommendContent('user1'));
    console.log('User2 recommendations:', recommendContent('user2'));
    console.log('User3 recommendations:', recommendContent('user3'));
    // Mark a content completed and re-recommend
    markContentCompleted('user1', 'cs_proj_1');
    console.log('User1 after completing cs_proj_1:', recommendContent('user1'));
}

// Export for future upgrades
export { CONTENT_DB, FAKE_USERS };
