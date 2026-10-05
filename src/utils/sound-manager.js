import selectSound from '../assets/audio/select-sfx.mp3';
import backSound from '../assets/audio/back-sfx.mp3';
import changeSound from '../assets/audio/change-sfx.mp3';

export const selectAudio = new Audio(selectSound);
export const backAudio = new Audio(backSound);
export const changeAudio = new Audio(changeSound);

selectAudio.volume = 0.5;
backAudio.volume = 0.5;
changeAudio.volume = 0.4;

export const playSound = (audio) => {
  const sound = audio.cloneNode();
  sound.currentTime = 0;
  sound.volume = audio.volume;
  sound.play().catch(e => console.log("Audio play prevented:", e));
  sound.addEventListener("ended", () => {
    sound.remove();
  });
};
