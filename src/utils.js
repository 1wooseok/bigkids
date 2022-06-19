export function generateLinksByNodes(NODES) {
  NODES = NODES.nodes;
  const links = [];

  for (let i = 0; i < NODES.length; i++) {
    const { id, value } = NODES[i];
    for (let j = i; j < NODES.length; j++) {
      const { id: id2, value: value2 } = NODES[j];
      if (id2 != id) {
        if (value === value2) {
          links.push({ source: id, target: id2, value });
        }
      }
    }
  }
  return links;
}

export function renderXlabelElements(dates) {
  const xAxis = document.querySelector(".xAxis");
  xAxis.innerHTML = dates.map(getXlabelElement).join(" ");
}

function getXlabelElement(date) {
  const yoil = getYoilByDate(new Date(date).getDay());
  return `
    <div class="x-label-wrap">
    <div class="x-label ${
      yoil === "일" ? "__sun" : yoil === "토" ? "__sat" : null
    }">${yoil}</div>
    <div class="x-date-label">${date.split("-")[1]}.${date.split("-")[2]}</div>
    </div>`;
}


export function bindEvent(state, setState) {
  const [yy, mm, dd] = state.split("-").map((x) => parseInt(x));

  const keyword_wrap = document.getElementById("keyword_wrap");
  keyword_wrap.addEventListener("click", debounce((e) => {
    if (e.target.className.includes("prev")) {
      setState({ date: new Date(yy, mm - 1, dd) });
    }
  }, 100));
}

function debounce(callback, delay = 100) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback(...args);
    }, delay);
  };
}

function getYoilByDate(num) {
  switch (num) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      throw new Error(alert("날짜 에러"));
  }
}