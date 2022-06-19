import { fetchBigKidsData } from "./api.js";
import { renderNewWordCloud } from "./newWordCloud.js";
import { renderNetworkGraph } from "./networkGraph.js";
import { renderLineChart } from "./lineChart.js";
import { renderNews } from "./news.js";
import { bindEvent, generateLinksByNodes } from "./utils.js";

let state = {
  date: "2022-05-06", // new Date().toISOString().substring(0, 10)
};

export const setState = (newState) => {
  const { date } = state;
  state = {
    ...state,
    ...newState,
  };
  render(date);
};

export async function render(date = null) {
  const BIG_KIDS_DATA = await fetchBigKidsData("2022-05-06");
  console.log(BIG_KIDS_DATA);
  const {
    wordcloud: WORD_CLOUD_DATA,
    network: NETWORK_DATA,
    linechart: LINE_CHART_DATA,
    news: NEWS_DATA,
    keyword: KEYWORD_DATA
  } = BIG_KIDS_DATA;

  
  renderKeyword(KEYWORD_DATA);
  renderNewWordCloud(WORD_CLOUD_DATA);
  renderNetworkGraph(NETWORK_DATA, generateLinksByNodes(NETWORK_DATA));
  renderLineChart(LINE_CHART_DATA);
  renderNews(NEWS_DATA);
}

window.onload = render;
bindEvent(state, setState);

function renderKeyword(KEYWORD_DATA) {
  const { next, today, prev } = KEYWORD_DATA;

  const prev_keyword = document.getElementById('prev_keyword');
  const today_keyword = document.getElementById('today_keyword');
  const next_keyword = document.getElementById('next_keyword');
  const period = document.getElementById("period");

  prev_keyword.textContent = prev.word;
  today_keyword.textContent = today.word;
  next_keyword.textContent = next.word;

  const [yy, mm, dd] = today.date.split("-").map((x) => parseInt(x));
  period.textContent = `기간 : ${new Date(yy, mm - 1, dd)
    .toLocaleDateString()
    .slice(0, -1)} ~ ${new Date(yy, mm - 1, dd + 6)
    .toLocaleDateString()
    .slice(0, -1)}`;
}
