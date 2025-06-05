// learningPathEngine.js
// Dynamic personalized learning path generator for SPA

/**
 * Subject blueprints: Each subject has stages with increasing complexity.
 * Each stage contains: title, description, resource URL, type, and base difficulty.
 */
const SUBJECT_BLUEPRINTS = {
    'Computer Science': [
        {
            title: 'Introduction to Computers',
            description: 'Learn what computers are and how they work.',
            url: 'https://www.khanacademy.org/computing/computer-science',
            type: 'video',
            difficulty: 1
        },
        {
            title: 'Programming Basics',
            description: 'Start coding with simple programs.',
            url: 'https://www.codecademy.com/learn/introduction-to-javascript',
            type: 'reading',
            difficulty: 2
        },
        {
            title: 'Variables and Data Types',
            description: 'Understand variables, types, and storage.',
            url: 'https://www.freecodecamp.org/news/variables-and-data-types/',
            type: 'reading',
            difficulty: 2
        },
        {
            title: 'Control Structures',
            description: 'Learn about if-else, loops, and logic.',
            url: 'https://www.learn-js.org/en/Control_flow',
            type: 'video',
            difficulty: 3
        },
        {
            title: 'Functions and Modular Code',
            description: 'Write reusable code with functions.',
            url: 'https://www.youtube.com/watch?v=kr0mpwqttM0',
            type: 'video',
            difficulty: 3
        },
        {
            title: 'Arrays and Data Structures',
            description: 'Work with arrays and basic data structures.',
            url: 'https://www.geeksforgeeks.org/data-structures/',
            type: 'reading',
            difficulty: 4
        },
        {
            title: 'Object-Oriented Programming',
            description: 'Learn about classes and objects.',
            url: 'https://www.freecodecamp.org/news/object-oriented-programming/',
            type: 'video',
            difficulty: 4
        },
        {
            title: 'Build a Simple Calculator',
            description: 'Project: Create a calculator app.',
            url: 'https://www.theodinproject.com/lessons/foundations-calculator',
            type: 'project',
            difficulty: 5
        },
        {
            title: 'Debugging and Testing',
            description: 'Learn to debug and test your code.',
            url: 'https://www.codecademy.com/articles/debugging-code',
            type: 'reading',
            difficulty: 5
        },
        {
            title: 'Quiz: Programming Fundamentals',
            description: 'Test your knowledge with a quiz.',
            url: 'https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS',
            type: 'quiz',
            difficulty: 6
        },
        {
            title: 'Build a To-Do List App',
            description: 'Project: Apply your skills to build a to-do app.',
            url: 'https://www.freecodecamp.org/news/javascript-projects-for-beginners/',
            type: 'project',
            difficulty: 7
        },
        {
            title: 'Articles: Best Practices',
            description: 'Read about best practices in programming.',
            url: 'https://www.smashingmagazine.com/2012/10/12-principles-keep-in-mind-when-writing-code/',
            type: 'reading',
            difficulty: 7
        }
    ],
    'Mathematics': [
        // Placeholder for future expansion
    ],
    'Physics': [
        // Placeholder for future expansion
    ]
};

/**
 * Matches user ambition to available subject(s).
 * @param {string} ambition - User's ambition or goal.
 * @returns {string[]} Array of matching subject names.
 */
export function matchSubjectsToAmbition(ambition) {
    if (!ambition) return [];
    const lower = ambition.toLowerCase();
    const matches = Object.keys(SUBJECT_BLUEPRINTS).filter(subject =>
        lower.includes(subject.toLowerCase())
    );
    // Fallback: if no direct match, suggest all
    return matches.length ? matches : Object.keys(SUBJECT_BLUEPRINTS);
}

/**
 * Adjusts the base difficulty of a stage based on user age and education.
 * @param {number} difficulty - The base difficulty of the stage.
 * @param {number} userAge - User's age.
 * @param {string} userEdu - User's education level.
 * @returns {number} Adjusted difficulty score.
 */
export function adjustForLevel(difficulty, userAge, userEdu) {
    let adj = difficulty;
    if (userEdu) {
        if (userEdu.toLowerCase().includes('graduate')) adj += 2;
        else if (userEdu.toLowerCase().includes('undergraduate')) adj += 1;
        else if (userEdu.toLowerCase().includes('high school')) adj -= 1;
    }
    if (userAge) {
        if (userAge < 16) adj -= 1;
        else if (userAge > 22) adj += 1;
    }
    return Math.max(1, adj);
}

/**
 * Generates a personalized learning path based on user data.
 * @param {Object} userData - { name, age, educationLevel, ambition }
 * @returns {Array} Array of weekly goal/content block objects.
 */
export function generateLearningPath(userData) {
    const { name, age, educationLevel, ambition } = userData;
    const subjects = matchSubjectsToAmbition(ambition);
    // For now, pick the first matching subject
    const subject = subjects[0] || 'Computer Science';
    const blueprint = SUBJECT_BLUEPRINTS[subject] || [];
    // Score and sort topics by adjusted difficulty
    const scored = blueprint.map(stage => ({
        ...stage,
        adjustedDifficulty: adjustForLevel(stage.difficulty, age, educationLevel)
    }));
    // Sort by adjusted difficulty, then by original order
    scored.sort((a, b) => a.adjustedDifficulty - b.adjustedDifficulty);
    // Build weekly goals/content blocks
    const path = scored.map((stage, i) => ({
        week: i + 1,
        title: stage.title,
        description: stage.description,
        url: stage.url,
        type: stage.type,
        difficulty: stage.adjustedDifficulty
    }));
    return path;
}

// Export blueprints for reference or UI
export { SUBJECT_BLUEPRINTS };

/**
 * Example usage:
 * import { generateLearningPath } from './learningPathEngine.js';
 * const userData = { name: 'Alice', age: 18, educationLevel: 'High School', ambition: 'Learn Computer Science' };
 * const path = generateLearningPath(userData);
 */
