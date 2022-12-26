import { hiraFuda } from './yomifuda.js';

const setRequest = (speakText) =>
  `https://api.tts.quest/v1/voicevox/?text=${speakText}&speaker=1`;

const callVOX = async (req) => {
  const res = await fetch(req);
  const json = await res.json();
  console.log(json);
  const zun = new Audio(json.mp3DownloadUrl);
  zun.play();
};

const startBtn = document.createElement('div');
startBtn.addEventListener('click', () => {
  callVOX(setRequest(hiraFuda[0]));
});

startBtn.style.width = '45px';
startBtn.style.height = '45px';

document.body.appendChild(startBtn);
