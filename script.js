// --- 1. FLOATING EMOJI BG ---
// --- 1. FLOATING EMOJI BG ---
const emojiModes = [
  { 
    icon: "❤️", 
    colors: ["#FFC0CB", "#FF69B4", "#FFB6C1", "#FF1493", "#E6E6FA"],
    theme: {
      bg: "#FFF0F5",
      primary: "#FF69B4",
      secondary: "#FFC0CB",
      accent: "#FFB6C1",
      text: "#4b5563"
    }
  },
  { 
    icon: "✨", 
    colors: ["#FFD700", "#FFFACD", "#FAFAD2", "#FFE4B5", "#FFFFFF"],
    theme: {
      bg: "#FFFFF0", // Ivory
      primary: "#FFD700", // Gold
      secondary: "#F0E68C", // Khaki
      accent: "#FFFACD", // LemonChiffon
      text: "#5D4037" // Brown
    }
  },
  { 
    icon: "😸", 
    colors: ["#FFDAB9", "#FFE4E1", "#FFF0F5", "#E6E6FA", "#FFFFFF"],
    theme: {
      bg: "#FFF5EE", // Seashell
      primary: "#FF7F50", // Coral
      secondary: "#FFDAB9", // PeachPuff
      accent: "#FFE4E1", // MistyRose
      text: "#4A4A4A" // Dark Gray
    }
  },
  { 
    icon: "🌸", 
    colors: ["#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"],
    theme: {
      bg: "#F0FFF0", // Honeydew
      primary: "#FF69B4", // HotPink (keep pink for flowers)
      secondary: "#98FB98", // PaleGreen
      accent: "#D8BFD8", // Thistle
      text: "#2F4F4F" // DarkSlateGray
    }
  }
];
let currentModeIndex = 0;

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  
  // Set content based on mode
  const mode = emojiModes[currentModeIndex];
  
  // 50% chance to be the icon, 50% chance to be a colored circle (original style)
  if (Math.random() > 0.5) {
      heart.innerText = mode.icon;
      heart.style.display = "flex";
      heart.style.justifyContent = "center";
      heart.style.alignItems = "center";
      heart.style.fontSize = Math.random() * 20 + 10 + "px";
      heart.style.backgroundColor = "transparent";
  } else {
      const size = Math.random() * 15 + 5 + "px";
      heart.style.width = size;
      heart.style.height = size;
      heart.style.backgroundColor = mode.colors[Math.floor(Math.random() * mode.colors.length)];
  }

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 5 + 5 + "s";
  
  document.getElementById("heart-container").appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 10000);
}
setInterval(createHeart, 800);

function toggleEmojiMode() {
  currentModeIndex = (currentModeIndex + 1) % emojiModes.length;
  const mode = emojiModes[currentModeIndex];
  
  // Update Button Icon
  document.getElementById("emoji-toggle-btn").innerText = mode.icon;
  
  // Update Theme Colors
  const root = document.documentElement;
  root.style.setProperty('--color-bg', mode.theme.bg);
  root.style.setProperty('--color-primary', mode.theme.primary);
  root.style.setProperty('--color-secondary', mode.theme.secondary);
  root.style.setProperty('--color-accent', mode.theme.accent);
  root.style.setProperty('--color-text', mode.theme.text);
}

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
  sad: "โอ๋ๆ ไม่ร้องนะ... ฟ้าหลังฝนสวยงามเสมอ มากอดๆ 🌈",
  stressed: "หายใจเข้าลึกๆ... ปล่อยวางเรื่องหนักๆ ลงบ้างนะ กอดๆ 🤗"
};

function handleMood(mood) {
  // 1. Update Message
  const responseDiv = document.getElementById("mood-response");
  responseDiv.innerText = moodMessages[mood];
  responseDiv.classList.remove("hidden");
  
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
const musicIcon = document.getElementById("music-icon");
const musicCover = document.getElementById("music-cover");

// Custom Dropdown Elements
const dropdownTrigger = document.getElementById("dropdown-trigger");
const dropdownMenu = document.getElementById("dropdown-menu");
const currentSongTitle = document.getElementById("current-song-title");
const dropdownArrow = document.getElementById("dropdown-arrow");

// Song Data
let songs = [
  { title: "Wake Up Please", src: "music/Wake Up Please.mp3" },
  { title: "1001 (You're Lovely)", src: "music/1001 (Youre Lovely) - SERIOUS BACON [ Official Lyrics ].mp3" },
  { title: "Safeplanet - ดวงตะวัน", src: "music/Safeplanet - ดวงตะวน (The Sun) Music Video.mp3" }
];

// Set initial song
let currentSongIndex = 0;

// Populate Custom Dropdown
function populateSongList() {
  dropdownMenu.innerHTML = "";
  songs.forEach((song, index) => {
    const item = document.createElement("div");
    item.className = `px-3 py-2 text-xs font-bold text-gray-600 hover:bg-pink-50 hover:text-pink-500 rounded-lg cursor-pointer transition-colors ${index === currentSongIndex ? 'bg-pink-50 text-pink-500' : ''}`;
    item.textContent = song.title;
    item.onclick = () => selectSong(index);
    dropdownMenu.appendChild(item);
  });
  
  // Update trigger text
  if (songs[currentSongIndex]) {
    currentSongTitle.textContent = songs[currentSongIndex].title;
  }
}

// Toggle Dropdown
dropdownTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle("hidden");
  dropdownArrow.classList.toggle("rotate-180");
});

