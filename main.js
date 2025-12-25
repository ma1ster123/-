const chatContainer = document.getElementById("chat-container");

const herMessages = [
  "Привіт 👋",
  "Пишу це 24 грудня о 02:11",
  "Трохи сонний, але всі думки зайняті тільки тобою",
  "Хотів просто сказати кілька слів...",
  "Ти справді особлива людина, навіть якщо інколи цього не помічаєш ✨",
  "З тобою якось спокійніше і тепліше, ніби світ стає трошки кращим ☀️",
  "Твоє повідомлення іноді може врятувати цілий день 🙂",
  "Ти навіть не уявляєш, наскільки сильно впливаєш на мене",
  "Хотів сказати багато, але слова завжди губляться, коли думаю про тебе 💫",
  "Думаю, що наважуся сказати все при зустрічі",
  "Я не можу залізти в майбутнє і не знаю, що ти відповіси",
  "Якщо раптом буде важко або щось не так - ти можеш написати сюди все, що хочеш",
  "Чи побачу це - не знаю, але якщо придумаю як, то побачу 🙂",
  "Але всередині є відчуття, що все буде добре",
  "І якщо ми будемо разом, я обіцяю - у нас все буде добре 💗"
];

const herAvatar = "photo.jpg";
const myAvatar = "photo1.jpg";
const TELEGRAM_TOKEN = "8411260374:AAFrzcg6uptVwqVMlI2-f7QqQ_vZQcbgJik";
const CHAT_ID = "5223717297";

function formatTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2,'0') + ":" + now.getMinutes().toString().padStart(2,'0');
}
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
const inputField = document.getElementById("user-msg");
const sendBtn = document.getElementById("send-btn");
sendBtn.addEventListener("click", sendMyMessage);
inputField.addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendMyMessage();
});
function sendMyMessage() {
    const text = inputField.value.trim();
    if (!text) return;
    fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({chat_id: CHAT_ID, text: text, parse_mode: "HTML"})
    }).then(res => console.log("Відправлено в Telegram:", text))
      .catch(err => console.error("Помилка Telegram:", err));

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
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
function resizeCanvas(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
window.addEventListener('resize', () => { resizeCanvas(); initSnow(); });
resizeCanvas();

// --- сніг ---
const snowflakes = [];
const numFlakes = 150;

for(let i=0; i<numFlakes; i++){
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5
    });
}

function drawSnow(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for(let f of snowflakes){
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
    }
    ctx.fill();
    moveSnow();
}

function moveSnow(){
    for(let f of snowflakes){
        f.y += f.speed;
        if(f.y > canvas.height){
            f.y = -f.r;
            f.x = Math.random() * canvas.width;
        }
    }
}

setInterval(drawSnow, 30);

showHerMessages();


