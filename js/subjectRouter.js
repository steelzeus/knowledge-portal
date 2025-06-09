// subjectRouter.js
// Handles dynamic subject routing, tab switching, and section rendering
import { SUBJECTS } from './subjectConfig.js';
import { LESSONS } from './lessons.js';
import { goToSubjectDetail } from '../main.js';

// --- Parallax Background (optional, can be removed for simplicity) ---
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

// --- Subject List with Search ---
export function renderSubjectList() {
  createParallaxBG();
  const list = document.getElementById('subject-list');
  if (!list) return;
  list.innerHTML = '';

  // Search bar
  let searchBar = document.getElementById('subject-search-bar');
  if (!searchBar) {
    searchBar = document.createElement('input');
    searchBar.id = 'subject-search-bar';
    searchBar.type = 'search';
    searchBar.placeholder = 'Search subjects...';
    searchBar.className = 'form-control mb-4';
    list.parentElement.insertBefore(searchBar, list);
  }

  // Render cards
  function renderCards(filter = '') {
    list.innerHTML = '';
    const filterLower = filter.trim().toLowerCase();
    const filtered = SUBJECTS.filter(s =>
      s.name.toLowerCase().includes(filterLower) ||
      (s.description && s.description.toLowerCase().includes(filterLower))
    );
    if (filtered.length === 0) {
      list.innerHTML = '<div class="text-muted">No subjects found.</div>';
      return;
    }
    filtered.forEach(subject => {
      const card = document.createElement('div');
      card.className = 'p-3 text-center card subject-card m-2';
      card.style.width = '180px';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <div class="mb-2 subject-icon" style="font-size:2.2rem;"><i class="fa ${subject.icon}"></i></div>
        <div class="fw-bold mb-1">${subject.name}</div>
        <div class="small text-muted mb-2">${subject.description || ''}</div>
      `;
      card.onclick = () => goToSubjectDetail(subject.id);
      card.onmouseover = () => card.style.boxShadow = '0 8px 32px #00ff9933, 0 2px 8px #0a234233';
      card.onmouseout = () => card.style.boxShadow = '';
      list.appendChild(card);
    });
  }
  renderCards();
  searchBar.oninput = e => renderCards(e.target.value);
}

// --- Subject Detail Renderer ---
export function renderSubjectDetail(subjectId) {
  const screen = document.getElementById('subject-detail-screen');
  if (!screen) return;
  const subject = SUBJECTS.find(s => s.id === subjectId);
  if (!subject) {
    screen.innerHTML = '<div class="alert alert-danger">Subject not found.</div>';
    return;
  }
  screen.innerHTML = `
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
  // Render lessons for this subject
  const lessonsList = document.getElementById('subject-lessons-list');
  if (lessonsList) {
    const lessons = LESSONS[subjectId] || [];
    if (lessons.length === 0) {
      lessonsList.innerHTML = '<div class="text-muted">No lessons available for this subject yet.</div>';
    } else {
      lessonsList.innerHTML = lessons.map(lesson => `
        <div class="card lesson-card p-3 mb-2" style="border-left:4px solid #00cfff;">
          <div class="fw-bold mb-1">${lesson.title}</div>
          <div class="text-muted small">${lesson.summary || ''}</div>
        </div>
      `).join('');
    }
  }
}
