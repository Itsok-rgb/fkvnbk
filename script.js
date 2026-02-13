// ========== LOADER ==========
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2000);
    }
});

// ========== PARTICLE SYSTEM ==========
const particleCanvas = document.getElementById('particleCanvas');
const particleCtx = particleCanvas?.getContext('2d');
let particles = [];

function resizeParticleCanvas() {
    if (particleCanvas) {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
}

resizeParticleCanvas();
window.addEventListener('resize', resizeParticleCanvas);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.size = Math.random() * 4 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.life -= this.decay;
    }
    
    draw() {
        if (!particleCtx) return;
        particleCtx.save();
        particleCtx.globalAlpha = this.life;
        particleCtx.fillStyle = this.color;
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particleCtx.fill();
        particleCtx.restore();
    }
}

function createParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y));
    }
}

function animateParticles() {
    if (!particleCanvas || !particleCtx) return;
    
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0 || particles[i].y > particleCanvas.height) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ========== CONFETTI ==========
function createConfetti(count) {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    
    const colors = ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b', '#fb5607'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// ========== FIREWORKS ==========
function createFirework(x, y) {
    const container = document.getElementById('fireworksContainer');
    if (!container) return;
    
    const colors = ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b', '#fb5607'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = Math.random() * 100 + 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        firework.style.left = x + Math.cos(angle) * distance + 'px';
        firework.style.top = y + Math.sin(angle) * distance + 'px';
        firework.style.backgroundColor = color;
        firework.style.animationDelay = Math.random() * 0.3 + 's';
        
        container.appendChild(firework);
        
        setTimeout(() => firework.remove(), 1000);
    }
}

// ========== GARDEN FUNCTIONS ==========
function initializeGarden() {
    const flowerGarden = document.getElementById('flowerGarden');
    if (!flowerGarden) return;
    
    flowerGarden.innerHTML = '';
    const flowers = ['🌸', '🌺', '🌻', '🌹', '🌷', '🌼', '💐', '🌾'];
    
    for (let i = 0; i < 8; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower-interactive';
        flower.textContent = flowers[i];
        flower.style.animationDelay = `${i * 0.2}s`;
        
        flower.addEventListener('click', () => {
            const rect = flower.getBoundingClientRect();
            createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
            createConfetti(10);
            flower.style.transform = 'scale(2) rotate(360deg)';
            setTimeout(() => {
                flower.style.transform = '';
            }, 500);
        });
        
        flowerGarden.appendChild(flower);
    }
}

// ========== STARS FUNCTIONS ==========
const starCanvas = document.getElementById('starCanvas');
const starCtx = starCanvas?.getContext('2d');
let stars = [];

function resizeStarCanvas() {
    if (starCanvas) {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
        initializeStars();
    }
}

if (starCanvas) {
    window.addEventListener('resize', resizeStarCanvas);
}

function initializeStars() {
    if (!starCanvas || !starCtx) return;
    
    stars = [];
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            radius: Math.random() * 2 + 1,
            opacity: Math.random(),
            twinkleSpeed: Math.random() * 0.02 + 0.01
        });
    }
    
    animateStars();
    
    // Create interactive stars
    const constellation = document.getElementById('constellation');
    if (constellation) {
        constellation.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            star.className = 'star-interactive';
            star.textContent = '⭐';
            star.style.animationDelay = `${i * 0.3}s`;
            
            star.addEventListener('click', () => {
                const rect = star.getBoundingClientRect();
                createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
                createFirework(rect.left + rect.width / 2, rect.top + rect.height / 2);
                star.style.transform = 'scale(2) rotate(360deg)';
                setTimeout(() => {
                    star.style.transform = '';
                }, 500);
            });
            
            constellation.appendChild(star);
        }
    }
}

function animateStars() {
    if (!starCanvas || !starCtx) return;
    
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    
    stars.forEach(star => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0) {
            star.twinkleSpeed = -star.twinkleSpeed;
        }
        
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        starCtx.fill();
    });
    
    requestAnimationFrame(animateStars);
}

// ========== OCEAN FUNCTIONS ==========
function initializeOcean() {
    const messageBottles = document.getElementById('messageBottles');
    if (!messageBottles) return;
    
    messageBottles.innerHTML = '';
    const messages = ['💌', '💕', '💖', '💗', '💝'];
    
    messages.forEach((msg, index) => {
        const bottle = document.createElement('div');
        bottle.className = 'bottle';
        bottle.textContent = msg;
        bottle.style.animationDelay = `${index * 0.5}s`;
        
        bottle.addEventListener('click', () => {
            const rect = bottle.getBoundingClientRect();
            createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
            createConfetti(15);
            bottle.style.transform = 'scale(1.5) rotate(360deg)';
            setTimeout(() => {
                bottle.style.transform = '';
            }, 500);
        });
        
        messageBottles.appendChild(bottle);
    });
}

// ========== FLOWER RAIN ==========
function createFlowerRain() {
    const flowers = ['🌸', '🌺', '🌻', '🌹', '🌷', '🌼'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.position = 'fixed';
            flower.style.left = Math.random() * 100 + '%';
            flower.style.top = '-50px';
            flower.style.fontSize = (Math.random() * 30 + 20) + 'px';
            flower.style.pointerEvents = 'none';
            flower.style.zIndex = '8000';
            flower.style.animation = `petalFall ${Math.random() * 2 + 3}s linear forwards`;
            document.body.appendChild(flower);
            
            setTimeout(() => flower.remove(), 5000);
        }, i * 100);
    }
}

// ========== HEART RAIN ==========
function createHeartRain() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '💞', '❤️'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '8000';
            heart.style.animation = `petalFall ${Math.random() * 2 + 3}s linear forwards`;
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 50);
    }
}

// ========== MAGIC EFFECT ==========
function createMagicEffect() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 100);
    }
    
    createHeartRain();
    createFlowerRain();
    createConfetti(150);
    createParticles(window.innerWidth / 2, window.innerHeight / 2, 300);
}

// ========== FLOATING HEARTS (HOME PAGE) ==========
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    
    setInterval(() => {
        const floatingElements = document.querySelector('.floating-elements');
        if (floatingElements && window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.setProperty('--delay', '0s');
            heart.style.setProperty('--duration', (Math.random() * 2 + 3) + 's');
            heart.style.setProperty('--x', Math.random() * 100 + '%');
            
            floatingElements.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }
    }, 2000);
}

// ========== ADD CSS ANIMATIONS ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes petalFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== INITIALIZE ON PAGE LOAD ==========
if (document.getElementById('flowerGarden')) {
    window.addEventListener('load', initializeGarden);
}

if (document.getElementById('starCanvas')) {
    window.addEventListener('load', () => {
        resizeStarCanvas();
    });
}

if (document.getElementById('messageBottles')) {
    window.addEventListener('load', initializeOcean);
}

if (document.querySelector('.floating-elements')) {
    window.addEventListener('load', createFloatingHearts);
}

// ========== CLICK EFFECTS ==========
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-card') || e.target.closest('.nav-card')) {
        createConfetti(20);
        createParticles(e.clientX, e.clientY, 30);
    }
});
