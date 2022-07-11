import {
  Component,
  Keyword,
  WordCloud,
  NetworkGraph,
  LineChart,
  NewsTable,
} from "./components/index.js";

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
      CURR_MODAL: null
    };
    this.fetchData(this.state.date); // init
  }

  mounted() {
    let keyword, wordcloud, network, linechart, news = null;

    if (this.state.BIGKIDS_DATA && this.state.date) {
      keyword = this.state.BIGKIDS_DATA.keyword;
      wordcloud = this.state.BIGKIDS_DATA.wordcloud;
      network = this.state.BIGKIDS_DATA.network;
      linechart = this.state.BIGKIDS_DATA.linechart;
      news = this.state.BIGKIDS_DATA.news;
    }

    const keyword_wrap = this.target.querySelector("#keyword_wrap");
    const wordCloud_wrap = this.target.querySelector("#word_cloud");
    const networkGraph_wrap = this.target.querySelector("#network_wrap");
    const lineChart_wrap = this.target.querySelector("#lineChart_wrap");
    const newsTable_wrap = this.target.querySelector("#news_table");

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

  setEvent() {
    this.target.addEventListener('click', e => {
      e.stopImmediatePropagation();
      if (e.target.classList.contains('report_btn')) {
        if (!this.state.BIGKIDS_DATA) {
          return alert("데이터가 없습니다.");
        }
        window.print();
      }
    })
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
    try {
      const res = await fetchBigKidsData(newDate);
      this.setState({ date: newDate, BIGKIDS_DATA: res });
    } catch (err) {
      console.error(err);
    }
  }
}