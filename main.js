const canvas = document.getElementById("simCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let speed = 2;

class Particle {
  constructor(x, y, vx, vy, r, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = r;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.x += this.vx * speed;
    this.y += this.vy * speed;
    if (this.x - this.r < 0 || this.x + this.r > canvas.width) this.vx *= -1;
    if (this.y - this.r < 0 || this.y + this.r > canvas.height) this.vy *= -1;
    this.draw();
  }
}

function initParticles(n) {
  particles = [];
  for (let i = 0; i < n; i++) {
    let r = 8;
    let x = Math.random() * (canvas.width - 2 * r) + r;
    let y = Math.random() * (canvas.height - 2 * r) + r;
    let vx = (Math.random() - 0.5) * 4;
    let vy = (Math.random() - 0.5) * 4;
    let color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    particles.push(new Particle(x, y, vx, vy, r, color));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}

document.getElementById("speed").addEventListener("input", e => {
  speed = e.target.value;
});

document.getElementById("reset").addEventListener("click", () => {
  initParticles(10);
});

initParticles(10);
animate();
