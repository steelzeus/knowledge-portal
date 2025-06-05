// mentorEngine.js
// Simulated AI mentor engine for chatbot, ES6 module
// Future-ready for API/embeddings

// Dummy knowledge base (would be loaded from mentorData.json in real app)
const mentorData = {
  "javascript": "JavaScript is a scripting language used to create dynamic web content. It runs in the browser and lets you interact with HTML, CSS, and APIs. 😊",
  "how to start project": "To start a project, define your goal, outline features, and begin coding step-by-step. Start simple, then add features as you go!",
  "backend vs frontend": "Frontend is what users see; backend handles the logic and data. Frontend: HTML, CSS, JS. Backend: servers, databases, APIs.",
  "variables": "Variables store data values. In JavaScript, use let, const, or var to declare them.",
  "loops": "Loops let you repeat actions. Common types: for, while, do-while. Example: for(let i=0;i<5;i++){...}",
  "functions": "Functions are reusable blocks of code. Define with function myFunc() { ... } or const myFunc = () => { ... }.",
  "project ideas": "Try building a calculator, to-do list, or weather app to practice your skills!",
  "html": "HTML is the structure of web pages. Use tags like <div>, <h1>, <p> to organize content.",
  "css": "CSS styles your web pages. Use selectors to change colors, fonts, layout, and more.",
  "api": "APIs let your code talk to other programs or services. Fetch data using fetch() in JavaScript."
};

// Context memory for follow-ups
let lastTopic = null;

/**
 * Recognize intent/topic from user message using keywords
 * @param {string} message
 * @returns {string|null} topic key
 */
function recognizeIntent(message) {
  const lower = message.toLowerCase();
  for (const key in mentorData) {
    if (lower.includes(key)) return key;
  }
  // Try to match by last topic for follow-ups
  if (lastTopic && lower.includes('more') || lower.includes('explain') || lower.includes('example')) {
    return lastTopic;
  }
  return null;
}

/**
 * Get mentor reply for a user message
 * @param {string} message
 * @param {function} callback - called with reply after delay
 */
export function getMentorReply(message, callback) {
  const topic = recognizeIntent(message);
  let reply;
  if (topic && mentorData[topic]) {
    reply = mentorData[topic];
    lastTopic = topic;
  } else {
    reply = "I'm still learning that. Try asking about JavaScript basics or projects. 😊";
    lastTopic = null;
  }
  // Simulate thinking delay (700-1200ms)
  const delay = 700 + Math.floor(Math.random() * 500);
  setTimeout(() => callback(reply), delay);
}

// For future: load mentorData from JSON, add embeddings, or call API

export { mentorData };
