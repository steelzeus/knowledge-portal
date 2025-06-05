// roadmapUI.js
// Visual roadmap renderer for curriculum flow
import { getUserRoadmap } from './curriculumFlow.js';

function renderRoadmap(subject, userProgress, containerId = 'roadmap-container') {
  const roadmap = getUserRoadmap(subject, userProgress);
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  // Simple SVG graph mockup
  let svg = `<svg width="100%" height="300">`;
  const nodeX = 160, nodeY = 80;
  roadmap.forEach((node, i) => {
    const x = 100 + i * nodeX;
    const y = 150;
    // Draw edges
    node.prerequisites.forEach(pr => {
      const prIdx = roadmap.findIndex(n => n.id === pr);
      if (prIdx >= 0) {
        svg += `<line x1="${100 + prIdx * nodeX + 60}" y1="${y}" x2="${x}" y2="${y}" stroke="#bbb" stroke-width="2"/>`;
      }
    });
    // Draw node
    let color = node.status === 'complete' ? '#4caf50' : node.status === 'unlocked' ? '#2196f3' : '#bbb';
    svg += `<g class="roadmap-node" data-node="${node.id}">
      <rect x="${x}" y="${y-30}" width="120" height="60" rx="15" fill="${color}" stroke="#222" stroke-width="2"/>
      <text x="${x+60}" y="${y}" text-anchor="middle" fill="#fff" font-size="16">${node.title}</text>
    </g>`;
  });
  svg += `</svg>`;
  container.innerHTML = svg;
  // Add click handlers
  Array.from(container.querySelectorAll('.roadmap-node')).forEach(g => {
    g.addEventListener('click', e => {
      const nodeId = g.getAttribute('data-node');
      showNodeDetail(subject, nodeId, userProgress);
    });
  });
}

function showNodeDetail(subject, nodeId, userProgress) {
  const roadmap = getUserRoadmap(subject, userProgress);
  const node = roadmap.find(n => n.id === nodeId);
  if (!node) return;
  let html = `<h5>${node.title}</h5>`;
  html += `<p>Estimated Time: ${node.estimatedTime}</p>`;
  html += `<p>Status: <b>${node.status}</b></p>`;
  html += `<button class='btn btn-primary' onclick='window.startNode("${subject}","${nodeId}")'>Start Now</button>`;
  html += `<hr><b>Resources:</b><ul>`;
  node.resources.forEach(r => html += `<li>${r}</li>`);
  html += `</ul>`;
  document.getElementById('roadmap-sidebar').innerHTML = html;
}

window.startNode = function(subject, nodeId) {
  alert(`Starting node: ${nodeId}`);
  // Could trigger quiz, lesson, etc.
};

export { renderRoadmap, showNodeDetail };
