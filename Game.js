const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;

// تصاویر بازی
const coinImage = new Image();
coinImage.src = 'ggg.png';

const scoreElement = document.getElementById('score');
let score = localStorage.getItem('score') || 0;
updateScore();

// قرار دادن سکه در مرکز صفحه
let coinX = WIDTH / 2 - 300;
let coinY = HEIGHT / 2 - 300;

// رویداد کلیک
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // بررسی برخورد کلیک با سکه
    if (mouseX >= coinX && mouseX <= coinX + 600 && mouseY >= coinY && mouseY <= coinY + 600) {
        score++;
        localStorage.setItem('score', score);
        updateScore();
    }
});

// به‌روزرسانی امتیاز در صفحه
function updateScore() {
    scoreElement.innerText = `امتیاز: ${score}`;
}

// حلقه بازی
function gameLoop() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(coinImage, coinX, coinY, 600, 600);
    requestAnimationFrame(gameLoop);
}

gameLoop();
