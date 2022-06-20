import Component from "./Component.js";

export default class NetworkGraph extends Component {
  template() {
    return `<svg id="NETWORK_GRAPH"></svg>`
  }
  mounted() {
    this.props.renderNetworkGraph();
  }
}