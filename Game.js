// تنظیمات اولیه
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let coin = { x: canvas.width / 2 - 100, y: canvas.height / 1.8, size: 100 };
let images = [];
let gameState = 'MAIN_MENU'; // حالت بازی

// تابع برای بارگذاری تصاویر
function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

// بارگذاری تصاویر
const background = loadImage('background.png');
const coinImage = loadImage('ggg.png');

// ذخیره‌سازی سکه‌ها در مرورگر
function loadScore() {
    const savedScore = localStorage.getItem('coinScore');
    if (savedScore) {
        score = parseInt(savedScore, 10);
    }
}

function saveScore() {
    localStorage.setItem('coinScore', score);
}

// رسم سکه در مرکز صفحه
function drawCoin() {
    ctx.drawImage(coinImage, coin.x, coin.y, coin.size, coin.size);
}

// نمایش امتیاز
function showScore() {
    ctx.font = '50px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`امتیاز: ${score}`, canvas.width / 2 - 100, 100);
}

// مدیریت کلیک کاربر روی سکه
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // بررسی برخورد با سکه
    if (
        mouseX >= coin.x &&
        mouseX <= coin.x + coin.size &&
        mouseY >= coin.y &&
        mouseY <= coin.y + coin.size
    ) {
        score++;
        saveScore(); // ذخیره سکه‌ها در مرورگر
    }
});

// حلقه اصلی بازی
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    drawCoin();
    showScore();

    requestAnimationFrame(gameLoop);
}

// شروع بازی
loadScore(); // بارگذاری امتیاز ذخیره شده
gameLoop();
