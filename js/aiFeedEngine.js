// aiFeedEngine.js
// AI-powered personalized learning feed engine

function scoreContent(user, content) {
  // Mock scoring: boost for weak areas, recent activity, preferred format, time available
  let score = 0;
  if (content.type === 'quiz' && user.quizPerformance[content.topic] === 'weak') score += 30;
  if (content.type === 'video' && user.preferredFormat === 'video') score += 20;
  if (content.type === 'project' && user.roadmapStatus.includes(content.roadmapNode)) score += 15;
  if (content.duration && parseInt(content.duration) <= parseInt(user.timeAvailable)) score += 10;
  if (content.type === 'micro-lesson') score += 25;
  if (content.type === 'quiz' && user.recentActivity.includes(content.topic)) score += 10;
  if (content.type === 'project' && user.XP < 500) score += 10;
  // ...more rules as needed
  return score;
}

function generateFeed(user) {
  // Mock content pool
  const contentPool = [
    {
      type: 'video',
      topic: 'loops',
      title: 'Mastering Loops in Python',
      duration: '6',
      reason: "Because you're strong in loops — take it to the next level.",
      action: 'Watch Now',
      icon: '🎥',
      XP: 50
    },
    {
      type: 'quiz',
      topic: 'functions',
      title: 'Functions Practice Challenge',
      difficulty: 'medium',
      reason: "You're weak in Functions",
      action: 'Start Quiz',
      icon: '🧪',
      XP: 30
    },
    {
      type: 'project',
      roadmapNode: 'project_basic',
      title: 'Build a CLI Calculator',
      XP: 300,
      action: 'Start Project',
      icon: '💻'
    },
    {
      type: 'micro-lesson',
      title: "Today's Micro-Lesson: List Comprehensions",
      duration: '4',
      reason: 'Daily bite-sized learning',
      action: 'Learn Now',
      icon: '📘',
      XP: 15
    },
    {
      type: 'quiz',
      topic: 'loops',
      title: 'Loops Mastery Quiz',
      difficulty: 'hard',
      reason: 'Finish this quiz to unlock next chapter',
      action: 'Start Quiz',
      icon: '🧪',
      XP: 40
    },
    {
      type: 'project',
      roadmapNode: 'project_basic',
      title: 'Other users like you built this project',
      XP: 300,
      action: 'View Project',
      icon: '💻'
    }
  ];
  // Score and sort
  const scored = contentPool.map(c => ({ ...c, _score: scoreContent(user, c) }));
  scored.sort((a, b) => b._score - a._score);
  return scored;
}

export { generateFeed };
