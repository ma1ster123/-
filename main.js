const chatContainer = document.getElementById("chat-container");

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
    "можеш сюди написати все що хочеш,але я все ж думаю в нас все має бути добрере..."
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

let snowflakes=[];
let angle=0;
function initSnow(){
    snowflakes=[];
    const num = Math.min(Math.floor(window.innerWidth/5),200);
    for(let i=0;i<num;i++){
        snowflakes.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: Math.random()*3+1,
            d: Math.random()*1.5
        });
    }
}
function drawSnow(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="white";
    ctx.beginPath();
    for(let f of snowflakes){ ctx.moveTo(f.x,f.y); ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);}
    ctx.fill();
    moveSnow();
}
function moveSnow(){
    angle+=0.01;
    for(let f of snowflakes){
        f.y += Math.cos(angle+f.d)+0.5+f.r/2;
        f.x += Math.sin(angle)*1.5;
        if(f.x>canvas.width+5||f.x<-5||f.y>canvas.height){ f.x=Math.random()*canvas.width; f.y=-10;}
    }
}
initSnow();
setInterval(drawSnow,30);
showHerMessages();