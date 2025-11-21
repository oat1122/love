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
  sad: "โอ๋ๆ ไม่ร้องนะ... ฟ้าหลังฝนสวยงามเสมอ มากอดๆ 🌈",
  stressed: "หายใจเข้าลึกๆ... ปล่อยวางเรื่องหนักๆ ลงบ้างนะ กอดๆ 🤗"
};

const moodBreathingData = {
  happy: {
    title: "ส่งต่อพลังบวก! ✨",
    icon: "✨",
    text: "หายใจเข้า... เก็บความสุข... หายใจออก... ยิ้มกว้างๆ",
    color: "from-yellow-200 to-orange-200"
  },
  tired: {
    title: "พักสายตาสักนิดนะ 💤",
    icon: "💤",
    text: "หายใจเข้า... ผ่อนคลาย... หายใจออก... ทิ้งความล้า",
    color: "from-blue-200 to-indigo-200"
  },
  sad: {
    title: "กอดๆ นะคนเก่ง 🧸",
    icon: "🧸",
    text: "หายใจเข้า... รับกำลังใจ... หายใจออก... ความเศร้าจางไป",
    color: "from-indigo-200 to-purple-200"
  },
  stressed: {
    title: "ใจเย็นๆ ค่อยๆ แก้ไป 🍃",
    icon: "🍃",
    text: "หายใจเข้าลึกๆ... 1-2-3... หายใจออกยาวๆ...",
    color: "from-green-200 to-teal-200"
  }
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

  // 2. Update Breathing Section
  const data = moodBreathingData[mood];
  if (data) {
    const title = document.getElementById("breathing-title");
    const icon = document.getElementById("breathing-icon");
    const text = document.getElementById("breathing-text");
    const outerCircle = document.getElementById("breathing-circle-outer");

    // Fade out
    title.style.opacity = 0;
    icon.style.opacity = 0;
    text.style.opacity = 0;
    
    setTimeout(() => {
      // Change content
      title.innerText = data.title;
      icon.innerText = data.icon;
      text.innerText = data.text;
      
      // Change color (remove old gradient classes and add new ones)
      outerCircle.className = `breathing-circle w-24 h-24 bg-gradient-to-r ${data.color} rounded-full opacity-80 blur-sm absolute transition-all duration-500`;

      // Fade in
      title.style.opacity = 1;
      icon.style.opacity = 1;
      text.style.opacity = 1;
    }, 300);
  }
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
