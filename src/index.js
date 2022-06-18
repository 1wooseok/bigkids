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

export async function render(date=null) {
  const BIG_KIDS_DATA = await fetchBigKidsData("2022-05-06");
  console.log({BIG_KIDS_DATA})
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

window.onload = render;
bindEvent();
