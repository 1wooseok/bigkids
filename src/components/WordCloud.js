import Component from "./Component.js";

export default class WordCloud extends Component {
  // constructor(render, props) {
  //   super(render, props);
  //   this.render();    
  //   this.props = props;
  // }

  mounted() {
    this.props.renderWordCloud();
  }
}