import { fetchBigKidsData } from "./api.js";
import { createWordCloud } from "./wordCloud.js";
import { createNewWordCloud } from "./newWordCloud.js";
import { createNetworkGraph } from "./networkGraph.js";
import { createLineChart } from "./lineChart.js";
import { generateLinksByNodes } from "./utils.js";

window.onload = async () => {
  const BIG_KIDS_DATA = await fetchBigKidsData("2022-05-06");
  console.log({ BIG_KIDS_DATA });
  if (!BIG_KIDS_DATA) console.log("..loading");
  const {
    wordcloud: WORD_CLOUD_DATA,
    network: NETWORK_DATA,
    linechart: LINE_CHART_DATA,
    news: NEWS_DATA,
  } = BIG_KIDS_DATA;
//   createWordCloud(WORD_CLOUD_DATA);
  createNewWordCloud(WORD_CLOUD_DATA);
  createNetworkGraph(NETWORK_DATA, generateLinksByNodes(NETWORK_DATA));
  createLineChart(LINE_CHART_DATA);
};
