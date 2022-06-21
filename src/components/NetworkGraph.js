import Component from "./Component.js";

export default class NetworkGraph extends Component {
  template() {
    if (!this.props.NETWORK_DATA) {
      return `
        <div id="NETWORK_Loader">
          <div class='spinner2'></div>
        </div>
      `;
    }
    return `<svg id="NETWORK_GRAPH"></svg>`;
  }
  
  mounted() {
    this.props.renderNetworkGraph(this.props.NETWORK_DATA);
  }
}
