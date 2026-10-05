import song1 from "../assets/audio/have-a-short-rest.mp3";
import song2 from "../assets/audio/royal-days.mp3";
import song3 from "../assets/audio/no-more-what-ifs.mp3";
import song4 from "../assets/audio/beneath-the-mask.mp3";
import song5 from "../assets/audio/when-mother-was-there.mp3";
import cover1 from "../assets/images/persona-5.avif";
import cover2 from "../assets/images/persona-5-royal.avif";

export const TRACKS = [
  { title: "Have a Short Rest", artist: "ATLUS GAME MUSIC, lyn", src: song1, cover: cover1 },
  { title: "Royal Days", artist: "ATLUS GAME MUSIC, lyn", src: song2, cover: cover2 },
  { title: "No More What Ifs", artist: "ATLUS GAME MUSIC, lyn", src: song3, cover: cover2 },
  { title: "Beneath The Mask", artist: "ATLUS GAME MUSIC, lyn", src: song4, cover: cover1 },
  { title: "When Mother Was There", artist: "ATLUS GAME MUSIC, lyn", src: song5, cover: cover1 },
];

const VOLUME = 0.075;
export const audio = new Audio(TRACKS[0].src);
audio.preload = "metadata";
audio.volume = VOLUME;
export const player = { index: 0, shuffle: false, repeat: "all" };
const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn());

export const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const seekToRatio = (ratio) => {
  if (!isFinite(audio.duration)) return;
  audio.currentTime = Math.min(1, Math.max(0, ratio)) * audio.duration;
};

["timeupdate", "play", "pause", "loadedmetadata", "durationchange", "volumechange"].forEach((evt) =>
  audio.addEventListener(evt, emit)
);

const startAudio = () => audio.play().catch(() => {});

function loadTrack(i, autoplay = true) {
  player.index = i;
  audio.src = TRACKS[i].src;
  if (autoplay) startAudio();
  else emit();
}

function pickNext() {
  if (player.shuffle && TRACKS.length > 1) {
    let r;
    do {
      r = Math.floor(Math.random() * TRACKS.length);
    } while (r === player.index);
    return r;
  }
  return (player.index + 1) % TRACKS.length;
}

export const next = () => loadTrack(pickNext());

export const prev = () => {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else {
    loadTrack((player.index - 1 + TRACKS.length) % TRACKS.length);
  }
};

export const togglePlay = () => (audio.paused ? startAudio() : audio.pause());

export const toggleShuffle = () => {
  player.shuffle = !player.shuffle;
  emit();
};

export const cycleRepeat = () => {
  player.repeat = { all: "one", one: "off", off: "all" }[player.repeat];
  emit();
};

audio.addEventListener("ended", () => {
  if (player.repeat === "one") {
    audio.currentTime = 0;
    startAudio();
    return;
  }
  const isLast = player.index === TRACKS.length - 1;
  if (player.repeat === "off" && !player.shuffle && isLast) {
    emit();
    return;
  }
  next();
});

// Autoplay setup 
const AUTOPLAY = true;

const startOnInteraction = () => {
  window.removeEventListener("click", startOnInteraction);
  window.removeEventListener("keydown", startOnInteraction);
  if (audio.paused) startAudio();
};

if (AUTOPLAY) {
  audio.play().catch(() => {
    window.addEventListener("click", startOnInteraction);
    window.addEventListener("keydown", startOnInteraction);
  });
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    audio.pause();
    window.removeEventListener("click", startOnInteraction);
    window.removeEventListener("keydown", startOnInteraction);
  });
}