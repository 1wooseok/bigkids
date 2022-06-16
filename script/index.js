let DATA;

const YOIL = ["월", "화", "수", "목", "금", "토", "일", "월"];

const getXlabelElement = (yoil) => {
  return `
    <div class="x-label-wrap">
    <div class="x-label">${yoil}</div>
    <div class="x-date-label">06.05</div>
    </div>`;
};

const renderXlabelElements = () => {
  const xAxis = document.querySelector(".xAxis");
  xAxis.innerHTML = YOIL.map(getXlabelElement).join(" ");
};

window.onload = renderXlabelElements;

const getServerData = async () => {
  try {
    const today = new Date();
    // const formattedDate = today.toISOString().substring(0, 10);
    const res = await fetch(`http://toch.kr:8000/api/2022-05-06`);
    const json = await res.json();
    DATA = json;
    console.log(json);
  } catch (err) {
    throw new Error(`${err} - 데이터 받아올때 에러`);
  }
};

getServerData();
console.log({DATA})