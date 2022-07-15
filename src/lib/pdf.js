async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const elem = document.getElementById('pdf');
  const chart = document.getElementById('myChart');
  const props = {
    elem,
    chart,
    currentWidth: window.innerWidth,
    currentHeight: window.innerHeight,
    currentChartWidth: chart.style.width,
    currentChartHeight: chart.style.height,
  }
  try {
    // await loadFont();
    setPdfStyleLikeDesktop(props);
    const canvas = await html2canvas(elem, {
      allowTaint: true, // cross origin allow
      useCORS: true, // CORS 사용한 서버로부터 이미지 로드할 것인지 여부
      scale: 2
    });
    const pdf = await new jsPDF("p", "mm", "a4");
    await pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
    await pdf.save("빅키즈(BIG KIDS).pdf");
  } catch (err) {
    alert(err);
    throw new Error(`${err} - pdf변환시 에러`);
  }
  resetPdfStyle(props);
  togglePdfBtn();
}

function togglePdfBtn() {
  const btn = document.getElementById('report_btn');
  const elem = document.getElementById('report_text');
  const text = elem.textContent;
  const loading = '다운로드중...';
  const download = '리포트 다운로드';

  if (text === loading) {
    btn.disable = false;
    elem.textContent = download;
  } else if (text === download) {
    btn.disable = true;
    elem.textContent = loading;
  }
}

function setPdfStyleLikeDesktop(props) {
  const { elem, chart } = props;
  // window.innerWidth = "1980px";
  window.innerWidth = "1580px";
  window.innerHeight = "1080px";
  chart.style.width = "1280px"; // * 1980일떄 chart-width로 변경
  chart.style.height = "400px"; // * 1980일떄 chart-height로 변경
  elem.style.padding = "0 0 100px 0";
}

function resetPdfStyle(props) {
  const { elem, chart, currentWidth, currentHeight, currentChartWidth, currentChartHeight } = props;
  window.innerWidth = currentWidth + 'px';
  window.innerHeight = currentHeight + 'px';
  chart.style.width = currentChartWidth;
  chart.style.height = currentChartHeight;
  elem.style.padding = "0";
}

async function loadFont() {
  const Kanit = "https://fonts.googleapis.com/css?family=Kanit"
  const NanumSqure = 'https://webfontworld.github.io/naver/NanumSquareRound.css';
  const res = await fetch(NanumSqure);
  let css = await res.text();
  const fontURLs = css.match(/[(]https?:\/\/[^ \)]+/g);

  console.log(fontURLs[0]);

  const url = fontURLs[1].slice(1);
  setFont(url, css);
}

async function setFont(fontUrl, css) {
  try {
    const res = await fetch(fontUrl);
    const font = await res.blob();

    const reader = new FileReader();
    reader.onloadend = () => {
      css = css.replace(new RegExp(fontUrl), reader.result);

      console.log({ css });

      const styleEl = document.createElement('style');
      styleEl.appendChild(document.createTextNode(css));
      document.querySelector('#word_cloud').appendChild(styleEl);
    }
    reader.readAsDataURL(font);
  } catch (err) {
    throw new Error(`${err} - while fetching Font`);
  }
}

export default { downloadPDF, togglePdfBtn };
