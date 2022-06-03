function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function getRandomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

function fillColor(d, i) {
  return d.color;
}

// List of words
const min_font_size = 20;
const max_font_size = 60;
var myWords = [
  {
    text: "포트나이트",
    size: getRandomInt(min_font_size, max_font_size),
    color: `#${getRandomColor()}`,
  },
  {
    text: "IP",
    size: getRandomInt(min_font_size, max_font_size),
    color: `#${getRandomColor()}`,
  },
  {
    text: "제페토",
    size: getRandomInt(min_font_size, max_font_size),
    color: `#${getRandomColor()}`,
  },
  {
    text: "메타버스",
    size: getRandomInt(min_font_size, max_font_size),
    color: `#${getRandomColor()}`,
  },
  {
    text: "다각도",
    size: getRandomInt(min_font_size, max_font_size),
    color: `#${getRandomColor()}`,
  },
  {
    text: "NFT",
    size: getRandomInt(min_font_size, max_font_size),
    color: `#${getRandomColor()}`,
  },
  {
    text: "마인크래프트",
    size: getRandomInt(min_font_size, max_font_size),
    color: `#${getRandomColor()}`,
  },
  {
    text: "이용자",
    size: getRandomInt(min_font_size, max_font_size),
    color: `#${getRandomColor()}`,
  },
  {
    text: "로벅스",
    size: getRandomInt(min_font_size, max_font_size),
    color: `#${getRandomColor()}`,
  },
  {
    text: "클레이튼",
    size: getRandomInt(min_font_size, max_font_size),
    color: `#${getRandomColor()}`,
  },
  {
    text: "블록체인",
    size: getRandomInt(min_font_size, max_font_size),
    color: `#${getRandomColor()}`,
  },
];
