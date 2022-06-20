export function getXlabelElement(date) {
  const yoil = getYoilByDate(new Date(date).getDay());
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