const cursor = document.querySelector('.cursor');
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

// Cursor movement
let mouse = { x: width / 2, y: height / 2 };
document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

document.addEventListener('mousedown', () => cursor.classList.add('active'));
document.addEventListener('mouseup', () => cursor.classList.remove('active'));

// Star field
const STAR_COUNT = 50;
const stars = [];
for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        color: `hsl(${Math.random() * 360}, 80%, 80%)`
    });
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    // Draw stars
    for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.closePath();
    }
    // Draw lines from cursor to nearby stars
    for (const star of stars) {
        const dist = Math.hypot(mouse.x - star.x, mouse.y - star.y);
        if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(star.x, star.y);
            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function updateStars() {
    for (const star of stars) {
        star.x += star.dx;
        star.y += star.dy;
        // Bounce off edges
        if (star.x < 0 || star.x > width) star.dx *= -1;
        if (star.y < 0 || star.y > height) star.dy *= -1;
    }
}

function animate() {
    updateStars();
    drawStars();
    requestAnimationFrame(animate);
}
animate();


const themeBtn = document.getElementById('theme-toggle-btn');
const navbar = document.querySelector('.navbar');

function updateNavbarTheme() {
    if (document.body.classList.contains('light')) {
        navbar.classList.add('light');
    } else {
        navbar.classList.remove('light');
    }
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeBtn.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
    updateNavbarTheme();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 't') { // Press 't' to toggle theme
        document.body.classList.toggle('light');
        updateNavbarTheme();
    }
});