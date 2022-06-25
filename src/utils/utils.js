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

export function jsonToExcel(json) {
    if (!json || json.news.length === 0) return alert("데이터가 존재하지 않습니다.");
    const wb = XLSX.utils.book_new();
    wb.SheetNames.push("sheet 1");
    const wsData = [["날짜", "언론사", "제목", "링크"]];
    json.news.forEach(row => {
        const {date, media, title, link} = row;
        wsData.push([date, media, title, link])
    });
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    wb.Sheets["sheet 1"] = ws;
    const wbout = XLSX.write(wb, {bookType: "xlsx", type: "binary"});
    saveAs(
        new Blob([stringToArrayBuffer(wbout)], {type: "application/octet-stream"}),
        "빅키즈_뉴스.xlsx"
    );
}

function stringToArrayBuffer(str) {
    let buf = new ArrayBuffer(str.length); //convert s to arrayBuffer
    let view = new Uint8Array(buf);  //create uint8array as viewer
    for (let i = 0; i < str.length; i++) view[i] = str.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}

export function mapWeightAndFont(WORD_CLOUD_DATA) {
    const result = {};
    const font_sizes = [10, 16, 22, 28];

    const set = new Set();
    WORD_CLOUD_DATA.forEach(data => {
        const {size} = data;
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
        const {id, value} = NODES[i];
        for (let j = i; j < NODES.length; j++) {
            const {id: id2, value: value2} = NODES[j];
            if (id2 != id) {
                if (value === value2) {
                    links.push({source: id, target: id2, value});
                }
            }
        }
    }
    return links;
}

export function getXlabelElement(date) {
    const yoils = ["일", "월", "화", "수", "목", "금", "토"];
    const yoil = yoils[new Date(date).getDay()];
    return `
      <div class="x-label-wrap">
      <div class="x-label ${
        yoil === "일" ? "__sun" : yoil === "토" ? "__sat" : null
    }">${yoil}</div>
      <div class="x-date-label">${date.split("-")[1]}.${
        date.split("-")[2]
    }</div>
      </div>`;
}