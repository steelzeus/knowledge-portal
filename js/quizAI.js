// quizAI.js
// Offline AI simulation for question generation

const knowledgeBank = {
  "python": [
    { name: "variable", definition: "A container for storing data values." },
    { name: "list", definition: "An ordered, mutable collection of items." },
    { name: "function", definition: "A block of code which only runs when it is called." },
    { name: "tuple", definition: "An ordered, immutable collection of items." },
    { name: "dictionary", definition: "A collection of key-value pairs." }
  ],
  "javascript": [
    { name: "closure", definition: "A function having access to the parent scope, even after the parent function has closed." },
    { name: "promise", definition: "An object representing the eventual completion or failure of an asynchronous operation." },
    { name: "array", definition: "A list-like object used to store multiple values." }
  ]
};

function getRandomConcept(topic) {
  const concepts = knowledgeBank[topic.toLowerCase()];
  if (!concepts) return null;
  return concepts[Math.floor(Math.random() * concepts.length)];
}

function shuffle(arr) {
  return arr.map(v => [Math.random(), v]).sort().map(a => a[1]);
}

function generateDistractors(concept, topic) {
  const concepts = knowledgeBank[topic.toLowerCase()] || [];
  return shuffle(concepts.filter(c => c.name !== concept.name).map(c => c.definition)).slice(0, 3);
}

function generateQuestion(topic, difficulty) {
  const concept = getRandomConcept(topic);
  if (!concept) return null;
  const question = `Which of the following best describes ${concept.name}?`;
  const options = shuffle([concept.definition, ...generateDistractors(concept, topic)]);
  return {
    type: 'mcq',
    question,
    options,
    answer: concept.definition,
    difficulty
  };
}

function generateRandomTopic() {
  const topics = Object.keys(knowledgeBank);
  return topics[Math.floor(Math.random() * topics.length)];
}

export { generateQuestion, generateRandomTopic, knowledgeBank };
