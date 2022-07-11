export function generateFullWeek(LINE_CHART_DATA) {
    const week = LINE_CHART_DATA?.map((l) => l.date);
    const [yy, mm, dd] = week[week.length - 1].split('-').map(Number);
    let cnt = 2;
    while (week.length < 7) {
        week.push(new Date(yy, mm - 1, dd + cnt).toISOString().substring(0, 10));
        cnt += 1
    }
    return week;
}

export function generateXlabelElement(date) {
    const yoils = ["일", "월", "화", "수", "목", "금", "토"];
    const yoil = yoils[new Date(date).getDay()];
    return `
      <div class="x-label-wrap">
      <div class="x-label ${yoil === "일" ? "__sun" : yoil === "토" ? "__sat" : null
        }">${yoil}</div>
      <div class="x-date-label">${date.split("-")[1]}.${date.split("-")[2]
        }</div>
      </div>`;
}

export function generateNewsQuantityData(LINE_CHART_DATA) {
    let news_quantity = Array(7).fill(0);
    for (let i = 0; i < LINE_CHART_DATA.length; i++) {
        news_quantity[i] = LINE_CHART_DATA[i].value;
    }
    return news_quantity;
}

export function mapWeightAndFont(WORD_CLOUD_DATA) {
    const result = {};
    const font_sizes = [10, 16, 22, 28];

    const set = new Set();
    WORD_CLOUD_DATA.forEach(data => {
        const { size } = data;
        set.add(Number(size))
    })
    const weights = Array.from(set).sort();
    for (let i = 0; i < weights.length; i++) {
        result[weights[i]] = font_sizes[i];
    }
    return result;
}

export function generateLinksByNodes(NODES) {
    if (!NODES) return null;
    NODES = NODES.nodes;
    const links = [];

    for (let i = 0; i < NODES.length; i++) {
        const { id, value } = NODES[i];
        for (let j = i; j < NODES.length; j++) {
            const { id: id2, value: value2 } = NODES[j];
            if (id2 != id) {
                if (value === value2) {
                    links.push({ source: id, target: id2, value });
                }
            }
        }
    }
    return links;
}

export function dashFormat(yy, mm, dd) {
    if (!yy || !mm || !dd) {
        return new Date().toISOString().substring(0, 10);
    }
    return new Date(yy, mm, dd).toISOString().substring(0, 10);
}

export function debounce(callback, delay = 1500) {
    let timer;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            callback(...args);
        }, delay);
    };
}