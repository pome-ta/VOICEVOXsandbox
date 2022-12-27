import { hiraFuda } from './yomifuda.js';

const h1Header = document.createElement('h1');
h1Header.textContent = 'ずんだもん 百人一首';

const readLine = document.createElement('p');
readLine.textContent =
  'ずんだもんが百人一首を読むのだ。発音やイントネーションが違うかもしれないのだ。ゆるしてほしいのだ。事情的にスマホサイズに最適化しているのだ。';

const h2Header = document.createElement('h2');
h2Header.textContent = '使い方';

const descriptioinPtag = document.createElement('p');
descriptioinPtag.textContent =
  '読んでほしい歌番号をするのだ、複数ある場合には「,」で区切るのだ。全部読むなら「-1」と入れるのだ。';

const inputText = document.createElement('input');
inputText.placeholder = '1, 2, 12, 22';
inputText.style.width = '100%';
inputText.style.height = '2rem';

const buttonWrap = document.createElement('div');
buttonWrap.style.marginTop = '2rem';
buttonWrap.style.display = 'flex';
buttonWrap.style.justifyContent = 'space-between';

const sortOrderBtn = document.createElement('button');
sortOrderBtn.type = 'button';
sortOrderBtn.style.width = '45%';
sortOrderBtn.style.height = '4rem';
sortOrderBtn.textContent = '入力順に詠み上げ';

const randomOrderBtn = document.createElement('button');
randomOrderBtn.style.width = '45%';
randomOrderBtn.style.height = '4rem';
randomOrderBtn.textContent = 'ランダムに読み上げ';

buttonWrap.appendChild(sortOrderBtn);
buttonWrap.appendChild(randomOrderBtn);

document.body.appendChild(h1Header);
document.body.appendChild(readLine);
document.body.appendChild(h2Header);
document.body.appendChild(descriptioinPtag);
document.body.appendChild(inputText);
document.body.appendChild(buttonWrap);

const outText = document.createElement('p');
document.body.appendChild(outText);

sortOrderBtn.addEventListener('click', async () => {
  const value = inputText.value;
  const value_list = value.split(',').filter((n) => Number(n));
  const adjstNum = value_list[0] + 1;
  const fileName_str = adjstNum.toString().padStart(3, '0');
  sound = await loadSound(audioctx, `${fileName_str}`);
  const src = new AudioBufferSourceNode(audioctx, { buffer: sound });
  src.connect(audioctx.destination);
  src.start();
});

async function loadSound(actx, fileName) {
  const _uri = `./media/mp3/${fileName}.mp3`;
  const res = await fetch(_uri);
  const arraybuf = await res.arrayBuffer();
  return actx.decodeAudioData(arraybuf);
}

const audioctx = new AudioContext();
let sound = null;

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
