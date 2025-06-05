// mentorFeedback.js
// Automated mentor feedback system for project steps

const resourceDB = {
  "ui": [
    { title: "Bootstrap Docs", url: "https://getbootstrap.com/docs/" },
    { title: "UI Design Basics", url: "https://www.smashingmagazine.com/2018/01/essential-ui-design-tools/" }
  ],
  "debug": [
    { title: "JS Debugging Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Debugging" }
  ],
  "calculator": [
    { title: "Build a Calculator App", url: "https://www.freecodecamp.org/news/how-to-build-a-calculator-app-with-javascript/" }
  ]
};

function suggestResources(step) {
  const matches = [];
  for (const key in resourceDB) {
    if (step.toLowerCase().includes(key)) matches.push(...resourceDB[key]);
  }
  return matches;
}

function generateFeedback(step, notes, status, streak = 0) {
  let feedback = "";
  if (status === "in progress" && notes && notes.toLowerCase().includes("stuck")) {
    const resources = suggestResources(step.step);
    feedback += `It seems you're stuck on "${step.step}". Revisit the concept and try these resources:\n`;
    resources.forEach(r => feedback += `- [${r.title}](${r.url})\n`);
    if (!resources.length) feedback += "- Try searching for tutorials on this topic.\n";
  } else if (status === "done") {
    feedback += `Great job completing "${step.step}"! Keep up the momentum.`;
    if (streak > 2) feedback += ` You're on a ${streak}-day streak! 🚀`;
  } else if (status === "in progress") {
    feedback += `You're making progress on "${step.step}". Stay focused!`;
  } else {
    feedback += `Ready to start "${step.step}"? Let me know if you need help!`;
  }
  return feedback;
}

export { generateFeedback, suggestResources, resourceDB };
