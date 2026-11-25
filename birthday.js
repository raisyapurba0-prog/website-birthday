
const canvas = document.getElementById("birthdayCanvas");
const ctx = canvas.getContext("2d");
const message = document.getElementById("birthdayMessage");

let width, height;
let particles = [];
let stars = [];

const totalParticles = 950;

function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    createStars();
}

function createStars() {
    stars = [];

    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5 + 0.3,
            alpha: Math.random() * 0.5 + 0.2,
            phase: Math.random() * Math.PI * 2
        });
    }
}

function drawStars(time) {
    stars.forEach(star => {
        const glow = 0.5 + Math.sin(time * 0.001 + star.phase) * 0.4;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 195, 137, ${star.alpha * glow})`;
        ctx.fill();
    });
}

function getTextPoints() {
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");

    offscreen.width = width;
    offscreen.height = height;

    const fontSize = Math.min(width * 0.065, 58);

    offCtx.font = `600 ${fontSize}px Cinzel, serif`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillStyle = "white";

    offCtx.fillText("HAPPY BIRTHDAY", width / 2, height * 0.20);

    const image = offCtx.getImageData(0, 0, width, height);
    const points = [];

    for (let y = 0; y < height; y += 3) {
        for (let x = 0; x < width; x += 3) {
            const index = (y * width + x) * 4;

            if (image.data[index + 3] > 100) {
                points.push({ x, y });
            }
        }
    }

    return points;
}

function getHeartPoints() {
    const points = [];

    const scale = Math.min(width, height) * 0.010;
    const centerX = width / 2;
    const centerY = height * 0.49;

    for (let i = 0; i < totalParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random());

        const heartX = 16 * Math.pow(Math.sin(angle), 3);

        const heartY =
            13 * Math.cos(angle) -
            5 * Math.cos(2 * angle) -
            2 * Math.cos(3 * angle) -
            Math.cos(4 * angle);

        points.push({
            x: centerX + heartX * scale * radius,
            y: centerY - heartY * scale * radius
        });
    }

    return points;
}

function createParticles() {
    const textPoints = getTextPoints();
    const heartPoints = getHeartPoints();

    particles = [];

    for (let i = 0; i < totalParticles; i++) {
        const start = textPoints[
            Math.floor(Math.random() * textPoints.length)
        ];

        particles.push({
            startX: start.x,
            startY: start.y,

            x: start.x,
            y: start.y,

            previousX: start.x,
            previousY: start.y,

            targetX: heartPoints[i].x,
            targetY: heartPoints[i].y,

            angle: Math.random() * Math.PI * 2,
            radius: Math.random() * Math.min(width, height) * 0.24 + 35,

            size: Math.random() * 1.5 + 0.7,
            alpha: Math.random() * 0.5 + 0.5,

            speed: Math.random() * 0.5 + 0.7,
            direction: Math.random() > 0.5 ? 1 : -1,

            phase: Math.random() * Math.PI * 2
        });
    }
}

function ease(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function drawGlow(x, y, radius, alpha) {
    const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, radius
    );

    gradient.addColorStop(0, `rgba(212, 158, 105, ${alpha})`);
    gradient.addColorStop(1, "rgba(212, 158, 105, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawParticles(time, elapsed) {
    particles.forEach(p => {
        let x = p.startX;
        let y = p.startY;

        // TAHAP 1: TULISAN HAPPY BIRTHDAY
        if (elapsed < 2.8) {
            x = p.startX;
            y = p.startY;
        }

        // TAHAP 2: PUSARAN PARTIKEL
        else if (elapsed < 6.2) {
            const progress = (elapsed - 2.8) / 3.4;
            const eased = ease(progress);

            const angle =
                p.angle +
                eased * Math.PI * 7 * p.speed * p.direction;

            const radius = p.radius * (1 - eased * 0.15);

            const vortexX =
                width / 2 + Math.cos(angle) * radius;

            const vortexY =
                height * 0.43 + Math.sin(angle) * radius;

            x = p.startX + (vortexX - p.startX) * eased;
            y = p.startY + (vortexY - p.startY) * eased;
        }

        // TAHAP 3: MEMBENTUK HATI
        else {
            const progress = Math.min((elapsed - 6.2) / 2.8, 1);
            const eased = ease(progress);

            const angle =
                p.angle +
                Math.PI * 7 * p.speed * p.direction;

            const radius = p.radius * 0.85;

            const vortexX =
                width / 2 + Math.cos(angle) * radius;

            const vortexY =
                height * 0.43 + Math.sin(angle) * radius;

            x = vortexX + (p.targetX - vortexX) * eased;
            y = vortexY + (p.targetY - vortexY) * eased;
        }

        // JEJAK PARTIKEL
        if (elapsed >= 2.8 && elapsed < 9) {
            ctx.beginPath();
            ctx.moveTo(p.previousX, p.previousY);
            ctx.lineTo(x, y);

            ctx.strokeStyle = "rgba(220, 173, 119, 0.13)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
        }

        p.previousX = x;
        p.previousY = y;

        const glow = 0.7 + Math.sin(time * 0.003 + p.phase) * 0.3;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(245, 210, 157, ${p.alpha * glow})`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(224, 174, 112, 0.8)";

        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

const startTime = performance.now();

function animate(time) {
    const elapsed = (time - startTime) / 1000;

    ctx.clearRect(0, 0, width, height);

    drawStars(time);

    if (elapsed >= 2.8 && elapsed < 9) {
        drawGlow(
            width / 2,
            height * 0.43,
            Math.min(width, height) * 0.25,
            0.12
        );
    }

    drawParticles(time, elapsed);

    if (elapsed >= 9) {
        message.classList.add("show");
    }

    requestAnimationFrame(animate);
}

async function startAnimation() {
    await document.fonts.ready;

    resizeCanvas();
    createParticles();

    window.addEventListener("resize", () => {
        resizeCanvas();
        createParticles();
    });

    requestAnimationFrame(animate);
}

startAnimation();
