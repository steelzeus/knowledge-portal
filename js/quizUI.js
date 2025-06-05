// quizUI.js
// Handles QuizForge UI logic: start, render, answer, review, XP, streak, badges
import { startQuiz, answerQuestion, retryIncorrect, getQuizScore, clearQuizProgress, loadQuizProgress } from './quizEngine.js';
import { generateQuestion, generateRandomTopic } from './quizAI.js';
import { getXP, addXP, getStreak, updateStreak, getBadges, getLeaderboard, updateLeaderboard, getTopicProgress } from './quizDashboard.js';

let currentQuiz = null;
let currentIdx = 0;
let userName = localStorage.getItem('userName') || 'You';

function renderQuizQuestion(quiz, idx) {
  const q = quiz.questions[idx];
  let html = `<div class='card mb-3'><div class='card-body'>`;
  html += `<h5>Q${idx+1}: ${q.question}</h5>`;
  if (q.type === 'mcq') {
    q.options.forEach(opt => {
      html += `<div><input type='radio' name='quizOpt' value="${opt}" id="opt${opt}"><label for="opt${opt}"> ${opt}</label></div>`;
    });
  } else if (q.type === 'tf') {
    html += `<div><input type='radio' name='quizOpt' value='True' id='optTrue'><label for='optTrue'> True</label></div>`;
    html += `<div><input type='radio' name='quizOpt' value='False' id='optFalse'><label for='optFalse'> False</label></div>`;
  } else if (q.type === 'short') {
    html += `<input type='text' class='form-control' id='shortAnswer' placeholder='Your answer'>`;
  }
  html += `<button class='btn btn-primary mt-3' onclick='window.submitQuizAnswer()'>Submit</button>`;
  html += `</div></div>`;
  document.getElementById('quiz-question-carousel').innerHTML = html;
  updateProgressBar(idx, quiz.questions.length);
}

function updateProgressBar(idx, total) {
  const percent = Math.round((idx/total)*100);
  const bar = document.getElementById('quiz-progress');
  bar.style.width = percent + '%';
  bar.textContent = percent + '%';
  bar.setAttribute('aria-valuenow', percent);
}

window.submitQuizAnswer = function() {
  const q = currentQuiz.questions[currentIdx];
  let userAnswer = '';
  if (q.type === 'short') {
    userAnswer = document.getElementById('shortAnswer').value;
  } else {
    const checked = document.querySelector('input[name="quizOpt"]:checked');
    if (!checked) return alert('Select an answer!');
    userAnswer = checked.value;
  }
  const correct = answerQuestion(currentQuiz, currentIdx, userAnswer);
  if (correct) {
    addXP(10);
    updateStreak(true);
  } else {
    addXP(-5);
    updateStreak(false);
  }
  currentIdx++;
  if (currentIdx < currentQuiz.questions.length) {
    renderQuizQuestion(currentQuiz, currentIdx);
  } else {
    showQuizResults();
  }
  renderStats();
};

function showQuizResults() {
  const score = getQuizScore(currentQuiz);
  let html = `<h4>Quiz Complete!</h4><p>Score: ${score.correct} / ${score.total}</p>`;
  if (score.correct < score.total) {
    html += `<button class='btn btn-warning' onclick='window.retryIncorrectQuiz()'>Retry Incorrect</button>`;
  }
  html += `<button class='btn btn-secondary ms-2' onclick='window.closeQuizResultModal()'>Close</button>`;
  document.getElementById('quiz-result-body').innerHTML = html;
  new bootstrap.Modal(document.getElementById('quiz-result-modal')).show();
  updateLeaderboard(userName, score.correct);
}

window.retryIncorrectQuiz = function() {
  const retryQs = retryIncorrect(currentQuiz);
  if (!retryQs.length) return alert('No incorrect questions left!');
  currentQuiz.questions = retryQs;
  currentIdx = 0;
  renderQuizQuestion(currentQuiz, currentIdx);
};
window.closeQuizResultModal = function() {
  bootstrap.Modal.getInstance(document.getElementById('quiz-result-modal')).hide();
};

function renderStats() {
  document.getElementById('quiz-xp').textContent = `XP: ${getXP()}`;
  document.getElementById('quiz-streak').textContent = `Streak: ${getStreak()}`;
  document.getElementById('quiz-badges').textContent = `Badges: ${getBadges().join(', ')}`;
}

window.startQuizUI = function() {
  // Example quiz (could be loaded from curriculum)
  currentQuiz = {
    title: 'Python Basics',
    subject: 'Computer Science',
    questions: [
      { type: 'mcq', question: 'Which of these is a valid variable name in Python?', options: ['1variable', 'variable1', 'my-variable', '_var'], answer: 'variable1' },
      { type: 'tf', question: 'Python is case-sensitive.', answer: 'True' },
      { type: 'short', question: 'What keyword is used to define a function in Python?', answer: 'def' }
    ],
    difficulty: 'Easy',
    timeLimit: 600
  };
  startQuiz(currentQuiz);
  currentIdx = 0;
  renderQuizQuestion(currentQuiz, currentIdx);
  renderStats();
};

window.startDailyQuiz = function() {
  const today = new Date().toDateString();
  if (localStorage.getItem('quizForge.dailyQuizDate') === today) {
    alert('You already did today\'s quiz!');
    return;
  }
  const topic = generateRandomTopic();
  const questions = Array.from({length: 3}, () => generateQuestion(topic, 'Medium'));
  currentQuiz = {
    title: `Daily Quiz - ${today}`,
    subject: topic,
    questions,
    difficulty: 'Medium',
    timeLimit: 600
  };
  startQuiz(currentQuiz);
  currentIdx = 0;
  renderQuizQuestion(currentQuiz, currentIdx);
  renderStats();
  localStorage.setItem('quizForge.dailyQuizDate', today);
};

window.showLeaderboard = function() {
  const board = getLeaderboard();
  let html = '<h4>Leaderboard</h4><ol>';
  board.forEach(entry => {
    html += `<li>${entry.name}: ${entry.score} (${entry.date})</li>`;
  });
  html += '</ol>';
  document.getElementById('quiz-result-body').innerHTML = html;
  new bootstrap.Modal(document.getElementById('quiz-result-modal')).show();
};

// Optionally, call this on DOMContentLoaded if quizforge-screen is visible
export function initQuizForge() {
  renderStats();
}
