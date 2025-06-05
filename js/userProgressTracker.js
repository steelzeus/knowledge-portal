// userProgressTracker.js
// Persistent user progress tracker for learning modules
// Uses localStorage and in-memory state, ES6 module syntax

/**
 * ProgressTracker manages user progress for modules (videos, quizzes, readings, etc.)
 * All methods are exported as part of the ProgressTracker object.
 *
 * Usage:
 * import { ProgressTracker } from './userProgressTracker.js';
 * ProgressTracker.saveProgress(userId);
 * ...
 */

// In-memory cache of user progress (per userID)
const progressCache = {};

/**
 * Loads user progress from localStorage into memory.
 * @param {string} userId - Unique user identifier
 * @returns {object} User's progress object
 */
function loadProgress(userId) {
    if (!userId) throw new Error('userId required');
    if (progressCache[userId]) return progressCache[userId];
    const raw = localStorage.getItem(`progress_${userId}`);
    let progress = raw ? JSON.parse(raw) : {
        modules: {}, // { moduleId: { status, score } }
        lastUpdated: Date.now()
    };
    progressCache[userId] = progress;
    return progress;
}

/**
 * Saves user progress from memory to localStorage.
 * @param {string} userId - Unique user identifier
 */
function saveProgress(userId) {
    if (!userId) throw new Error('userId required');
    const progress = progressCache[userId];
    if (progress) {
        progress.lastUpdated = Date.now();
        localStorage.setItem(`progress_${userId}`,
            JSON.stringify(progress)
        );
    }
}

/**
 * Updates the progress for a specific module for a user.
 * @param {string} userId - Unique user identifier
 * @param {string} moduleId - Module identifier
 * @param {string} status - 'completed', 'in-progress', 'not-started'
 * @param {number|null} score - Optional quiz score
 */
function updateProgress(userId, moduleId, status, score = null) {
    if (!userId || !moduleId || !status) throw new Error('userId, moduleId, and status required');
    const progress = loadProgress(userId);
    progress.modules[moduleId] = {
        status,
        score: score !== null ? score : progress.modules[moduleId]?.score || null
    };
    saveProgress(userId); // Auto-save after update
}

/**
 * Returns an array of moduleIds that are recommended next (not completed).
 * @param {string} userId - Unique user identifier
 * @param {Array} allModuleIds - Array of all module IDs in the learning path (ordered)
 * @returns {Array} Array of recommended next module IDs
 */
function getRecommendedNextModules(userId, allModuleIds = []) {
    const progress = loadProgress(userId);
    // Find first not completed module(s)
    for (let i = 0; i < allModuleIds.length; i++) {
        const modId = allModuleIds[i];
        const mod = progress.modules[modId];
        if (!mod || mod.status !== 'completed') {
            // Recommend this and possibly the next one if in-progress
            const rec = [modId];
            if (mod && mod.status === 'in-progress' && allModuleIds[i+1]) {
                rec.push(allModuleIds[i+1]);
            }
            return rec;
        }
    }
    // All completed
    return [];
}

/**
 * Gets the status and score for a module for a user.
 * @param {string} userId
 * @param {string} moduleId
 * @returns {object|null} { status, score } or null
 */
function getModuleProgress(userId, moduleId) {
    const progress = loadProgress(userId);
    return progress.modules[moduleId] || null;
}

// Export all as ProgressTracker object
export const ProgressTracker = {
    loadProgress,
    saveProgress,
    updateProgress,
    getRecommendedNextModules,
    getModuleProgress
};
