import Component from "./Component.js";

export default class Keyword extends Component {
  template() {
    if (!this.props?.KEYWORD_DATA) {
      return `
      <h3>오늘의 키워드</h3>
      <div class="keyword">
        <div id="prev_keyword" class="off_keyword"><div class='spinner2'></div></div>
        <div class="arr"><img src="../../static/image/next-2.png" alt="arr"></div>
        <div id="today_keyword" class="on_keyword"><div class='spinner2'></div></div>
        <div class="arr"><img src="../../static/image/next-2.png" alt="arr"></div>
        <div id="next_keyword" class="off_keyword"><div class='spinner2'></div></div>
      </div>
    `;
    }
    const { prev, today, next } = this.props?.KEYWORD_DATA;
    return `
      <h3>오늘의 키워드</h3>
      <div class="keyword">
          <div id="prev_keyword" class="off_keyword prev_btn">${prev.word}</div>
          <div class="arr"><img class="prev_btn" src="../../static/image/next-2.png" alt="arr"></div>
          <div id="today_keyword" class="on_keyword">${today.word}</div>
          <div class="arr"><img class="next_btn" src="../../static/image/next-2.png" alt="arr"></div>
          <div id="next_keyword" class="off_keyword next_btn">${next.word}</div>
      </div>
      <div class="key_times">
        <p id="period">${`기간 : ${today.from_date.replace(
          /-/g,
          ". "
        )} ~ ${today.until_date.replace(/-/g, " .")}`}</p>
      </div>
    `;
  }

  setEvent() {
    this.target.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      const [yy, mm, dd] = this.props.date.split("-").map((x) => parseInt(x));

      if (e.target.classList.contains("prev_btn")) {
        const prevDate = new Date(yy, mm - 1, dd)
          .toISOString()
          .substring(0, 10);
        this.props.date = prevDate;
        this.props.fetchData(prevDate);
      }

      if (e.target.classList.contains("next_btn")) {
        const nextDate = new Date(yy, mm - 1, dd + 2)
          .toISOString()
          .substring(0, 10);
        if (this.props.date === new Date().toISOString().substring(0, 10))
          return;
        this.props.date = nextDate;
        this.props.fetchData(nextDate);
      }
    });
  }
}