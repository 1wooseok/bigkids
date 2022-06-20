import Component from "./Component.js";

export default class Keyword extends Component {
  constructor(render, props) {
    super(render, props);
    this.render();
    this.props = props;
  }

  template() {
    if (!this.props?.KEYWORD_DATA) {
      return `
      <h3>오늘의 키워드</h3>
      <div class="keyword" >
        <div id="prev_keyword" class="off_keyword prev"></div>
        <div class="arr"><img class="prev" src="./image/next-2.png" alt="arr"></div>
        <div id="today_keyword" class="on_keyword"></div>
        <div class="arr"><img src="./image/next-2.png" alt="arr"></div>
        <div id="next_keyword" class="off_keyword"></div>
      </div>
    `;
    }
    const { prev, today, next } = this.props?.KEYWORD_DATA;
    const [yy, mm, dd] = today.date.split("-").map((x) => parseInt(x));
    return `
      <h3>오늘의 키워드</h3>
      <div class="keyword" >
          <div id="prev_keyword" class="off_keyword prev">${prev.word}</div>
          <div class="arr"><img class="prev" src="./image/next-2.png" alt="arr"></div>
          <div id="today_keyword" class="on_keyword">${today.word}</div>
          <div class="arr"><img src="./image/next-2.png" alt="arr"></div>
          <div id="next_keyword" class="off_keyword">${next.word}</div>
      </div>
      <div class="key_times">
        <p id="period">${`기간 : ${new Date(yy, mm - 1, dd)
          .toLocaleDateString()
          .slice(0, -1)} ~ ${new Date(yy, mm - 1, dd + 6)
          .toLocaleDateString()
          .slice(0, -1)}`}</p>
      </div>
    `;
  }

  setEvent() {
    this.target.addEventListener("click", (e) => {
      if (e.target.classList.contains("prev")) {
        const [yy, mm, dd] = this.props.date.split("-").map((x) => parseInt(x));
        this.setState({ date: new Date(yy, mm - 1, dd) });
      }
    });
  }
}
