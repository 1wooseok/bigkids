import Component from "./Component.js";

export default class WordCloud extends Component {
  template() { 
    if (!this.props.WORD_CLOUD_DATA) return `<div id='WORD_CLOUD_Loader'><div class='spinner2'></div></div>`
    return `<div id='WORD_CLOUD'></div></div>`;
  }
  mounted() {
    this.props.renderWordCloud(this.props.WORD_CLOUD_DATA);
  }
}