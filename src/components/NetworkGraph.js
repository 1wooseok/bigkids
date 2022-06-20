import Component from "./Component.js";

export default class NetworkGraph extends Component {
  mounted() {
    this.props.renderNetworkGraph();
  }
}