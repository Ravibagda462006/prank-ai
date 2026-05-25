/* ============================================================
   particles.js — Dark cyberpunk particle background
   ============================================================ */

(function () {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx    = canvas.getContext("2d");
  let W, H, particles = [], animId;

  const COLORS = ["#ff2d78", "#a855f7", "#00e5ff", "#ff1744", "#ff6ec7"];
  const COUNT  = window.innerWidth < 600 ? 45 : 80;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x    = rand(0, W);
      this.y    = init ? rand(0, H) : H + 10;
      this.vx   = rand(-0.3, 0.3);
      this.vy   = rand(-0.6, -0.15);
      this.r    = rand(1, 2.5);
      this.col  = COLORS[Math.floor(rand(0, COLORS.length))];
      this.life = rand(0.3, 1);
      this.dec  = rand(0.002, 0.005);
    }

    update() {
      this.x    += this.vx;
      this.y    += this.vy;
      this.life -= this.dec;
      if (this.life <= 0 || this.y < -20) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.col;
      ctx.shadowBlur  = 8;
      ctx.shadowColor = this.col;
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    /* faint grid lines */
    ctx.save();
    ctx.strokeStyle = "rgba(168,85,247,0.04)";
    ctx.lineWidth   = 1;
    const step = 80;
    for (let x = 0; x < W; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.restore();

    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", () => { resize(); });
  resize();
  init();
  loop();
})();
