import { hiraFuda } from './yomifuda.js';

const setRequest = (speakText) =>
  `https://api.tts.quest/v1/voicevox/?text=${speakText}&speaker=1`;

const callVOX = async (req) => {
  const res = await fetch(req);
  const json = await res.json();
  console.log(json)
  const mp3 = await json.mp3DownloadUrl;
  return mp3;
};

const startBtn = document.createElement('div');
startBtn.addEventListener('click', async () => {
  const audioData = await callVOX(setRequest(hiraFuda[0]));
  const zun = new Audio(audioData);
  zun.play();
});

startBtn.style.width = '45px';
startBtn.style.height = '45px';

document.body.appendChild(startBtn);
