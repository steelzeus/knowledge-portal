// js/subjectDetailHub.js
// Immersive subject detail hub: animated tabs, infinite scroll, glassmorphism, dynamic modules

// --- Dummy Content DB (simulate async fetch) ---
const MOCK_DB = {
  exams: Array.from({length: 30}, (_,i) => ({
    id: `exam_${i+1}`,
    title: `Practice Exam ${i+1}`,
    desc: `Challenge yourself with this exam.`,
    icon: '📝',
    progress: Math.floor(Math.random()*100)
  })),
  theory: Array.from({length: 40}, (_,i) => ({
    id: `theory_${i+1}`,
    title: `Theory Lesson ${i+1}`,
    desc: `Deep dive into theory concept #${i+1}.`,
    icon: '📖',
    progress: Math.floor(Math.random()*100)
  })),
  projects: Array.from({length: 20}, (_,i) => ({
    id: `proj_${i+1}`,
    title: `Project ${i+1}`,
    desc: `Build and create with this hands-on project.`,
    icon: '🛠️',
    progress: Math.floor(Math.random()*100)
  })),
  videos: Array.from({length: 25}, (_,i) => ({
    id: `vid_${i+1}`,
    title: `Video Lesson ${i+1}`,
    desc: `Watch and learn visually.`,
    icon: '🎥',
    progress: Math.floor(Math.random()*100)
  })),
  flashcards: Array.from({length: 50}, (_,i) => ({
    id: `fc_${i+1}`,
    title: `Flashcard Set ${i+1}`,
    desc: `Quick review with flashcards.`,
    icon: '🃏',
    progress: Math.floor(Math.random()*100)
  }))
};

// --- Glassmorphism Utility ---
function glassify(el) {
  el.style.backdropFilter = 'blur(18px)';
  el.style.background = 'rgba(255,255,255,0.18)';
  el.style.boxShadow = '0 8px 32px rgba(10,35,66,0.10)';
  el.style.border = '1.5px solid rgba(255,255,255,0.25)';
}

// --- Sidebar Topics (dummy) ---
const TOPICS = [
  'Overview','Key Concepts','Practice','Tips','Milestones','Resources','FAQ'
];

function renderSidebarTopics() {
  const ul = document.getElementById('sidebar-topic-list');
  if (!ul) return;
  ul.innerHTML = '';
  TOPICS.forEach((topic,i) => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `<a class="nav-link rounded-pill px-3 py-2" href="#">${topic}</a>`;
    li.querySelector('a').onclick = e => { e.preventDefault(); };
    ul.appendChild(li);
  });
}

// --- Infinite Scroll Content Loader ---
function setupInfiniteScroll(tab, tabKey) {
  let offset = 0;
  const BATCH = 8;
  const pane = document.getElementById(`tab-content-${tabKey}`);
  if (!pane) return;
  pane.innerHTML = '';
  function loadMore() {
    // Simulate async fetch
    setTimeout(() => {
      const items = MOCK_DB[tabKey].slice(offset, offset+BATCH);
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glass-card card mb-4 animate__animated animate__fadeInUp';
        card.style.borderRadius = '1.5rem';
        card.style.backdropFilter = 'blur(12px)';
        card.style.background = 'rgba(255,255,255,0.22)';
        card.style.boxShadow = '0 4px 24px rgba(10,35,66,0.10)';
        card.innerHTML = `
          <div class="d-flex align-items-center mb-2">
            <span class="fs-2 me-2">${item.icon}</span>
            <h5 class="mb-0 flex-grow-1">${item.title}</h5>
            <span class="badge bg-primary bg-gradient">${item.id.split('_')[0].toUpperCase()}</span>
          </div>
          <div class="mb-2 text-muted">${item.desc}</div>
          <div class="progress mb-2" style="height:8px;">
            <div class="progress-bar bg-success" role="progressbar" style="width:${item.progress}%" aria-valuenow="${item.progress}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <button class="btn btn-outline-primary btn-sm w-100">Open</button>
        `;
        pane.appendChild(card);
      });
      offset += BATCH;
      loading = false;
    }, 350);
  }
  let loading = false;
  pane.onscroll = () => {
    if (loading) return;
    if (pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 120) {
      loading = true;
      loadMore();
    }
  };
  // Initial load
  loadMore();
}

// --- Tab Animation & Switching ---
function setupTabs() {
  const tabKeys = ['exams','theory','projects','videos','flashcards'];
  tabKeys.forEach(tabKey => {
    const btn = document.getElementById(`tab-${tabKey}`);
    if (btn) {
      btn.addEventListener('shown.bs.tab', () => {
        setupInfiniteScroll(btn, tabKey);
      });
    }
  });
  // Load first tab by default
  setupInfiniteScroll(document.getElementById('tab-exams'), 'exams');
}

// --- Sidebar Collapse (Mobile) ---
document.addEventListener('DOMContentLoaded', () => {
  // Glassmorphism
  document.querySelectorAll('.glass-main,.glass-sidebar').forEach(glassify);
  // Sidebar topics
  renderSidebarTopics();
  // Sidebar toggle
  const sidebar = document.getElementById('subject-sidebar');
  const toggle = document.getElementById('sidebar-toggle');
  if (toggle && sidebar) {
    toggle.onclick = () => {
      sidebar.classList.toggle('collapsed');
      sidebar.style.display = sidebar.classList.contains('collapsed') ? 'none' : '';
    };
  }
  // Tabs
  setupTabs();
});

// --- Subject Title (dummy) ---
document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('subject-detail-title');
  if (title) title.textContent = 'Subject Learning Hub';
});
