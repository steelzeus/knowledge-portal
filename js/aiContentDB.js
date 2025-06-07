// aiContentDB.js
// Massive AI-generated content structure for the Knowledge Portal
// SUBJECT → TOPIC → RESOURCE, with tagging, markdown/html, and quiz support

export const aiContentDB = [
  {
    subject: "Computer Science",
    icon: "fa-laptop-code",
    topics: [
      {
        name: "Algorithms & Data Structures",
        tags: ["beginner", "theory"],
        resources: [
          {
            type: "intro",
            difficulty: "beginner",
            content: `**What are Algorithms?**\nAlgorithms are step-by-step instructions for solving problems. Data structures organize data for efficient access and modification.\n\n*Example:* Sorting a list, searching for a value, or managing a queue.`
          },
          {
            type: "project",
            difficulty: "intermediate",
            content: `**Project Idea:**\nBuild a visualizer for sorting algorithms (Bubble, Merge, Quick). Show animations and compare their speeds.`
          },
          {
            type: "recommendation",
            difficulty: "beginner",
            content: `- [Grokking Algorithms](https://www.manning.com/books/grokking-algorithms) (Book)\n- [Khan Academy Algorithms](https://www.khanacademy.org/computing/computer-science/algorithms) (Course)`
          },
          {
            type: "quiz",
            difficulty: "beginner",
            questions: [
              {
                q: "What is the time complexity of binary search?",
                options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
                answer: 1
              },
              {
                q: "Which data structure uses FIFO order?",
                options: ["Stack", "Queue", "Tree", "Graph"],
                answer: 1
              },
              {
                q: "Which algorithm is NOT a sorting algorithm?",
                options: ["Bubble", "Merge", "Dijkstra", "Quick"],
                answer: 2
              },
              {
                q: "What is a linked list?",
                options: ["A type of array", "A collection of nodes with pointers", "A sorting method", "A search algorithm"],
                answer: 1
              },
              {
                q: "Which is the fastest for searching in a sorted array?",
                options: ["Linear search", "Binary search", "Bubble sort", "Selection sort"],
                answer: 1
              }
            ]
          }
        ]
      },
      {
        name: "Web Development",
        tags: ["beginner", "practical"],
        resources: [
          {
            type: "intro",
            difficulty: "beginner",
            content: `**Web Development**\nLearn to build websites using HTML, CSS, and JavaScript.\n\n*Example:* Create a personal portfolio site.`
          },
          {
            type: "project",
            difficulty: "intermediate",
            content: `**Project Idea:**\nBuild a responsive blog with a comment section and dark mode.`
          },
          {
            type: "recommendation",
            difficulty: "beginner",
            content: `- [freeCodeCamp Web Dev](https://www.freecodecamp.org/learn/) (Course)\n- [MDN Web Docs](https://developer.mozilla.org/) (Docs)`
          }
        ]
      },
      // ...add 8+ more topics for Computer Science
    ]
  },
  {
    subject: "Biology",
    icon: "fa-dna",
    topics: [
      {
        name: "Cell Biology",
        tags: ["beginner", "theory"],
        resources: [
          {
            type: "intro",
            content: `**Cells** are the basic units of life. They contain organelles like the nucleus, mitochondria, and ribosomes.`
          },
          {
            type: "project",
            content: `**Project Idea:**\nBuild a 3D model of a cell using household materials or 3D software.`
          },
          {
            type: "recommendation",
            content: `- [Crash Course Biology](https://www.youtube.com/playlist?list=PL3EED4C1D684D3ADF) (Video)\n- [The Cell: A Molecular Approach](https://www.ncbi.nlm.nih.gov/books/NBK9839/) (Book)`
          }
        ]
      },
      // ...add more topics for Biology
    ]
  },
  // ...add 8+ more subjects: History, Philosophy, Psychology, Economics, Electrical Engineering, Chemistry, Mathematics, Art, Literature, etc.
];

// Utility: Randomly regenerate topics (for mock/demo)
export function regenerateTopics() {
  // This is a placeholder for a more advanced AI/ML generator
  // For now, just shuffle topics for each subject
  aiContentDB.forEach(subject => {
    subject.topics = subject.topics.sort(() => Math.random() - 0.5);
  });
}
