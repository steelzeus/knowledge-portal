// chatbotUI.js
// Dynamic chat UI for #chatbot-screen, ES6 module
// Uses Bootstrap 5 classes, imports mentorEngine
import { getMentorReply } from './mentorEngine.js';

/**
 * Simple Markdown parser for bold, italics, and code (optional)
 * @param {string} text
 * @returns {string} HTML
 */
function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

/**
 * Add a message to the chat window
 * @param {string} text
 * @param {string} sender - 'user' or 'ai'
 */
function addMessage(text, sender) {
  const chatWindow = document.getElementById('chat-window');
  if (!chatWindow) return;
  const msgDiv = document.createElement('div');
  msgDiv.className = sender === 'user' ? 'd-flex justify-content-end mb-2' : 'd-flex justify-content-start mb-2';
  msgDiv.innerHTML = `
    <div class="p-2 rounded ${sender === 'user' ? 'bg-primary text-white' : 'bg-light border'}" style="max-width:70%;">
      ${sender === 'ai' ? '🤖 ' : '🧑 '}${parseMarkdown(text)}
    </div>
  `;
  chatWindow.appendChild(msgDiv);
  // Auto-scroll
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/**
 * Handle sending a user message
 */
function handleSend() {
  const input = document.getElementById('user-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  input.focus();
  // Get AI reply
  getMentorReply(text, reply => {
    addMessage(reply, 'ai');
  });
}

/**
 * Initialize the chatbot UI inside #chatbot-screen
 */
export function initChatbotUI() {
  const screen = document.getElementById('chatbot-screen');
  if (!screen) return;
  screen.innerHTML = `
    <div class="card shadow-sm" style="height: 80vh; max-width: 600px; margin: 0 auto;">
      <div class="card-header bg-info text-white">Mentor Chatbot</div>
      <div id="chat-window" class="card-body overflow-auto mb-2" style="height:60vh; background:#f8f9fa; border-radius:6px;"></div>
      <div class="card-footer bg-white d-flex align-items-center">
        <input id="user-input" type="text" class="form-control me-2" placeholder="Type your question..." autocomplete="off" />
        <button id="send-btn" class="btn btn-success">Send</button>
      </div>
    </div>
  `;
  // Focus input on load
  const input = document.getElementById('user-input');
  if (input) input.focus();
  // Send on button click
  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) sendBtn.onclick = handleSend;
  // Send on Enter
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    });
  }
}

// For future: export addMessage, parseMarkdown if needed
