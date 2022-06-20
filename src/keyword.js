function renderKeyword(KEYWORD_DATA) {
    const { next, today, prev } = KEYWORD_DATA;
  
    const prev_keyword = document.getElementById('prev_keyword');
    const today_keyword = document.getElementById('today_keyword');
    const next_keyword = document.getElementById('next_keyword');
    const period = document.getElementById("period");
    const [yy, mm, dd] = today.date.split("-").map((x) => parseInt(x));
  
    prev_keyword.textContent = prev.word;
    today_keyword.textContent = today.word;
    next_keyword.textContent = next.word;
    period.textContent = `기간 : ${new Date(yy, mm - 1, dd)
      .toLocaleDateString()
      .slice(0, -1)} ~ ${new Date(yy, mm - 1, dd + 6)
      .toLocaleDateString()
      .slice(0, -1)}`;
  }
  