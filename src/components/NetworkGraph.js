import Component from "./Component.js";

export default class NetworkGraph extends Component {
  template() {
    console.log(this.props.NETWORK_DATA);
    if (!this.props.NETWORK_DATA) {
      return `
        <div id="NETWORK_Loader">
          <div class='spinner2'></div>
        </div>
      `;
    }
    if (this.props.NETWORK_DATA.nodes.length === 0) {
      return `<div class="no_data">데이터가 존재하지 않습니다.</div>`;
    }
    return `<svg id="NETWORK_GRAPH"></svg>`;
  }

  mounted() {
    this.props.renderNetworkGraph(this.props.NETWORK_DATA);
  }
}
