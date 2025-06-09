// subjectRouter.js
// Handles dynamic subject routing, tab switching, and section rendering
import { SUBJECTS } from './subjectConfig.js';
import { LESSONS } from './lessons.js';
import { goToSubjectDetail } from './navigation.js';

let parallaxBgInitialized = false;

import DEBUG from './debug.js';

// --- Parallax Background (optional, can be removed for simplicity) ---
function createParallaxBG() {
  // Only initialize once DOM is ready
  if (!document.body || parallaxBgInitialized) return;
  parallaxBgInitialized = true;
  DEBUG.log('Initializing parallax background');
  
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
    
    // Use passive scroll listener for better performance
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        bg.style.backgroundPosition = `60% ${40 + y/30}%, 20% ${80 + y/60}%`;
      });
    }, { passive: true });
  }
}

// --- Subject List with Search ---
export function renderSubjectList() {
  // Ensure the parallax background is initialized
  createParallaxBG();

  const list = document.getElementById('subject-list');
  if (!list) return;
  list.innerHTML = '';

  // Create search bar if it doesn't exist
  let searchBar = document.getElementById('subject-search-bar');
  if (!searchBar) {
    searchBar = document.createElement('input');
    searchBar.id = 'subject-search-bar';
    searchBar.type = 'search';
    searchBar.placeholder = 'Search subjects...';
    searchBar.className = 'form-control mb-4';
    list.parentElement.insertBefore(searchBar, list);

    // Add search handler using event delegation for better performance
    const debounceTimeout = 300;
    let timeoutId = null;
    searchBar.addEventListener('input', (e) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => renderCards(e.target.value), debounceTimeout);
    });
  }

  // Render subject cards with optional filter
  function renderCards(filter = '') {
    if (!list) return; // Extra safety check
    list.innerHTML = '';
    const filterLower = filter.trim().toLowerCase();
    const filtered = SUBJECTS.filter(s =>
      s.name.toLowerCase().includes(filterLower) ||
      s.description?.toLowerCase().includes(filterLower)
    );

    const fragment = document.createDocumentFragment();
    filtered.forEach(subject => {
      const card = document.createElement('div');
      card.className = 'p-3 text-center card';
      card.style.width = '140px';
      card.setAttribute('data-aos', 'fade-up');
      card.innerHTML = `
        <div class="mb-2 subject-icon"><i class="fa ${subject.icon}"></i></div>
        <div class="fw-bold">${subject.name}</div>
      `;
      card.addEventListener('click', () => goToSubjectDetail(subject.id));
      fragment.appendChild(card);
    });
    list.appendChild(fragment);
  }

  // Initial render
  renderCards();
}

// --- Subject Detail Page ---
export function renderSubjectDetail(subjectId) {
  const screen = document.getElementById('subject-detail-screen');
  if (!screen) return;
  
  const subject = SUBJECTS.find(s => s.id === subjectId);
  if (!subject) {
    screen.innerHTML = '<div class="alert alert-danger">Subject not found.</div>';
    return;
  }

  // Create content using a document fragment for better performance
  const template = document.createElement('template');
  template.innerHTML = `
    <div class="container py-4">
      <div class="d-flex align-items-center mb-4">
        <div class="subject-icon me-3" style="font-size:2.8rem;"><i class="fa ${subject.icon}"></i></div>
        <div>
          <h2 class="fw-bold mb-1">${subject.name}</h2>
          <div class="text-muted mb-2">${subject.description || ''}</div>
        </div>
      </div>
      <div class="row g-4">
        <div class="col-12 col-md-8">
          <div class="card p-4 mb-3">
            <h4 class="fw-bold mb-3">Lessons & Modules</h4>
            <div id="subject-lessons-list" class="d-flex flex-column gap-3"></div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card p-3 mb-3">
            <h5 class="fw-bold mb-2">About this subject</h5>
            <div>${subject.description || ''}</div>
          </div>
        </div>
      </div>
      <div class="mt-4 text-center">
        <button class="btn btn-outline-primary" onclick="showScreen('modular-subject-screen')">Back to Subjects</button>
      </div>
    </div>
  `;

  // Replace content
  screen.innerHTML = '';
  screen.appendChild(template.content);

  // Render lessons after the main content is in place
  const lessonsList = document.getElementById('subject-lessons-list');
  if (lessonsList) {
    const lessons = LESSONS[subjectId] || [];
    if (lessons.length === 0) {
      lessonsList.innerHTML = '<div class="text-muted">No lessons available for this subject yet.</div>';
    } else {
      const lessonsTemplate = document.createElement('template');
      lessonsTemplate.innerHTML = lessons.map(lesson => `
        <div class="card lesson-card p-3 mb-2" style="border-left:4px solid #00cfff;">
          <div class="fw-bold mb-1">${lesson.title}</div>
          <div class="text-muted small">${lesson.summary || ''}</div>
        </div>
      `).join('');
      lessonsList.appendChild(lessonsTemplate.content);
    }
  }
}
