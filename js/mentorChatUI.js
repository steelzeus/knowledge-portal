// mentorChatUI.js
// Handles mentor chat avatar UI, animation, and integration
import { mentorState, respondToUser, trackUserFrustration } from './mentor.js';

function showMentorChat() {
  document.getElementById('mentor-avatar').style.display = 'block';
}
function hideMentorChat() {
  document.getElementById('mentor-avatar').style.display = 'none';
}
function appendMentorMessage(msg) {
  const chat = document.getElementById('chat-body');
  const p = document.createElement('p');
  p.innerHTML = msg;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}
function appendUserMessage(msg) {
  const chat = document.getElementById('chat-body');
  const p = document.createElement('p');
  p.className = 'text-end text-primary';
  p.innerHTML = msg;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}
function handleMentorInput() {
  const input = document.getElementById('user-input');
  const val = input.value.trim();
  if (!val) return;
  appendUserMessage(val);
  setTimeout(() => {
    const reply = respondToUser(val, {});
    appendMentorMessage(`<span class='typing-dots'>...</span>`);
    setTimeout(() => {
      document.querySelector('#chat-body .typing-dots').parentElement.remove();
      appendMentorMessage(reply);
    }, 700);
  }, 200);
  input.value = '';
}
function setupMentorChatUI() {
  document.getElementById('mentor-fab').onclick = showMentorChat;
  document.getElementById('mentor-send-btn').onclick = handleMentorInput;
  document.getElementById('user-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleMentorInput();
  });
  // Optional: close chat on outside click or ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideMentorChat();
  });
}
// Animate avatar (blink, bounce)
function animateAvatar() {
  const avatar = document.getElementById('mentor-avatar');
  if (!avatar) return;
  avatar.classList.add('animate__animated', 'animate__bounceInUp');
  setInterval(() => {
    avatar.classList.add('animate__animated', 'animate__pulse');
    setTimeout(() => avatar.classList.remove('animate__pulse'), 1000);
  }, 8000);
}
// Optionally trigger chat popup on frustration
function maybeShowMentorOnFrustration({ failedAttempts, timeOnScreen }) {
  const msg = trackUserFrustration({ failedAttempts, timeOnScreen });
  if (msg) {
    showMentorChat();
    appendMentorMessage(msg);
  }
}
export { setupMentorChatUI, maybeShowMentorOnFrustration, animateAvatar };
