const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const nameInput = document.getElementById('nameInput');
let confirmedName = '';

function confirmName() {
  confirmedName = nameInput.value.trim();
  nameInput.disabled = true;
}

function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg || !confirmedName) return;
  appendMessage(`${confirmedName}: ${msg}`);
  userInput.value = '';

  fetch('https://gpt-chat-backend-ron.onrender.com/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      project: 'babbelbabbel',
      user: confirmedName,
      message: msg
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.reply) appendMessage(`GPT: ${data.reply}`);
    else appendMessage('⚠️ Geen geldig antwoord');
  })
  .catch(() => appendMessage('⚠️ Fout bij verbinding'));
}

function appendMessage(text) {
  const line = document.createElement('div');
  line.textContent = text;
  chatbox.appendChild(line);
  chatbox.scrollTop = chatbox.scrollHeight;
}
