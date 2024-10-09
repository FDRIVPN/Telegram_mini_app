const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;

let score = 0;
let gameState = 'MAIN_MENU';

const images = {
    background: 'background.jpg', // تغییر مسیر
    coin: 'ggg.png',              // تغییر مسیر
    newBackground: 'new_background.jpg', // تغییر مسیر
    newImage1: 'new_image1.png', // تغییر مسیر
    newImage2: 'new_image2.png', // تغییر مسیر
    sideImage1: 'side_image1.png', // تغییر مسیر
    imageArray: []
};


const loadImages = (sources) => {
    return new Promise((resolve) => {
        let loadedImages = 0;
        const totalImages = Object.keys(sources).length;

        for (const key in sources) {
            const img = new Image();
            img.src = sources[key];
            img.onload = () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                    resolve();
                }
            };
            images.imageArray[key] = img;
        }
    });
};

const centerCoin = () => {
    return {
        x: WIDTH / 2,
        y: HEIGHT / 1.8,
        width: 600,
        height: 600
    };
};

let coinRect = centerCoin();
const imageRects = [
    { x: WIDTH * 0.2, y: HEIGHT - 60, width: 140, height: 140 },
    { x: WIDTH * 0.4, y: HEIGHT - 60, width: 140, height: 140 },
    { x: WIDTH * 0.6, y: HEIGHT - 60, width: 140, height: 140 },
    { x: WIDTH * 0.8, y: HEIGHT - 60, width: 140, height: 140 },
];

const drawScore = () => {
    ctx.fillStyle = 'white';
    ctx.font = '146px sans-serif';
    ctx.fillText(score, coinRect.x + coinRect.width / 2 - 60, coinRect.y - 140);
};

const drawCoin = () => {
    ctx.drawImage(images.imageArray['coin'], coinRect.x, coinRect.y, coinRect.width, coinRect.height);
};

const drawImages = () => {
    for (let rect of imageRects) {
        ctx.drawImage(images.imageArray['image' + (imageRects.indexOf(rect) + 1)], rect.x, rect.y, rect.width, rect.height);
    }
};

const gameLoop = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    if (gameState === 'MAIN_MENU') {
        ctx.drawImage(images.imageArray['background'], 0, 0, WIDTH, HEIGHT);
        drawCoin();
        drawImages();
        drawScore();
    }

    requestAnimationFrame(gameLoop);
};

const handleMouseClick = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (gameState === 'MAIN_MENU') {
        if (mouseX > coinRect.x && mouseX < coinRect.x + coinRect.width && mouseY > coinRect.y && mouseY < coinRect.y + coinRect.height) {
            score++;
        }
        for (let rect of imageRects) {
            if (mouseX > rect.x && mouseX < rect.x + rect.width && mouseY > rect.y && mouseY < rect.y + rect.height) {
                gameState = 'NEW_SCREEN';
            }
        }
    }
};

window.addEventListener('click', handleMouseClick);

loadImages(images).then(() => {
    gameLoop();
});
