// aiPathSuggestor.js
// Mock AI engine for personalized curriculum path suggestions

function suggestPath({ subject, weakAreas, timeAvailable }) {
  // Simple logic: weak areas first, then next logical topics
  const allTopics = {
    "Computer Science": ["Intro to Programming", "Python Basics", "Functions", "OOP", "DSA Basics", "Projects"]
  };
  const base = allTopics[subject] || [];
  const personalizedPath = [...weakAreas];
  base.forEach(topic => {
    if (!personalizedPath.includes(topic)) personalizedPath.push(topic);
  });
  const recommendations = [];
  if (weakAreas.length) {
    recommendations.push("Revise your weak areas first: " + weakAreas.join(", "));
  } else {
    recommendations.push("Advance to the next topic in your roadmap.");
  }
  recommendations.push(`Try to complete these in ${timeAvailable}.`);
  return { personalizedPath, recommendations };
}

function ambitionFirstPath(goal) {
  // Map ambition to optimal path
  const ambitions = {
    "build a website": ["HTML/CSS", "JavaScript", "GitHub Deployment", "Project: Portfolio Site"]
  };
  return ambitions[goal.toLowerCase()] || [];
}

export { suggestPath, ambitionFirstPath };