// Close Dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdownTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.add("hidden");
    dropdownArrow.classList.remove("rotate-180");
  }
});

// Select Song Function
function selectSong(index) {
  currentSongIndex = index;
  audio.src = songs[currentSongIndex].src;
  audio.play();
  updatePlayerState(true);
  
  // Update UI
  currentSongTitle.textContent = songs[currentSongIndex].title;
  dropdownMenu.classList.add("hidden");
  dropdownArrow.classList.remove("rotate-180");
  
  // Re-render list to update active state styling
  populateSongList();
}

// Initial Population
populateSongList();
audio.src = songs[currentSongIndex].src;
audio.volume = 0.5;



function updatePlayerState(isPlaying) {
  if (isPlaying) {
    musicIcon.classList.remove("fa-music");
    musicIcon.classList.add("fa-pause");
    musicCover.classList.add("rotate-center");
    musicCover.classList.remove("paused-animation");
  } else {
    musicIcon.classList.add("fa-music");
    musicIcon.classList.remove("fa-pause");
    musicCover.classList.add("paused-animation");
  }
}

function toggleMusic() {
  if (audio.paused) {
    audio.play();
    updatePlayerState(true);
  } else {
    audio.pause();
    updatePlayerState(false);
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

// --- 5. OPEN WHEN ENVELOPES ---
const envelopeData = {
  miss: {
    title: "เมื่อคิดถึงเค้า... 🌙",
    message: "มองไปที่ดวงจันทร์นะ เค้าก็มองมันอยู่เหมือนกัน ไม่ว่าเราจะอยู่ไกลกันแค่ไหน แต่เราอยู่ใต้ฟ้าเดียวกันเสมอ คิดถึงนะคนเก่ง",
    icon: "🌙"
  },
  tired: {
    title: "เมื่อรู้สึกหมดไฟ... 🔋",
    message: "พักก่อนได้ไหม? ไม่ต้องรีบวิ่งตลอดเวลาก็ได้นะ การพักผ่อนคืองานที่สำคัญที่สุดของคนเก่งแบบเธอนะ รู้มั้ย?",
    icon: "🔋"
  },
  sad: {
    title: "เมื่อฝนตกในใจ... ☔",
    message: "ร้องไห้ออกมาได้เลยนะ ไหล่เค้าว่างเสมอสำหรับเธอ ฟ้าหลังฝนจะสดใสเสมอ และเค้าจะถือร่มให้เธอเอง",
    icon: "☔"
  },
  love: {
    title: "เมื่ออยากบอกรัก... 💖",
    message: "รักเธอนะ รักที่สุดในโลกเลย ขอบคุณที่มีเธออยู่ในชีวิตนะ เธอคือของขวัญที่ดีที่สุดของเค้าเลย",
    icon: "💖"
  }
};

function openEnvelope(type) {
  const modal = document.getElementById("envelope-modal");
  const content = document.getElementById("modal-content");
  const data = envelopeData[type];
  
  document.getElementById("modal-title").innerText = data.title;
  document.getElementById("modal-message").innerText = data.message;
  document.getElementById("modal-icon").innerText = data.icon;
  
  modal.classList.remove("hidden");
  // Small delay to allow display:block to apply before opacity transition
  setTimeout(() => {
    modal.classList.remove("opacity-0");
    content.classList.remove("scale-90");
    content.classList.add("scale-100");
  }, 10);
}

function closeEnvelope() {
  const modal = document.getElementById("envelope-modal");
  const content = document.getElementById("modal-content");
  
  modal.classList.add("opacity-0");
  content.classList.remove("scale-100");
  content.classList.add("scale-90");
  
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300);
}


