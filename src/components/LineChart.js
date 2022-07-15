import Component from "./Component.js";
import { generateXlabelElement, generateFullWeek } from "../utils/utils.js";

export default class LineChart extends Component {
  template() {
    const { LINE_CHART_DATA } = this.props;

    if (!LINE_CHART_DATA) {
      return `<div id="NETWORK_Loader"><div class='spinner2'></div></div>`;
    }

    if (LINE_CHART_DATA.length === 0) {
      return `<div class='no_data'>데이터가 존재하지 않습니다.</div>`;
    }

    return `
      <canvas id="myChart"></canvas>
      <div class="xAxis">
        ${generateFullWeek(LINE_CHART_DATA)
        .map(generateXlabelElement)
        .join(" ")
      }
      </div>
    `;
  }

  mounted() {
    const { LINE_CHART_DATA, renderLineChart } = this.props;
    renderLineChart(LINE_CHART_DATA);
  }
}
