import selectSound from '../assets/select.mp3';
import backSound from '../assets/back.mp3';
import changeSound from '../assets/change.mp3';
import bgm from '../assets/bgm.mp3';

export const selectAudio = new Audio(selectSound);
export const backAudio = new Audio(backSound);
export const changeAudio = new Audio(changeSound);
export const bgmAudio = new Audio(bgm);

selectAudio.volume = 0.5;
backAudio.volume = 0.5;
changeAudio.volume = 0.4;
bgmAudio.volume = 0.1;
bgmAudio.loop = true;

export const playSound = (audio) => {
  audio.currentTime = 0;
  audio.play().catch(e => console.log("Audio play prevented:", e));
};

export const playBGM = () => {
  bgmAudio.play().catch(e => console.log("BGM autoplay prevented"));
};  