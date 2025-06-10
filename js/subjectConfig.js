// subjectConfig.js
// Configuration for modular subject architecture

export const SUBJECTS = {
  cs: {
    id: 'cs',
    name: 'Computer Science',
    icon: 'fa-laptop-code',
    description: 'Programming, algorithms, and more.',
    sections: {
      intro: {
        id: 'intro',
        name: 'Introduction',
        resources: [
          {
            id: 'getting-started',
            title: 'Getting Started with Programming',
            type: 'article',
            description: 'Learn the basics of programming'
          }
        ]
      }
    }
  },
  math: {
    id: 'math',
    name: 'Mathematics',
    icon: 'fa-square-root-alt',
    description: 'Math projects and challenges.',
    sections: {
      algebra: {
        id: 'algebra',
        name: 'Algebra',
        resources: []
      }
    }
  },
  physics: {
    id: 'physics',
    name: 'Physics',
    icon: 'fa-atom',
    description: 'Physics simulations and experiments.',
    sections: {
      mechanics: {
        id: 'mechanics',
        name: 'Mechanics',
        resources: []
      }
    }
  }
};
