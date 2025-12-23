const chatContainer = document.getElementById("chat-container");

// Її повідомлення
const herMessages = [
    "Привіт👋",
    "Це Ростік з минулого.",
    "Я не знаю, що ти відповіла мені при зустрічі...",
    "але незалежно від відповіді, хочу, щоб ти знала...",
    "я люблю тебе ♥️",
    "якщо ти погодилась то...",
    "Я обіцяю, що в нас все буде добре.",
    "просто довірся мені...",
    "давай крокувати разом - крок в крок.",
    "я неможу передбачити майбутє...",
    "але якщо ти не погодилась...",
    "то напиши мені, підтримай, я себе знаю я дуже засмутився",
    "повір я чекаю:)",
    "це все...",
    "якщо ціково, придумав це все і пишу це 24 грудня в 0.42",
    "можеш суди написати все що хочеш, я все ж думаю в нас все має бути добре"
];

const herAvatar = "photo.jpg"; // її аватарка
const myAvatar = "photo1.jpg";    // твоя аватарка
const TELEGRAM_TOKEN = "8411260374:AAFrzcg6uptVwqVMlI2-f7QqQ_vZQcbgJik";
const CHAT_ID = "5223717297";

function formatTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2,'0') + ":" + now.getMinutes().toString().padStart(2,'0');
}

// Показуємо всі її повідомлення поступово
function showHerMessages(index = 0) {
    if (index >= herMessages.length) return;

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", "left");
    msgDiv.innerHTML = `
        <img src="${herAvatar}" class="avatar">
        <div>
            <div class="message-content">${herMessages[index]}</div>
            <div class="message-time">${formatTime()}</div>
        </div>
    `;
    chatContainer.appendChild(msgDiv);
    setTimeout(() => msgDiv.classList.add("visible"), 100);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => showHerMessages(index + 1), 2500);
}

// Надсилка твоїх повідомлень
const inputField = document.getElementById("user-msg");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMyMessage);
inputField.addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendMyMessage();
});

function sendMyMessage() {
    const text = inputField.value.trim();
    if (!text) return;

    // Надсилаємо в Telegram
    fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({chat_id: CHAT_ID, text: text, parse_mode: "HTML"})
    }).then(res => console.log("Відправлено в Telegram:", text))
      .catch(err => console.error("Помилка Telegram:", err));

    // Додаємо повідомлення в чат з анімацією
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", "right");
    msgDiv.innerHTML = `
        <img src="${myAvatar}" class="avatar">
        <div>
            <div class="message-content">${text}</div>
            <div class="message-time">${formatTime()}</div>
        </div>
    `;
    chatContainer.appendChild(msgDiv);
    setTimeout(() => msgDiv.classList.add("visible"), 100);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    inputField.value = "";
}

// --- Сніг ---
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initSnow();
});

let snowflakes = [];
function initSnow() {
    snowflakes = [];
    for (let i = 0; i < 200; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1,
            d: Math.random() * 2
        });
    }
}
function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let f of snowflakes) {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    moveSnow();
}
let angle = 0;
function moveSnow() {
    angle += 0.01;
    for (let f of snowflakes) {
        f.y += Math.cos(angle + f.d) + 1 + f.r/2;
        f.x += Math.sin(angle) * 2;
        if (f.x > canvas.width + 5 || f.x < -5 || f.y > canvas.height) {
            f.x = Math.random()*canvas.width;
            f.y = -10;
        }
    }
}
initSnow();
setInterval(drawSnow, 25);

// Запускаємо показ її повідомлень
showHerMessages();