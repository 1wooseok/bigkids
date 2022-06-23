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
      BIGKIDS_DATA: null,
    };
    this.fetchData(this.state.date); // init
  }
  mounted() {
    let keyword,
      wordcloud,
      network,
      linechart,
      news = null;
    if (this.state.BIGKIDS_DATA && this.state.date) {
      keyword = this.state.BIGKIDS_DATA.keyword;
      wordcloud = this.state.BIGKIDS_DATA.wordcloud;
      network = this.state.BIGKIDS_DATA.network;
      linechart = this.state.BIGKIDS_DATA.linechart;
      news = this.state.BIGKIDS_DATA.news;
    }
    const keyword_wrap = document.getElementById("keyword_wrap");
    const wordCloud_wrap = document.getElementById("word_cloud");
    const networkGraph_wrap = document.getElementById("network_wrap");
    const lineChart_wrap = document.getElementById("lineChart_wrap");
    const newsTable_wrap = document.getElementById("news_table");

    new Keyword(keyword_wrap, {
      date: this.state.date,
      KEYWORD_DATA: keyword,
      fetchData: this.fetchData.bind(this),
    });
    new WordCloud(wordCloud_wrap, {
      WORD_CLOUD_DATA: wordcloud,
      renderWordCloud: this.renderWordCloud.bind(this),
    });
    new NetworkGraph(networkGraph_wrap, {
      NETWORK_DATA: network,
      renderNetworkGraph: this.renderNetworkGraph.bind(this),
    });
    new LineChart(lineChart_wrap, {
      LINE_CHART_DATA: linechart,
      renderLineChart: this.renderLineChart.bind(this),
    });
    new NewsTable(newsTable_wrap, {
      NEWS_DATA: news,
    });
  }

  // method
  renderWordCloud(WORD_CLOUD_DATA) {
    createWordCloud(WORD_CLOUD_DATA);
  }

  renderNetworkGraph(NETWORK_DATA) {
    const LINKS = generateLinksByNodes(NETWORK_DATA);
    createNetworkGraph(NETWORK_DATA, LINKS);
  }

  renderLineChart(LINE_CHART_DATA) {
    return createLineChart(LINE_CHART_DATA);
  }

  async fetchData(newDate) {
    this.setState({ BIGKIDS_DATA: null });
    const res = await fetchBigKidsData(newDate);
    this.setState({ date: newDate, BIGKIDS_DATA: res });
  }
}
