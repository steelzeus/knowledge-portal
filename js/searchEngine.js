// js/searchEngine.js
// Client-side contextual search engine for Knowledge Portal using Fuse.js
// Features: fuzzy search, autocomplete, highlights, dynamic section loading, Bootstrap 5 styling, keyboard accessibility

import { SUBJECTS } from './subjectConfig.js';
import { showSubject, showSection } from './subjectRouter.js';
import DEBUG from './debug.js';

// --- 1. Build Search Index from Subject Config ---
function buildSearchIndex() {
  const index = [];
  for (const subject of SUBJECTS) {
    for (const section of subject.sections) {
      for (const resource of section.resources) {
        index.push({
          id: `${subject.id}|${section.id}|${resource.id}`,
          subjectId: subject.id,
          subjectName: subject.name,
          sectionId: section.id,
          sectionName: section.name,
          resourceId: resource.id,
          resourceTitle: resource.title,
          resourceType: resource.type,
          resourceDescription: resource.description || '',
        });
      }
    }
  }
  return index;
}

// --- 2. Initialize Fuse.js ---
let fuse = null;
let searchIndex = null;
function initFuse() {
  searchIndex = buildSearchIndex();
  fuse = new window.Fuse(searchIndex, {
    keys: [
      'subjectName',
      'sectionName',
      'resourceTitle',
      'resourceType',
      'resourceDescription',
    ],
    threshold: 0.35,
    includeMatches: true,
    minMatchCharLength: 2,
    shouldSort: true,
  });
}

// --- 3. DOM Elements ---
const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('search-suggestions');
const resultsContainer = document.getElementById('search-results');

// --- 4. Autocomplete Suggestions ---
function getSuggestions(query) {
  if (!fuse || !query) return [];
  const results = fuse.search(query, { limit: 5 });
  return results.map(r => r.item.resourceTitle);
}

function renderSuggestions(suggestions) {
  suggestionsList.innerHTML = '';
  suggestions.forEach((s, i) => {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-action';
    li.tabIndex = 0;
    li.textContent = s;
    li.setAttribute('role', 'option');
    li.setAttribute('data-index', i);
    suggestionsList.appendChild(li);
  });
  suggestionsList.style.display = suggestions.length ? 'block' : 'none';
}

// --- 5. Search and Highlight ---
function highlightText(text, matches, key) {
  if (!matches) return text;
  const match = matches.find(m => m.key === key);
  if (!match) return text;
  let highlighted = '';
  let lastIndex = 0;
  for (const [start, end] of match.indices) {
    highlighted += text.slice(lastIndex, start);
    highlighted += `<mark>${text.slice(start, end + 1)}</mark>`;
    lastIndex = end + 1;
  }
  highlighted += text.slice(lastIndex);
  return highlighted;
}

function renderResults(results) {
  resultsContainer.innerHTML = '';
  if (!results.length) {
    resultsContainer.innerHTML = '<div class="alert alert-warning">No results found.</div>';
    return;
  }
  results.forEach((r, idx) => {
    const { item, matches } = r;
    const card = document.createElement('div');
    card.className = 'card mb-2 search-result-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('data-result-idx', idx);
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${highlightText(item.resourceTitle, matches, 'resourceTitle')}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${highlightText(item.subjectName, matches, 'subjectName')} &mdash; ${highlightText(item.sectionName, matches, 'sectionName')}</h6>
        <p class="card-text">${highlightText(item.resourceDescription, matches, 'resourceDescription')}</p>
        <span class="badge bg-primary">${item.resourceType}</span>
      </div>
    `;
    card.addEventListener('click', () => {
      loadResultSection(item);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        loadResultSection(item);
      }
    });
    resultsContainer.appendChild(card);
  });
}

// --- 6. Dynamic Section Loading ---
function loadResultSection(item) {
  // Show modular subject screen, load subject and section
  showScreen('modular-subject-screen');
  showSubject(item.subjectId, () => {
    showSection(item.subjectId, item.sectionId, item.resourceId);
  });
}

// --- 7. Keyboard Accessibility ---
let suggestionIdx = -1;
searchInput.addEventListener('keydown', e => {
  const items = suggestionsList.querySelectorAll('li');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    suggestionIdx = (suggestionIdx + 1) % items.length;
    items.forEach((li, i) => li.classList.toggle('active', i === suggestionIdx));
    if (items[suggestionIdx]) items[suggestionIdx].focus();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    suggestionIdx = (suggestionIdx - 1 + items.length) % items.length;
    items.forEach((li, i) => li.classList.toggle('active', i === suggestionIdx));
    if (items[suggestionIdx]) items[suggestionIdx].focus();
  } else if (e.key === 'Enter') {
    if (suggestionIdx >= 0 && items[suggestionIdx]) {
      searchInput.value = items[suggestionIdx].textContent;
      suggestionsList.style.display = 'none';
      triggerSearch();
    }
  }
});
suggestionsList.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    searchInput.value = e.target.textContent;
    suggestionsList.style.display = 'none';
    triggerSearch();
  }
});

// --- 8. Search Trigger ---
function triggerSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    resultsContainer.innerHTML = '';
    return;
  }
  const results = fuse.search(query, { limit: 10 });
  renderResults(results);
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (!query) {
    suggestionsList.style.display = 'none';
    resultsContainer.innerHTML = '';
    return;
  }
  const suggestions = getSuggestions(query);
  renderSuggestions(suggestions);
  triggerSearch();
});

// Hide suggestions on blur
document.addEventListener('click', e => {
  if (!suggestionsList.contains(e.target) && e.target !== searchInput) {
    suggestionsList.style.display = 'none';
  }
});

// --- 9. Initialize on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {  if (!window.Fuse) {
    DEBUG.error('Fuse.js not loaded!');
    return;
  }
  initFuse();
});

// Export for testing
export { buildSearchIndex, initFuse, triggerSearch };
