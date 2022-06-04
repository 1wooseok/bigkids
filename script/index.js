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
