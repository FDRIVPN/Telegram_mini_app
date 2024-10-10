const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// تنظیم اندازه بوم
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// متغیرها
let score = 0;
let coin = {
    x: canvas.width / 2 - 100,
    y: canvas.height / 2 - 100,
    width: 200,
    height: 200
};

// بارگذاری تصاویر
const coinImg = new Image();
coinImg.src = 'ggg.png'; // مسیر تصویر سکه

// رویداد کلیک روی بوم
canvas.addEventListener("click", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // بررسی برخورد کلیک با سکه
    if (mouseX >= coin.x && mouseX <= coin.x + coin.width &&
        mouseY >= coin.y && mouseY <= coin.y + coin.height) {
        score++;
    }
});

// تابع برای نمایش امتیاز
function showScore() {
    ctx.font = "48px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`امتیاز: ${score}`, 50, 50);
}

// تابع رسم سکه
function drawCoin() {
    ctx.drawImage(coinImg, coin.x, coin.y, coin.width, coin.height);
}

// حلقه بازی
function gameLoop() {
    // پاک کردن صفحه
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // رسم سکه و امتیاز
    drawCoin();
    showScore();

    requestAnimationFrame(gameLoop);
}

// شروع حلقه بازی
gameLoop();
