import Component from "./Component.js";

export default class WordCloud extends Component {
  template() {
    const {WORD_CLOUD_DATA} = this.props;
    if (!WORD_CLOUD_DATA)
      return `<div id='WORD_CLOUD_Loader'><div class='spinner2'></div></div>`;
    if (WORD_CLOUD_DATA.length === 0) {
      console.log('lengt = 0', {WORD_CLOUD_DATA})
      return `<div class='no_data'>데이터가 존재하지 않습니다.</div>`;
    }
    return `<div></div>`;
  }
  mounted() {
    this.props.renderWordCloud(this.props.WORD_CLOUD_DATA);
  }
}
