// curriculumFlow.js
// Dynamic roadmap builder for visual curriculum maps

const knowledgeGraphs = {
  "Computer Science": [
    { id: "intro_programming", title: "Intro to Programming", estimatedTime: "1 week", prerequisites: [], resources: ["book_intro", "video_intro"], status: "unlocked" },
    { id: "python_basics", title: "Python Basics", estimatedTime: "2 weeks", prerequisites: ["intro_programming"], resources: ["book_python", "video_python", "quiz_python"], status: "locked" },
    { id: "functions", title: "Functions", estimatedTime: "1 week", prerequisites: ["python_basics"], resources: ["video_functions", "quiz_functions"], status: "locked" },
    { id: "oop", title: "OOP", estimatedTime: "2 weeks", prerequisites: ["functions"], resources: ["book_oop", "video_oop", "quiz_oop"], status: "locked" },
    { id: "data_structures", title: "Data Structures", estimatedTime: "2 weeks", prerequisites: ["oop"], resources: ["book_ds", "quiz_ds"], status: "locked" },
    { id: "project_basic", title: "Project: Calculator App", estimatedTime: "1 week", prerequisites: ["data_structures"], resources: ["project_guide"], status: "locked" }
  ]
};

function getUserRoadmap(subject, userProgress = {}) {
  // Deep copy to avoid mutating the base graph
  const graph = JSON.parse(JSON.stringify(knowledgeGraphs[subject]));
  // Unlock nodes based on progress
  graph.forEach(node => {
    if (userProgress[node.id] === 'complete') {
      node.status = 'complete';
    } else if (node.prerequisites.every(pr => userProgress[pr] === 'complete')) {
      node.status = 'unlocked';
    } else {
      node.status = 'locked';
    }
  });
  return graph;
}

function completeNode(subject, nodeId, userProgress) {
  userProgress[nodeId] = 'complete';
  return getUserRoadmap(subject, userProgress);
}

export { knowledgeGraphs, getUserRoadmap, completeNode };
