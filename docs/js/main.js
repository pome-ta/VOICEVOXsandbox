import { hiraFuda } from './yomifuda.js';

const h1Header = document.createElement('h1');
h1Header.textContent = 'ずんだもん 百人一首 なのだ';
h1Header.style.margin = '1rem 0';

const readLine01 = document.createElement('p');
readLine01.textContent =
  'ずんだもんが百人一首を読むのだ。発音やイントネーションが違うかもしれないのだ。ゆるしてほしいのだ。';

const readLine02 = document.createElement('p');
readLine02.textContent = '諸事情でスマホサイズに最適化しているのだ。';

const h2Header = document.createElement('h2');
h2Header.textContent = '使い方';

const ulTag = document.createElement('ul');
const liTexts = [
  '読んでほしい歌番号を数字で入力するのだ。',
  'たくさんあるなら「,」で区切るのだ。',
  '全部読むなら何も入力しなくていいのだ。',
];

const create_liTags = (...textContents) => {
  const liTags = textContents.map((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
  });
  return liTags;
};

const set_ul_li = (ul, lis) => lis.forEach((li) => ul.appendChild(li));

set_ul_li(ulTag, create_liTags(...liTexts));

const inputText = document.createElement('input');
inputText.placeholder = '1, 2, 12, 22';
inputText.style.width = '100%';
inputText.style.height = '2rem';

const buttonWrap = document.createElement('div');
buttonWrap.style.marginTop = '1rem';
buttonWrap.style.display = 'flex';
buttonWrap.style.justifyContent = 'space-between';

const sortOrderBtn = document.createElement('button');
sortOrderBtn.type = 'button';
sortOrderBtn.style.width = '45%';
sortOrderBtn.style.height = '4rem';
sortOrderBtn.textContent = '入力された順番に読むのだ';

const randomOrderBtn = document.createElement('button');
randomOrderBtn.style.width = '45%';
randomOrderBtn.style.height = '4rem';
randomOrderBtn.textContent = 'ランダムな順番で読むのだ';



buttonWrap.appendChild(sortOrderBtn);
buttonWrap.appendChild(randomOrderBtn);

document.body.appendChild(h1Header);
document.body.appendChild(readLine01);
document.body.appendChild(readLine02);
document.body.appendChild(h2Header);
document.body.appendChild(ulTag);
document.body.appendChild(inputText);
document.body.appendChild(buttonWrap);



const create_table = (...utas) => {
  const tb = document.createElement('table');
  tb.style.margin = '1rem 0'
  
  
  utas.forEach((uta, index) => {
    const tr = document.createElement('tr');
    tr.style.height = '1rem';
    const tdNum = document.createElement('td');
    //tdNum.style.height = '1rem';
    tdNum.style.fontSize = '0.64rem';
    tdNum.style.textAlign = 'right'
    tdNum.textContent = `${index + 1}`
    const tdUta = document.createElement('td');
    tdUta.style.fontSize = '0.64rem';
    tdUta.textContent = uta
    tr.appendChild(tdNum)
    tr.appendChild(tdUta)
    tb.appendChild(tr)
  })
  tb.style.height = '100%';
  return tb
}

const fudaTable = create_table(...hiraFuda)

document.body.appendChild(fudaTable);



const footerTag = document.createElement('footer');
footerTag.textContent = 'VOICEVOX:ずんだもん';

footerTag.style.position = 'fixed';
footerTag.style.bottom = 0;
footerTag.style.fontSize = '0.64rem';

const aTag = document.createElement('a');
aTag.href = 'https://voicevox.hiroshiba.jp/';
aTag.textContent = 'https://voicevox.hiroshiba.jp/';

footerTag.appendChild(aTag);
document.body.appendChild(footerTag);

const audioctx = new AudioContext();

let isPlay = false;
sortOrderBtn.addEventListener('click', async () => {
  if (audioctx.state === 'suspended') {
    audioctx.resume();
  }
  if (!isPlay) {
    isPlay = true;
    const value = inputText.value;
    const _value_list = value.split(',').filter((n) => Number(n));
    const value_list = _value_list.length
      ? _value_list
      : [...Array(100)].map((_, i) => i + 1);
    const rootPath = './media/mp3/';
    const url_list = value_list.map(
      (n) => `${rootPath}${n.toString().padStart(3, '0')}.mp3`
    );
    await callZundaMon(url_list);
  }
});

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

randomOrderBtn.addEventListener('click', async () => {
  if (audioctx.state === 'suspended') {
    audioctx.resume();
  }
  if (!isPlay) {
    isPlay = true;
    const value = inputText.value;
    const _value_list = value.split(',').filter((n) => Number(n));
    const value_list = _value_list.length
      ? _value_list
      : [...Array(100)].map((_, i) => i + 1);
    const rootPath = './media/mp3/';
    const _url_list = value_list.map(
      (n) => `${rootPath}${n.toString().padStart(3, '0')}.mp3`
    );
    const url_list = shuffle(_url_list);
    await callZundaMon(url_list);
  }
});

async function callZundaMon(urls) {
  const buffers = new Array(urls.length);
  const sources = new Array(urls.length);
  async function loadSample(actx, uri) {
    const res = await fetch(uri);
    const arraybuf = await res.arrayBuffer();
    return actx.decodeAudioData(arraybuf);
  }
  const load = async (url, index) => {
    buffers[index] = await loadSample(audioctx, url);
  };
  for (const [index, url] of urls.entries()) {
    await load(url, index);
  }
  if (!buffers.length) {
    isPlay = false;
  }
  const t0 = audioctx.currentTime;
  const interval = 8.5;
  buffers.forEach((buffer, index) => {
    const source = (sources[index] = audioctx.createBufferSource());
    source.buffer = buffer;
    source.connect(audioctx.destination);
    const intervalIndex = interval * index;
    const durationPlaybackRate = source.buffer.duration / 1;
    const startTime = [t0 + intervalIndex, 0, durationPlaybackRate];
    const stopTime = t0 + intervalIndex + durationPlaybackRate;
    source.start(...startTime);
    source.stop(stopTime);
    source.addEventListener('ended', () => {
      if (index === urls.length - 1) {
        isPlay = false;
      }
    });
  });
}
