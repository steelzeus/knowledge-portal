// feedUI.js
// Renders the AI-powered personalized learning feed
import { generateFeed } from './aiFeedEngine.js';

// Masonry-style, infinite scroll learning feed
const SUBJECT_COLORS = {
  cs: '#00cfff',
  math: '#ffb300',
  physics: '#a259ff',
  chem: '#ff5e5e',
  bio: '#00e676',
  history: '#ff8a65',
  eco: '#00bfae'
};
const TYPE_ICONS = {
  article: '📖',
  video: '🎥',
  quiz: '📝',
  book: '📚',
  project: '🛠️',
  reading: '📖'
};

function generateDummyFeedItems(count = 30, offset = 0) {
  const subjects = Object.keys(SUBJECT_COLORS);
  const types = Object.keys(TYPE_ICONS);
  const items = [];
  for (let i = 0; i < count; i++) {
    const subject = subjects[(i + offset) % subjects.length];
    const type = types[(i + offset) % types.length];
    items.push({
      id: `item_${offset + i}`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} on ${subject.toUpperCase()}`,
      subject,
      type,
      estimatedTime: `${5 + ((i + offset) % 6) * 5} min ${type === 'video' ? 'watch' : 'read'}`,
      description: `A great ${type} to boost your ${subject} skills!`,
      saved: false
    });
  }
  return items;
}

let feedItems = [];
let feedOffset = 0;
const FEED_BATCH_SIZE = 20;
let loading = false;

function renderFeedItems(newItems) {
  const feed = document.getElementById('feed-masonry');
  if (!feed) return;
  newItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card feed-card mb-4';
    card.style.borderLeft = `8px solid ${SUBJECT_COLORS[item.subject] || '#00cfff'}`;
    card.setAttribute('data-aos', 'fade-up');
    card.innerHTML = `
      <div class="d-flex align-items-center mb-2">
        <span class="badge me-2" style="background:${SUBJECT_COLORS[item.subject]};color:#fff;">${item.subject.toUpperCase()}</span>
        <span class="ms-auto fs-4">${TYPE_ICONS[item.type] || '📚'}</span>
      </div>
      <h5 class="card-title mb-1">${item.title}</h5>
      <div class="text-muted mb-2" style="font-size:0.95rem;">${item.estimatedTime}</div>
      <p class="card-text">${item.description}</p>
      <button class="btn btn-light btn-save" data-id="${item.id}"><i class="fa${item.saved ? 's' : 'r'} fa-heart"></i> Save</button>
    `;
    card.style.background = '#fff';
    card.style.borderRadius = '1.5rem';
    card.style.boxShadow = '0 4px 24px rgba(10,35,66,0.08)';
    card.style.transition = 'transform 0.2s, box-shadow 0.2s';
    card.onmouseover = () => {
      card.style.transform = 'translateY(-4px) scale(1.03)';
      card.style.boxShadow = `0 8px 32px ${SUBJECT_COLORS[item.subject]}33, 0 2px 8px #0a234233`;
    };
    card.onmouseout = () => {
      card.style.transform = '';
      card.style.boxShadow = '0 4px 24px rgba(10,35,66,0.08)';
    };
    feed.appendChild(card);
  });
  // Save button logic
  feed.querySelectorAll('.btn-save').forEach(btn => {
    btn.onclick = function() {
      const id = btn.getAttribute('data-id');
      const idx = feedItems.findIndex(f => f.id === id);
      if (idx >= 0) {
        feedItems[idx].saved = !feedItems[idx].saved;
        btn.innerHTML = `<i class="fa${feedItems[idx].saved ? 's' : 'r'} fa-heart"></i> Save`;
        btn.classList.toggle('text-danger', feedItems[idx].saved);
      }
    };
  });
  if (window.AOS) AOS.refresh();
}

function loadMoreFeedItems() {
  if (loading) return;
  loading = true;
  setTimeout(() => {
    const newItems = generateDummyFeedItems(FEED_BATCH_SIZE, feedOffset);
    feedItems = feedItems.concat(newItems);
    renderFeedItems(newItems);
    feedOffset += FEED_BATCH_SIZE;
    loading = false;
    if (window.Masonry) new Masonry('#feed-masonry', { itemSelector: '.feed-card', gutter: 16 });
  }, 400);
}

function setupInfiniteScroll() {
  window.addEventListener('scroll', () => {
    if (loading) return;
    const feed = document.getElementById('feed-masonry');
    if (!feed) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
      loadMoreFeedItems();
    }
  });
}

function renderFeedScreen() {
  const feed = document.getElementById('feed-masonry');
  if (!feed) return;
  feed.innerHTML = '';
  feedItems = [];
  feedOffset = 0;
  loadMoreFeedItems();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('feed-masonry')) {
    renderFeedScreen();
    setupInfiniteScroll();
  }
});

export { renderFeedScreen, loadMoreFeedItems };
