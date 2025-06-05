// mentor.js
// Smart, emotionally intelligent AI mentor core

const mentorState = {
  name: "Aria",
  personality: "friendly-expert",
  currentSubject: "Computer Science",
  lastLesson: "Python Functions",
  painPoints: ["Syntax", "Functions"],
  tone: "encouraging",
  lastInteraction: Date.now(),
  frustrationLevel: 0,
  mood: "neutral"
};

const replies = {
  "what is a function": "A function is a reusable block of code that performs a specific task. Want to see a simple example?",
  "i’m stuck": "No worries! Let me guide you. Here's a simpler example...",
  "syntax": "Syntax can be tricky! Would you like a quick tip or a video?",
  "hello": "👋 Hey there! Ready for your next Python quest?",
  "how are you": "I'm always here to help you learn! How are you feeling today, champ? Need a power-up or a soft start?"
};

function respondToUser(input, context = {}) {
  const lower = input.toLowerCase();
  let response = replies[lower] || null;
  if (!response) {
    if (lower.includes("stuck") || lower.includes("help")) {
      response = "Looks like you need a hand. Want me to walk you through this with a short example?";
    } else if (lower.includes("next") || lower.includes("what now")) {
      response = suggestNextStep(context);
    } else {
      response = "I'm here for you! Ask me anything about your current lesson or let me know if you want a tip.";
    }
  }
  mentorState.lastInteraction = Date.now();
  return response;
}

function trackUserFrustration({ failedAttempts = 0, timeOnScreen = 0 } = {}) {
  if (failedAttempts >= 2 || timeOnScreen > 120) {
    mentorState.frustrationLevel++;
    return "Hey, looks like you’ve been stuck. Want me to walk you through this with a short example?";
  }
  return null;
}

function suggestNextStep(context = {}) {
  if (context.progress && context.progress > 80) {
    return "You’ve mastered the basics! Want to try building a Flashcard App now?";
  } else if (context.progress && context.progress > 50) {
    return "Great progress! Would you like to practice with a quiz or review a tricky topic?";
  } else {
    return "Let’s keep going step by step. Ready for the next lesson?";
  }
}

export { mentorState, respondToUser, trackUserFrustration, suggestNextStep };
