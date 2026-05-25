/* ============================================================
   script.js — Shared utilities: cursor, hearts, sound toggle
   ============================================================ */

/* ── Custom Cursor ────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top  = my + "px";
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top  = ry + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  /* Hide native cursor when mouse enters window */
  document.addEventListener("mouseenter", () => {
    dot.style.display = ring.style.display = "block";
  });
  document.addEventListener("mouseleave", () => {
    dot.style.display = ring.style.display = "none";
  });
})();

/* ── Floating Hearts ──────────────────────────────────────── */
(function initHearts() {
  const container = document.querySelector(".floating-hearts");
  if (!container) return;

  const EMOJIS = ["💖", "💗", "💕", "💞", "❤️", "💓", "🩷"];
  let count = 0;

  function spawnHeart() {
    if (count > 18) return; // cap on-screen
    const el = document.createElement("span");
    el.className = "heart";
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    el.style.left     = Math.random() * 100 + "vw";
    el.style.fontSize = (0.8 + Math.random() * 1.4) + "rem";
    const dur = 7 + Math.random() * 8;
    el.style.animationDuration = dur + "s";
    container.appendChild(el);
    count++;
    setTimeout(() => { el.remove(); count--; }, dur * 1000);
  }

  setInterval(spawnHeart, 900);
  for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 300);
})();

/* ── Sound Toggle ─────────────────────────────────────────── */
(function initSound() {
  const btn = document.getElementById("sound-toggle");
  if (!btn) return;

  let muted = localStorage.getItem("crushAiMuted") === "true";
  updateBtn();

  btn.addEventListener("click", () => {
    muted = !muted;
    localStorage.setItem("crushAiMuted", muted);
    updateBtn();
    window.dispatchEvent(new CustomEvent("soundToggle", { detail: { muted } }));
  });

  function updateBtn() {
    btn.textContent = muted ? "🔇 SOUND OFF" : "🔊 SOUND ON";
  }
})();

/* ── Page Fade In ─────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  requestAnimationFrame(() => { document.body.style.opacity = "1"; });
});

/* ── Util: play audio (respects mute) ────────────────────────*/
function playSound(src, volume = 0.4) {
  const muted = localStorage.getItem("crushAiMuted") === "true";
  if (muted) return;
  try {
    const a = new Audio(src);
    a.volume = volume;
    a.play().catch(() => {}); // ignore autoplay blocks
  } catch (_) {}
}
