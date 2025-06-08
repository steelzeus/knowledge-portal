// subjectRouter.js
// Handles dynamic subject routing, tab switching, and section rendering
import { SUBJECTS } from './subjectConfig.js';

// --- Dynamic Subject Data with Gradients, Icons, and Descriptions ---
// const SUBJECTS = [
//   {
//     id: 'cs', name: 'Computer Science',
//     icon: 'fa-laptop-code',
//     gradient: 'linear-gradient(135deg,#00cfff 0%,#005bea 100%)',
//     desc: 'Code, algorithms, and the digital future.'
//   },
//   {
//     id: 'math', name: 'Mathematics',
//     icon: 'fa-square-root-alt',
//     gradient: 'linear-gradient(135deg,#ffb300 0%,#ff6e7f 100%)',
//     desc: 'Logic, numbers, and the language of the universe.'
//   },
//   {
//     id: 'physics', name: 'Physics',
//     icon: 'fa-atom',
//     gradient: 'linear-gradient(135deg,#a259ff 0%,#38ef7d 100%)',
//     desc: 'Matter, energy, and the laws of nature.'
//   },
//   {
//     id: 'chem', name: 'Chemistry',
//     icon: 'fa-flask',
//     gradient: 'linear-gradient(135deg,#ff5e5e 0%,#ffc371 100%)',
//     desc: 'Reactions, molecules, and the science of change.'
//   },
//   {
//     id: 'bio', name: 'Biology',
//     icon: 'fa-dna',
//     gradient: 'linear-gradient(135deg,#00e676 0%,#43cea2 100%)',
//     desc: 'Life, evolution, and the living world.'
//   },
//   {
//     id: 'history', name: 'History',
//     icon: 'fa-landmark',
//     gradient: 'linear-gradient(135deg,#ff8a65 0%,#ffd452 100%)',
//     desc: 'Civilizations, revolutions, and the story of us.'
//   },
//   {
//     id: 'eco', name: 'Economics',
//     icon: 'fa-chart-line',
//     gradient: 'linear-gradient(135deg,#00bfae 0%,#1de9b6 100%)',
//     desc: 'Markets, money, and the science of choice.'
//   },
//   {
//     id: 'philosophy', name: 'Philosophy',
//     icon: 'fa-brain',
//     gradient: 'linear-gradient(135deg,#232526 0%,#414345 100%)',
//     desc: 'Wisdom, logic, and the art of thinking.'
//   },
//   {
//     id: 'literature', name: 'Literature',
//     icon: 'fa-book-open',
//     gradient: 'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)',
//     desc: 'Stories, poetry, and the power of words.'
//   },
//   {
//     id: 'art', name: 'Art',
//     icon: 'fa-palette',
//     gradient: 'linear-gradient(135deg,#f7971e 0%,#ffd200 100%)',
//     desc: 'Creativity, expression, and visual wonder.'
//   },
//   {
//     id: 'music', name: 'Music',
//     icon: 'fa-music',
//     gradient: 'linear-gradient(135deg,#43cea2 0%,#185a9d 100%)',
//     desc: 'Rhythm, harmony, and the sound of emotion.'
//   }
// ];

// --- Parallax Background ---
function createParallaxBG() {
  let bg = document.getElementById('parallax-bg');
  if (!bg) {
    bg = document.createElement('div');
    bg.id = 'parallax-bg';
    bg.style.position = 'fixed';
    bg.style.top = 0;
    bg.style.left = 0;
    bg.style.width = '100vw';
    bg.style.height = '100vh';
    bg.style.zIndex = 0;
    bg.style.background = 'radial-gradient(circle at 60% 40%, #00cfff33 0%, transparent 70%), radial-gradient(circle at 20% 80%, #ffb30033 0%, transparent 70%), #0a2342';
    bg.style.transition = 'background 0.5s';
    document.body.prepend(bg);
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      bg.style.backgroundPosition = `60% ${40 + y/30}%, 20% ${80 + y/60}%`;
    });
  }
}

// --- Animated Subject Card Grid ---
export function renderSubjectList() {
  createParallaxBG();
  const list = document.getElementById('subject-list');
  if (!list) return;
  list.innerHTML = '';
  SUBJECTS.forEach((subj, i) => {
    const card = document.createElement('div');
    card.className = 'subject-card-anim card p-4 text-center shadow-lg border-0';
    card.style.background = subj.gradient;
    card.style.color = '#fff';
    card.style.borderRadius = '2rem';
    card.style.margin = '1rem';
    card.style.minWidth = '220px';
    card.style.maxWidth = '260px';
    card.style.cursor = 'pointer';
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('data-subject', subj.id);
    card.setAttribute('data-aos', 'zoom-in');
    card.setAttribute('data-aos-delay', 80*i);
    card.innerHTML = `
      <div class="subject-icon mb-3" style="font-size:3rem;"><i class="fa ${subj.icon}"></i></div>
      <div class="fw-bold mb-2" style="font-size:1.3rem;">${subj.name}</div>
      <div class="mb-2" style="font-size:1rem;opacity:0.85;">${subj.desc}</div>
      <div class="subject-card-glow"></div>
    `;
    card.onmouseover = () => {
      card.style.transform = 'scale(1.04) rotate(-1deg)';
      card.style.boxShadow = `0 12px 48px ${subj.gradient.split(' ')[0]}55, 0 2px 8px #0a234233`;
    };
    card.onmouseout = () => {
      card.style.transform = '';
      card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
    };
    card.onclick = () => showSubject(subj.id);
    card.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') showSubject(subj.id); };
    list.appendChild(card);
  });
  if (window.AOS) AOS.refresh();
}

// function showSubject(subjectId) {
//   const subj = subjects.find(s => s.id === subjectId);
//   if (!subj) return;
//   document.getElementById('subject-section-title').textContent = subj.name;
//   renderTabs(subj);
//   showSection(subj.id, subj.sections[0]);
// }

// function renderTabs(subj) {
//   const tabNav = document.getElementById('subject-tabs');
//   if (!tabNav) return;
//   tabNav.innerHTML = '';
//   subj.sections.forEach(section => {
//     const tabBtn = document.createElement('button');
//     tabBtn.className = 'nav-link';
//     tabBtn.textContent = section;
//     tabBtn.onclick = () => showSection(subj.id, section);
//     tabNav.appendChild(tabBtn);
//   });
// }

// function showSection(subjectId, section) {
//   const content = document.getElementById('subject-section-content');
//   if (!content) return;
//   // Loader animation placeholder
//   content.innerHTML = `<div class='text-center my-4'><div class='spinner-border text-primary' role='status'></div></div>`;
//   setTimeout(() => {
//     // Placeholder for unimplemented sections
//     content.innerHTML = `<div class='alert alert-info text-center my-4'>${section} for ${subjectId.toUpperCase()} coming soon!</div>`;
//   }, 500);
// }
