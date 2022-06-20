import Component from "./Component.js";
import { getXlabelElement } from "../utils/utils.js";

export default class WordCloud extends Component {
  constructor(render, props) {
    super(render, props);
    this.render();
    this.props = props;
  }
  
  template() {
    const { LINE_CHART_DATA } = this.props;
    if (!LINE_CHART_DATA) return ``;

    const week = LINE_CHART_DATA?.map((l) => l.date);

    return `
      <canvas id="myChart">
        <div class="test"></div>
      </canvas>
      <div class="chart-border"></div>
      <div class="xAxis">${week.map(getXlabelElement).join(" ")}</div>
    `;
  }

  mounted() {
    this.props.renderLineChart();
  }
}
