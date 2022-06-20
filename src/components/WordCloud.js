import Component from "./Component.js";

export default class WordCloud extends Component {
  template() { 
    return `<div id='WORD_CLOUD'></div>`;
  }
  mounted() {
    this.props.renderWordCloud();
  }
}