import Component from "./components/Component.js";
import Keyword from "./components/Keyword.js";
import WordCloud from "./components/WordCloud.js";
import NetworkGraph from "./components/NetworkGraph.js";
import LineChart from "./components/LineChart.js";
import NewsTable from "./components/NewsTable.js";

import createWordCloud from "./utils/createWordCloud.js";
import createNetworkGraph from "./utils/createNetworkGraph.js";
import createLineChart from "./utils/createLineChart.js";
import { generateLinksByNodes } from "./utils/utils.js";
import { fetchBigKidsData } from "./api.js";

export default class App extends Component {
  setup() {
    this.state = {
      date: new Date().toISOString().substring(0, 10),
      BIGKIDS_DATA: {},
    };
    this.fetchData(this.state.date); // init
  }
  mounted() {
    const { keyword, lineChart, news } = this.state.BIGKIDS_DATA;
    const keyword_wrap = document.getElementById("keyword_wrap");
    const wordCloud_wrap = document.getElementById("word-cloud");
    const networkGraph_wrap = document.getElementById("NETWORK_GRAPH");
    const lineChart_wrap = document.getElementById("lineChart_wrap");
    const newsTable_wrap = document.getElementById("news_table");

    new Keyword(keyword_wrap, {
      date: this.state.date,
      KEYWORD_DATA: keyword,
      fetchData: this.fetchData.bind(this)
    });
    new WordCloud(wordCloud_wrap, {
      renderWordCloud: this.renderWordCloud.bind(this),
    });
    new NetworkGraph(networkGraph_wrap, {
      renderNetworkGraph: this.renderNetworkGraph.bind(this),
    });
    new LineChart(lineChart_wrap, {
      LINE_CHART_DATA: lineChart,
      renderLineChart: this.renderLineChart.bind(this),
    });
    new NewsTable(newsTable_wrap, {
      NEWS_DATA: news,
    });
  }

  // method
  renderWordCloud() {
    const { wordCloud } = this.state.BIGKIDS_DATA;
    createWordCloud(wordCloud);
  }
  
  renderNetworkGraph() {
    const { network } = this.state.BIGKIDS_DATA;
    const links = generateLinksByNodes(network);
    createNetworkGraph(network, links);
  }
  
  renderLineChart() {
    const { linechart } = this.state.BIGKIDS_DATA;
    createLineChart(linechart);
  }

  async fetchData(date) {
    const res = await fetchBigKidsData(date);
    this.setState({ date, BIGKIDS_DATA: res });
  }
}
