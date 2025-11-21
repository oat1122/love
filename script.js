// --- 1. FLOATING HEARTS BG ---
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  const size = Math.random() * 20 + 10 + "px";
  heart.style.width = size;
  heart.style.height = size;
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 5 + 5 + "s";
  const colors = ["#FFC0CB", "#FF69B4", "#FFB6C1", "#FF1493", "#E6E6FA"];
  heart.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  document.getElementById("heart-container").appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 10000);
}
setInterval(createHeart, 800);

// --- 2. PILL BUTTON (RANDOM MESSAGE) ---
const sweetMessages = [
  "เก่งมากแล้วคนเก่ง ✌️",
  "ยิ้มเยอะๆ นะ โลกสดใสเพราะเธอเลย 🌍",
  "เหนื่อยก็พักนะ เค้าอยู่ตรงนี้เสมอ 💖",
  "คิดถึงจังเลยยยยย (ตะโกน)",
  "กินข้าวยัง? เป็นห่วงนะ 🍚",
  "สู้ๆ นะครับคนดี ฮึบๆ 💪",
  "วันนี้เธอน่ารักที่สุดในโลกเลย!",
  "อย่าลืมดื่มน้ำนะ 💧",
  "ขอให้วันนี้เป็นวันที่ดีนะ ✨",
  "เธอทำได้อยู่แล้ว เชื่อมั่นในตัวเองนะ!",
];

function randomMessage() {
  const toast = document.getElementById("sweet-toast");
  const randomIndex = Math.floor(Math.random() * sweetMessages.length);

  toast.innerText = sweetMessages[randomIndex];
  toast.classList.remove("hidden");

  // Trigger bounce animation
  toast.classList.remove("animate-bounce");
  void toast.offsetWidth; // trigger reflow
  toast.classList.add("animate-bounce");
  
  // Confetti effect
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.6 },
    colors: ['#FFC0CB', '#FF69B4', '#FFB6C1']
  });
}

// --- 3. MOOD TRACKER ---
const moodMessages = {
  happy: "ดีใจที่เห็นเธอยิ้มนะ! เก็บความสุขนี้ไว้นานๆ เลย 🥰",
  tired: "เหนื่อยใช่ไหม? พักผ่อนเยอะๆ นะ คนเก่งต้องชาร์จแบตบ้าง 🔋",
  sad: "โอ๋ๆ ไม่ร้องนะ... ฟ้าหลังฝนสวยงามเสมอ เค้าอยู่ข้างๆ นะ 🌈",
  stressed: "หายใจเข้าลึกๆ... ปล่อยวางเรื่องหนักๆ ลงบ้างนะ กอดๆ 🤗"
};

function handleMood(mood) {
  const responseDiv = document.getElementById("mood-response");
  responseDiv.innerText = moodMessages[mood];
  responseDiv.classList.remove("hidden");
  
  // Add a subtle animation
  responseDiv.style.opacity = 0;
  responseDiv.style.transform = "translateY(10px)";
  setTimeout(() => {
      responseDiv.style.transition = "all 0.5s ease";
      responseDiv.style.opacity = 1;
      responseDiv.style.transform = "translateY(0)";
  }, 50);
}

// --- 4. AUDIO PLAYER ---
const audio = document.getElementById("bgMusic");
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");

// Set initial volume
audio.volume = 0.5;

function toggleMusic() {
  const icon = document.getElementById("music-icon");
  const cover = document.getElementById("music-cover");

  if (audio.paused) {
    audio.play();
    icon.classList.remove("fa-music");
    icon.classList.add("fa-pause");
    cover.classList.add("rotate-center");
    cover.classList.remove("paused-animation");
  } else {
    audio.pause();
    icon.classList.add("fa-music");
    icon.classList.remove("fa-pause");
    cover.classList.add("paused-animation");
  }
}

volumeSlider.addEventListener("input", function () {
  const volume = this.value / 100;
  audio.volume = volume;
  updateVolumeIcon(volume);
});

function toggleMute() {
  if (audio.volume > 0) {
    audio.dataset.previousVolume = audio.volume;
    audio.volume = 0;
    volumeSlider.value = 0;
    updateVolumeIcon(0);
  } else {
    const previousVolume = audio.dataset.previousVolume || 0.5;
    audio.volume = previousVolume;
    volumeSlider.value = previousVolume * 100;
    updateVolumeIcon(previousVolume);
  }
}

function updateVolumeIcon(volume) {
  volumeIcon.classList.remove("fa-volume-up", "fa-volume-down", "fa-volume-mute");
  if (volume === 0) {
    volumeIcon.classList.add("fa-volume-mute");
  } else if (volume < 0.5) {
    volumeIcon.classList.add("fa-volume-down");
  } else {
    volumeIcon.classList.add("fa-volume-up");
  }
}
