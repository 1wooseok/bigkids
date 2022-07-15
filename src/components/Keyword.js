import Component from "./Component.js";
import { dashFormat } from "../utils/utils.js";

export default class Keyword extends Component {
  template() {
    const { KEYWORD_DATA } = this.props;

    if (!KEYWORD_DATA) {
      return `
      <h3>오늘의 <span class="today_key">키워드<span class="key_underline"></span></span></h3>
      <div class="keyword">
        <div id="prev_keyword" class="off_keyword"><div class='spinner2'></div></div>
        <div class="arr"><img src="../../static/image/next-2.png" alt="arr"></div>
        <div id="today_keyword" class="on_keyword"><div class='spinner2'></div></div>
        <div class="arr"><img src="../../static/image/next-2.png" alt="arr"></div>
        <div id="next_keyword" class="off_keyword"><div class='spinner2'></div></div>
      </div>
    `;
    }

    const { prev, today, next } = KEYWORD_DATA;
    return `
      <h3>오늘의 <span class="today_key">키워드<span class="key_underline"></span></span></h3>
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
    let { date, fetchData } = this.props;
    const [yy, mm, dd] = date.split("-").map((x) => parseInt(x));

    this.target.onclick = (e) => {
      if (e.target.classList.contains("prev_btn")) {
        const prevDate = dashFormat(yy, mm - 1, dd);
        date = prevDate;
        fetchData(prevDate);
      }

      if (e.target.classList.contains("next_btn")) {
        if (date === dashFormat()) {
          return;
        }
        const nextDate = dashFormat(yy, mm - 1, dd + 2);
        date = nextDate;
        fetchData(nextDate);
      }
    }
  }
}

