export function debounce(callback, delay = 1500) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback(...args);
    }, delay);
  };
}

export function getXlabelElement(date) {
  const yoils = ["일", "월", "화", "수", "목", "금", "토"];
  const yoil = yoils[new Date(date).getDay()];
  return `
      <div class="x-label-wrap">
      <div class="x-label ${
        yoil === "일" ? "__sun" : yoil === "토" ? "__sat" : null
      }">${yoil}</div>
      <div class="x-date-label">${date.split("-")[1]}.${
    date.split("-")[2]
  }</div>
      </div>`;
}

export function generateLinksByNodes(NODES) {
  if (!NODES) return null;
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
