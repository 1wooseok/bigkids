import Component from "./Component.js";
// import { updateLineChart } from "../utils/createLineChart.js";
import { getXlabelElement } from "../utils/utils.js";

export default class LineChart extends Component {
  template() {
    const { LINE_CHART_DATA } = this.props;
    if (!LINE_CHART_DATA)
      return `<div id="NETWORK_Loader"><div class='spinner2'></div></div>`;

    if (LINE_CHART_DATA === [])
      return `<div><strong>데이터가 존재하지 않습니다.</strong></div>`;

    const week = LINE_CHART_DATA?.map((l) => l.date);
    return `
      <canvas id="myChart"></canvas>
      <div class="xAxis">${week.map(getXlabelElement).join(" ")}</div>
    `;
  }

  mounted() {
    const { LINE_CHART_DATA } = this.props;
    this.props.renderLineChart(LINE_CHART_DATA);
    // updateLineChart(myChart, LINE_CHART_DATA);
  }
}
