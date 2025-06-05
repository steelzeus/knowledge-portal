// quizEngine.js
// Reusable quiz engine for MCQ, True/False, Short Answer

const QUIZ_PROGRESS_KEY = 'quizForge.progress';

function saveQuizProgress(progress) {
  localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress));
}

function loadQuizProgress() {
  return JSON.parse(localStorage.getItem(QUIZ_PROGRESS_KEY) || '{}');
}

function startQuiz(quiz) {
  const progress = loadQuizProgress();
  progress[quiz.title] = {
    current: 0,
    correct: 0,
    incorrect: [],
    completed: false,
    startTime: Date.now(),
    timeLimit: quiz.timeLimit || 600
  };
  saveQuizProgress(progress);
}

function answerQuestion(quiz, questionIdx, userAnswer) {
  const progress = loadQuizProgress();
  const q = quiz.questions[questionIdx];
  let correct = false;
  if (q.type === 'mcq' || q.type === 'tf') {
    correct = userAnswer === q.answer;
  } else if (q.type === 'short') {
    correct = userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase();
  }
  if (correct) {
    progress[quiz.title].correct++;
  } else {
    progress[quiz.title].incorrect.push(questionIdx);
  }
  progress[quiz.title].current++;
  if (progress[quiz.title].current >= quiz.questions.length) {
    progress[quiz.title].completed = true;
  }
  saveQuizProgress(progress);
  return correct;
}

function retryIncorrect(quiz) {
  const progress = loadQuizProgress();
  const incorrect = progress[quiz.title]?.incorrect || [];
  return incorrect.map(idx => quiz.questions[idx]);
}

function getQuizScore(quiz) {
  const progress = loadQuizProgress();
  const p = progress[quiz.title] || {};
  return {
    correct: p.correct || 0,
    total: quiz.questions.length,
    completed: !!p.completed
  };
}

function clearQuizProgress(quizTitle) {
  const progress = loadQuizProgress();
  delete progress[quizTitle];
  saveQuizProgress(progress);
}

export {
  startQuiz,
  answerQuestion,
  retryIncorrect,
  getQuizScore,
  clearQuizProgress,
  saveQuizProgress,
  loadQuizProgress
};
