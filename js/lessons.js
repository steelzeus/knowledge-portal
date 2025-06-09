// lessons.js
// Dummy lessons database grouped by subject ID

export const LESSONS = {
  cs: [
    { id: 'cs-1', title: 'Intro to Programming', summary: 'Learn the basics of programming and algorithms.' },
    { id: 'cs-2', title: 'Data Structures', summary: 'Explore arrays, lists, stacks, and queues.' },
    { id: 'cs-3', title: 'Web Development', summary: 'Build your first website using HTML, CSS, and JS.' }
  ],
  math: [
    { id: 'math-1', title: 'Algebra Fundamentals', summary: 'Master variables, equations, and expressions.' },
    { id: 'math-2', title: 'Geometry Basics', summary: 'Understand shapes, angles, and theorems.' }
  ],
  physics: [
    { id: 'phy-1', title: 'Classical Mechanics', summary: 'Study motion, forces, and Newton’s laws.' },
    { id: 'phy-2', title: 'Thermodynamics', summary: 'Explore heat, energy, and entropy.' }
  ]
  // Add more subjects and lessons as needed
};
