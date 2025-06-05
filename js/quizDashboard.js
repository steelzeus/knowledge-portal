// quizDashboard.js
// QuizForge dashboard: topic practice, challenge mode, leaderboard, XP, streaks, badges

import { loadQuizProgress, getQuizScore } from './quizEngine.js';

const XP_KEY = 'quizForge.xp';
const STREAK_KEY = 'quizForge.streak';
const BADGES_KEY = 'quizForge.badges';
const LEADERBOARD_KEY = 'quizForge.leaderboard';

function getXP() {
  return parseInt(localStorage.getItem(XP_KEY) || '0', 10);
}
function addXP(amount) {
  const xp = getXP() + amount;
  localStorage.setItem(XP_KEY, xp);
  checkBadges(xp);
}
function getStreak() {
  return parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
}
function updateStreak(correct) {
  let streak = getStreak();
  if (correct) streak++;
  else streak = 0;
  localStorage.setItem(STREAK_KEY, streak);
}
function getBadges() {
  return JSON.parse(localStorage.getItem(BADGES_KEY) || '[]');
}
function checkBadges(xp) {
  const badges = getBadges();
  if (xp >= 500 && !badges.includes('500XP')) badges.push('500XP');
  else if (xp >= 100 && !badges.includes('100XP')) badges.push('100XP');
  localStorage.setItem(BADGES_KEY, JSON.stringify(badges));
}
function getLeaderboard() {
  return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]');
}
function updateLeaderboard(name, score) {
  const board = getLeaderboard();
  board.push({ name, score, date: new Date().toLocaleDateString() });
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board.slice(0, 10)));
}
function getTopicProgress(topic, quiz) {
  const score = getQuizScore(quiz);
  return Math.round((score.correct / score.total) * 100);
}
export {
  getXP,
  addXP,
  getStreak,
  updateStreak,
  getBadges,
  getLeaderboard,
  updateLeaderboard,
  getTopicProgress
};
