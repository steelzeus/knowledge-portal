// curriculumGenerator.js
// Generates a personalized curriculum from curriculumDB.json and user input

/**
 * Loads the curriculum knowledge graph from curriculumDB.json
 * @returns {Promise<Object>} curriculumDB
 */
export async function loadCurriculumDB() {
  const response = await fetch('js/curriculumDB.json');
  if (!response.ok) throw new Error('Failed to load curriculumDB.json');
  return await response.json();
}

/**
 * Generate a curriculum tree for a user based on ambition/goal and profile
 * @param {Object} params - { ambition, age, level, subjectInterest }
 * @param {Object} curriculumDB - loaded curriculum knowledge graph
 * @returns {Object} curriculum tree (with progress info)
 */
export function generateCurriculum({ ambition, age, level, subjectInterest }, curriculumDB) {
  if (!ambition || !curriculumDB) return null;
  // Normalize ambition key
  const key = ambition.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  let match = Object.keys(curriculumDB).find(k => key.includes(k) || k.includes(key));
  if (!match && subjectInterest) {
    match = Object.keys(curriculumDB).find(k => subjectInterest.toLowerCase().includes(k));
  }
  if (!match) match = Object.keys(curriculumDB)[0]; // fallback
  // Build curriculum tree with progress
  const tree = {};
  for (const section in curriculumDB[match]) {
    tree[section] = curriculumDB[match][section].map(topic => ({
      topic,
      status: 'not-started', // can be 'not-started', 'in-progress', 'done'
      tip: getTipForTopic(topic)
    }));
  }
  return { title: match, sections: tree };
}

/**
 * Get a smart tip for a topic (placeholder, can connect to mentor/tips DB)
 * @param {string} topic
 * @returns {string}
 */
function getTipForTopic(topic) {
  const tips = {
    'HTML': 'Start with basic tags and structure.',
    'CSS': 'Practice with Flexbox and Grid for layouts.',
    'JavaScript Basics': 'Focus on variables, loops, and functions.',
    'Node.js': 'Try building a simple server.',
    'Express': 'Learn routing and middleware.',
    'REST APIs': 'Understand HTTP verbs and status codes.',
    'MongoDB': 'Practice CRUD operations.',
    'PostgreSQL': 'Learn basic SQL queries.',
    'Authentication': 'Explore JWT and OAuth basics.',
    'Security': 'Never store passwords in plain text!',
    'DevOps Basics': 'Learn about CI/CD pipelines.',
    'Mechanics': 'Draw free-body diagrams to visualize forces.',
    'Thermodynamics': 'Remember the laws of thermodynamics.',
    'Electromagnetism': 'Practice with field line diagrams.',
    'Algebra': 'Master equations and inequalities.',
    'Calculus': 'Understand derivatives and integrals.',
    'Probability': 'Solve problems with tree diagrams.',
    'Physical': 'Balance chemical equations.',
    'Organic': 'Learn functional groups and reactions.',
    'Inorganic': 'Memorize periodic table trends.',
    'Linear Algebra': 'Practice with matrices and vectors.',
    'Probability & Stats': 'Visualize data with plots.',
    'Calculus Basics': 'Focus on limits and derivatives.',
    'Python Basics': 'Write small scripts to automate tasks.',
    'Numpy & Pandas': 'Manipulate arrays and dataframes.',
    'Data Visualization': 'Use matplotlib or seaborn.',
    'Supervised Learning': 'Start with linear regression.',
    'Unsupervised Learning': 'Try clustering algorithms.',
    'Model Evaluation': 'Use train/test split and metrics.',
    'Regression Project': 'Predict house prices.',
    'Classification Project': 'Classify images or text.'
  };
  return tips[topic] || 'Stay curious and keep practicing!';
}

/**
 * Save curriculum progress to localStorage
 * @param {string} userId
 * @param {Object} curriculum
 */
export function saveCurriculumProgress(userId, curriculum) {
  localStorage.setItem(`curriculum_${userId}`, JSON.stringify(curriculum));
}

/**
 * Load curriculum progress from localStorage
 * @param {string} userId
 * @returns {Object|null}
 */
export function loadCurriculumProgress(userId) {
  const raw = localStorage.getItem(`curriculum_${userId}`);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Mark a topic as done/in-progress/not-started
 * @param {Object} curriculum
 * @param {string} section
 * @param {string} topic
 * @param {string} status
 * @returns {Object} updated curriculum
 */
export function updateTopicStatus(curriculum, section, topic, status) {
  if (!curriculum || !curriculum.sections[section]) return curriculum;
  curriculum.sections[section] = curriculum.sections[section].map(t =>
    t.topic === topic ? { ...t, status } : t
  );
  return curriculum;
}
