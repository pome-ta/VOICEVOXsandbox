import { hiraFuda } from './yomifuda.js';

const h1Header = document.createElement('h1');
h1Header.textContent = 'ずんだもん 百人一首';

const readLine = document.createElement('p');
readLine.textContent =
  'ずんだもんが百人一首を詠むのだ。発音やイントネーションが違うかもしれないのだ。ゆるしてほしいのだ。';

const h2Header = document.createElement('h2');
h2Header.textContent = '使い方';

const descriptioinPtag = document.createElement('p');
descriptioinPtag.textContent =
  '読んでほしい番号を入力。入力番号順に読み上げるなら、番号をランダムに読み上げるなら。100首分全部読み上げるのであれば、-1を入力してください。';

const mainWrap = document.createElement('div');
mainWrap.style.width = '100%';
document.body.appendChild(mainWrap);

const inputText = document.createElement('input');
inputText.placeholder = '1, 2, 12, 22';
inputText.style.width = '100%';
inputText.style.height = '2rem';

const sortOrderBtn = document.createElement('button');
sortOrderBtn.type = 'button';
sortOrderBtn.style.width = '100%';
sortOrderBtn.style.height = '3rem';
sortOrderBtn.textContent = 'hoge';
const randomOrderBtn = document.createElement('button');
randomOrderBtn.name = 'fuga';

document.body.appendChild(h1Header);
document.body.appendChild(readLine);
document.body.appendChild(h2Header);
document.body.appendChild(descriptioinPtag);
document.body.appendChild(inputText);
document.body.appendChild(sortOrderBtn);
document.body.appendChild(randomOrderBtn);

// const setRequest = (speakText) =>
//   `https://api.tts.quest/v1/voicevox/?text=${speakText}&speaker=1`;

// const callVOX = async (req) => {
//   const res = await fetch(req);
//   const json = await res.json();
//   console.log(json.mp3DownloadUrl);
//   const mp3 = await json.mp3DownloadUrl;
//   return mp3;
// };

// window.addEventListener('load', async () => {
//   sound = await loadSample(audioctx, soundPath);
// });

// const sleep = (waitTime) =>
//   new Promise((resolve) => setTimeout(resolve, waitTime));
// async function loadSample(actx, uri) {
//   const res = await fetch(uri);
//   const arraybuf = await res.arrayBuffer();
//   await sleep(3000);
//   return actx.decodeAudioData(arraybuf);
// }

// const soundPath = './media/mp3/001.mp3';
// const audioctx = new AudioContext();
// let sound = null;

// const startBtn = document.createElement('div');
// startBtn.addEventListener('click', async () => {
//   const audioData = await callVOX(setRequest(hiraFuda[2]));
//   const zun = new Audio(audioData);
//   zun.play();

//   // const src = new AudioBufferSourceNode(audioctx, { buffer: sound });
//   // src.connect(audioctx.destination);
//   // src.start();
// });

// startBtn.style.width = '45px';
// startBtn.style.height = '45px';

// document.body.appendChild(startBtn);
