// --- CONFIGURATION: ตั้งค่าวันที่คบกัน ---
const startDate = new Date("2023-02-14T00:00:00");
const message =
  "ขอบคุณที่เข้ามาเป็นความสดใสในชีวิตนะ ไม่ว่าวันข้างหน้าจะเป็นยังไง เค้าสัญญาว่าจะจับมือเธอไว้แบบนี้ตลอดไป รักมากๆ ^^";

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

// --- 6. AUDIO PLAYER ---
const audio = document.getElementById("bgMusic");
const volumeSlider = document.getElementById("volume-slider");
const volumePercent = document.getElementById("volume-percent");
const volumeIcon = document.getElementById("volume-icon");

// Set initial volume to 50%
audio.volume = 0.5;

// Toggle Music Play/Pause
function toggleMusic() {
  const icon = document.getElementById("music-icon");
  const cover = document.getElementById("music-cover");

  if (audio.paused) {
    audio.play();
    icon.classList.remove("fa-music");
    icon.classList.add("fa-pause");
    // Add spinning animation
    cover.classList.add("rotate-center");
    cover.classList.remove("paused-animation");
  } else {
    audio.pause();
    icon.classList.add("fa-music");
    icon.classList.remove("fa-pause");
    // Pause spinning
    cover.classList.add("paused-animation");
  }
}

// Volume Slider Control
volumeSlider.addEventListener("input", function () {
  const volume = this.value / 100;
  audio.volume = volume;
  volumePercent.textContent = this.value + "%";
  updateVolumeIcon(volume);
});

// Toggle Mute/Unmute
function toggleMute() {
  if (audio.volume > 0) {
    audio.dataset.previousVolume = audio.volume;
    audio.volume = 0;
    volumeSlider.value = 0;
    volumePercent.textContent = "0%";
    updateVolumeIcon(0);
  } else {
    const previousVolume = audio.dataset.previousVolume || 0.5;
    audio.volume = previousVolume;
    volumeSlider.value = previousVolume * 100;
    volumePercent.textContent = Math.round(previousVolume * 100) + "%";
    updateVolumeIcon(previousVolume);
  }
}

// Update Volume Icon Based on Level
function updateVolumeIcon(volume) {
  volumeIcon.classList.remove(
    "fa-volume-up",
    "fa-volume-down",
    "fa-volume-mute"
  );

  if (volume === 0) {
    volumeIcon.classList.add("fa-volume-mute");
  } else if (volume < 0.5) {
    volumeIcon.classList.add("fa-volume-down");
  } else {
    volumeIcon.classList.add("fa-volume-up");
  }
}

function showSurprise() {
  const modal = document.getElementById("surpriseModal");
  const content = document.getElementById("modalContent");

  // --- Confetti Effect ---
  var duration = 3 * 1000;
  var end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ff69b4", "#ffc0cb", "#fff"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ff69b4", "#ffc0cb", "#fff"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

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

// --- 7. LIGHTBOX (กดดูรูปใหญ่) ---
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  lightbox.classList.remove("hidden");
  img.src = src;

  // Animation effect
  setTimeout(() => {
    img.classList.remove("scale-90");
    img.classList.add("scale-100");
  }, 10);
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.classList.remove("scale-100");
  img.classList.add("scale-90");

  setTimeout(() => {
    lightbox.classList.add("hidden");
  }, 300);
}

// --- 8. LOVE CHECK GAME (ปุ่มหนี) ---
let noBtnClickCount = 0; // นับจำนวนครั้งที่พยายามกดปุ่ม "เฉยๆ"
const maxNoClicks = 2; // จำนวนครั้งที่ยอมให้กดก่อนปุ่มหายไป (ครั้งที่ 3 จะหาย)
let isRunAwayCooldown = false; // เช็คว่าปุ่มกำลังหดอยู่หรือเปล่า (ป้องกันการทำงานรัว)

