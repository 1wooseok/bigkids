import { fetchBigKidsData } from "./api.js";
import { renderNewWordCloud } from "./newWordCloud.js";
import { renderNetworkGraph } from "./networkGraph.js";
import { renderLineChart } from "./lineChart.js";
import { renderNews } from "./news.js";
import { bindEvent, generateLinksByNodes } from "./utils.js";

window.onload = init;

async function init() {
  const BIG_KIDS_DATA = await fetchBigKidsData("2022-05-06");

  const {
    wordcloud: WORD_CLOUD_DATA,
    network: NETWORK_DATA,
    linechart: LINE_CHART_DATA,
    news: NEWS_DATA,
  } = BIG_KIDS_DATA;

  renderNewWordCloud(WORD_CLOUD_DATA);
  renderNetworkGraph(NETWORK_DATA, generateLinksByNodes(NETWORK_DATA));
  renderLineChart(LINE_CHART_DATA);
  renderNews(NEWS_DATA);
}

// bindEvent();
const keyword_wrap = document.getElementById("keyword_wrap");
// keyword_wrap.addEventListener("click", (e) => {
//   console.log(e.target.className);
//   if (e.target.className.includes("prev")) {
//     console.log("1");
//     // refetch
//     // rerender
//   }
// });

keyword_wrap.addEventListener("click", e => console.log(e.target));
  
function handleClick(e) {
  console.log(e.target);
}