// --- CONFIGURATION: ตั้งค่าวันที่คบกัน ---
const startDate = new Date("2023-02-14T00:00:00");
const message =
  "ขอบคุณที่เข้ามาเป็นความสดใสในชีวิตนะ ไม่ว่าวันข้างหน้าจะเป็นยังไง เค้าสัญญาว่าจะจับมือเธอไว้แบบนี้ตลอดไป รักมากๆ นะคะ ^^";

// --- 1. TIMER LOGIC ---
function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerText = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerText = seconds
    .toString()
    .padStart(2, "0");
}
setInterval(updateTimer, 1000);
updateTimer();

// --- 2. TYPING EFFECT ---
const typingElement = document.getElementById("typing-text");
let charIndex = 0;

function typeWriter() {
  if (charIndex < message.length) {
    typingElement.innerHTML += message.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 50);
  }
}

// --- 3. SCROLL REVEAL (ลูกเล่นใหม่: เลื่อนแล้วโผล่) ---
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // ถ้าเป็นส่วนข้อความ ให้เริ่มพิมพ์
        if (entry.target.querySelector("#typing-text") && charIndex === 0) {
          typeWriter();
        }
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// --- 4. FLOATING HEARTS BG ---
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  const size = Math.random() * 20 + 10 + "px";
  heart.style.width = size;
  heart.style.height = size;
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 5 + 5 + "s";
  const colors = ["#FFC0CB", "#FF69B4", "#FFB6C1", "#FF1493"];
  heart.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  document.getElementById("heart-container").appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 10000);
}
setInterval(createHeart, 500);

// --- 5. HEART MOUSE TRAIL (ลูกเล่นใหม่: หัวใจตามเมาส์) ---
// ทำงานเฉพาะบน PC (ที่มีเมาส์)
document.addEventListener("mousemove", function (e) {
  if (Math.random() < 0.1) {
    // ไม่ต้องสร้างทุกเฟรม เดี๋ยวลก
    const heart = document.createElement("div");
    heart.classList.add("trail-heart");
    heart.style.left = e.pageX + "px";
    heart.style.top = e.pageY + "px";
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
});

// --- 6. INTERACTION ---
let isPlaying = false;
function toggleMusic() {
  const icon = document.getElementById("music-icon");
  isPlaying = !isPlaying;
  if (isPlaying) {
    icon.classList.remove("fa-music");
    icon.classList.add("fa-pause");
    alert("🎶 Music Playing (Simulated)...");
  } else {
    icon.classList.add("fa-music");
    icon.classList.remove("fa-pause");
  }
}

function showSurprise() {
  const modal = document.getElementById("surpriseModal");
  const content = document.getElementById("modalContent");

  // 1. เปิด Modal ทันที
  modal.classList.remove("hidden");

  // 2. สั่ง Scroll ไปที่ตำแหน่ง Modal พอดี (อยู่กลางจอ)
  setTimeout(() => {
    modal.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 100);

  // 3. Animation เด้งขยายขึ้นมา (เพิ่ม Delay นิดหน่อยรอ Scroll เริ่มทำงาน)
  setTimeout(() => {
    content.classList.remove("scale-0");
    content.classList.add("scale-100");
  }, 300);
}

function closeSurprise() {
  const modal = document.getElementById("surpriseModal");
  const content = document.getElementById("modalContent");
  content.classList.remove("scale-100");
  content.classList.add("scale-0");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300);
}