function runAway() {
  // ถ้ากำลังคูลดาวน์อยู่ ให้จบการทำงานทันที
  if (isRunAwayCooldown) return;

  const noBtn = document.getElementById("no-btn");
  const loveBtn = document.getElementById("love-btn");

  if (!noBtn) return; // ป้องกัน error ถ้าปุ่มหายไปแล้ว

  // เริ่มทำงาน: ล็อกไม่ให้ทำซ้ำรัวๆ
  isRunAwayCooldown = true;

  noBtnClickCount++;

  if (noBtnClickCount <= maxNoClicks) {
    // ลดขนาดปุ่ม "เฉยๆ"
    const currentNoBtnWidth = noBtn.offsetWidth;
    const newNoBtnWidth = Math.max(currentNoBtnWidth * 0.7, 20); // ลดเหลือ 70% แต่ไม่ให้เล็กกว่า 20px
    noBtn.style.width = `${newNoBtnWidth}px`;
    noBtn.style.paddingLeft = "0px";
    noBtn.style.paddingRight = "0px";
    noBtn.style.fontSize = `${1 - noBtnClickCount * 0.3}rem`; // ลดขนาดฟอนต์

    // เพิ่มขนาดปุ่ม "รักที่สุด!"
    const currentLoveBtnScale =
      parseFloat(
        loveBtn.style.transform.replace("scale(", "").replace(")", "")
      ) || 1;
    loveBtn.style.transform = `scale(${currentLoveBtnScale * 1.2})`; // เพิ่มขนาด 20%
    loveBtn.style.fontSize = `${1.2 + noBtnClickCount * 0.2}rem`; // เพิ่มขนาดฟอนต์

    // เปลี่ยนข้อความเล็กน้อย (ถ้าต้องการ)
    if (noBtnClickCount === 1) {
      noBtn.innerText = "ม่ายยย";
    } else if (noBtnClickCount === 2) {
      noBtn.innerText = "จิ๋ววว";
    }

    // ปลดล็อก Cooldown หลังจาก Animation เสร็จ (300ms ตรงกับ duration-300 ใน CSS)
    setTimeout(() => {
      isRunAwayCooldown = false;
    }, 300);
  } else {
    // ครั้งที่ 3 ปุ่ม "เฉยๆ" หายไปเลย
    noBtn.style.opacity = "0";
    noBtn.style.transform = "scale(0)";
    setTimeout(() => {
      if (noBtn) noBtn.remove(); // ลบปุ่มออกจาก DOM จริงๆ
    }, 300); // รอให้ animation หายไปก่อน

    // เพิ่มขนาดปุ่มรักให้ใหญ่ขึ้นอีก
    loveBtn.style.transform = "scale(1.8)";
    loveBtn.style.fontSize = "2rem";

    // ไม่ต้องปลดล็อก isRunAwayCooldown แล้ว เพราะปุ่มหายไปแล้ว
  }
}

function sayLove() {
  const loveModal = document.getElementById("loveModal");
  const loveModalContent = document.getElementById("loveModalContent");

  // ยิงพลุฉลอง
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff0000", "#ff69b4", "#ffff00"], // เพิ่มสีเหลืองให้ดูมีมิติ
  });

  loveModal.classList.remove("hidden");
  setTimeout(() => {
    loveModal.classList.add("opacity-100");
    loveModalContent.classList.remove("scale-0");
    loveModalContent.classList.add("scale-100");
  }, 10);
}

function closeLoveModal() {
  const loveModal = document.getElementById("loveModal");
  const loveModalContent = document.getElementById("loveModalContent");

  loveModalContent.classList.remove("scale-100");
  loveModalContent.classList.add("scale-0");
  loveModal.classList.remove("opacity-100");

  setTimeout(() => {
    loveModal.classList.add("hidden");
  }, 300); // ให้เวลา animation ปิด
}

// --- 9. RANDOM SWEET MESSAGE ---
const sweetMessages = [
  "เก่งมากแล้วคนเก่ง ✌️",
  "ยิ้มเยอะๆ นะ โลกสดใสเพราะเธอเลย 🌍",
  "เหนื่อยก็พักนะ เค้าอยู่ตรงนี้เสมอ 💖",
  "คิดถึงจังเลยยยยย (ตะโกน)",
  "กินข้าวยัง? เป็นห่วงนะ 🍚",
  "สู้ๆ นะครับคนดี ฮึบๆ 💪",
  "วันนี้เธอน่ารักที่สุดในโลกเลย!",
];

function randomMessage() {
  const toast = document.getElementById("sweet-toast");
  const randomIndex = Math.floor(Math.random() * sweetMessages.length);

  toast.innerText = sweetMessages[randomIndex];
  toast.classList.remove("hidden");

  // สั่งให้เด้งดึ๋งๆ
  toast.classList.remove("animate-bounce");
  void toast.offsetWidth; // trigger reflow
  toast.classList.add("animate-bounce");
}
