import Component from "./Component.js";
// import { updateLineChart } from "../utils/createLineChart.js";
import { getXlabelElement } from "../utils/utils.js";

export default class LineChart extends Component {
  // setup() {
  //   this.state = this.props.renderLineChart();
  // }

  template() {
    const { LINE_CHART_DATA } = this.props;
    if (!LINE_CHART_DATA) return ``;
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
