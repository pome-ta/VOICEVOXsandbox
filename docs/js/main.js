import { hiraFuda } from './yomifuda.js';

const setRequest = (speakText) =>
  `https://api.tts.quest/v1/voicevox/?text=${speakText}&speaker=1`;

const callVOX = async (req) => {
  const res = await fetch(req);
  const json = await res.json();
  console.log(json.mp3DownloadUrl);
  const mp3 = await json.mp3DownloadUrl;
  return mp3;
};

window.addEventListener('load', async () => {
  sound = await loadSample(audioctx, soundPath);
});

const sleep = (waitTime) =>
  new Promise((resolve) => setTimeout(resolve, waitTime));
async function loadSample(actx, uri) {
  const res = await fetch(uri);
  const arraybuf = await res.arrayBuffer();
  await sleep(3000);
  return actx.decodeAudioData(arraybuf);
}

const soundPath = './media/mp3/001.mp3';
const audioctx = new AudioContext();
let sound = null;

const startBtn = document.createElement('div');
startBtn.addEventListener('click', async () => {
  const audioData = await callVOX(setRequest(hiraFuda[2]));
  const zun = new Audio(audioData);
  zun.play();

  // const src = new AudioBufferSourceNode(audioctx, { buffer: sound });
  // src.connect(audioctx.destination);
  // src.start();
});

startBtn.style.width = '45px';
startBtn.style.height = '45px';

document.body.appendChild(startBtn);
