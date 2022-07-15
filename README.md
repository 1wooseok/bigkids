### <b>소개</b>

```
"어린이들을 위한 뉴스"를 제공하는 웹사이트 입니다.

그래프, 워드클라우드 통해 오늘의 뉴스를 한눈에 볼 수 있습니다.
```

<strong>https://bigkids.co.kr</strong>

<br>

### <b>기간</b>

```
22.06.22 - 22.07.15
```

<br>

### <b>기술</b>

```
"babel": "^6.23.0",
"webpack": "^5.73.0"
loader, plugin...

// CDN
"D3.js": "5.16.0",
"Chart.js": "3.7.1",
"jsPDF": "2.5.1",
"html2canvas": "1.4.1"
```

<br>

### <b>맡은 역할</b>

```
- 차트놀이 페이지 개발 ( 메인페이지 )

- 서버 데이터 요청 및 시각화

- 워드클라우드, 네트워크 그래프, 선 그래프, 테이블을 사용한 데이터 시각화

- 웹페이지 PDF 다운로드

- 반응형 웹페이지
```

<br>

### <b>부가 설명</b>

<hr>

### <b>1. Vanilla JS 컴포넌트</b>

<br>

```
단순한 어플리케이션이기 때문에 관리해야 할 상태가 거의 없지만,

날짜에 따라 데이터를 서버로부터 불러와 키워드, 그래프, 테이블 등

화면의 주요 요소들을 다시 렌더링 해야하기 때문에,

프로젝트 초기 단순히 요청후 렌더링 함수를 호출하는 방식에 어려움을 느껴

좀 더 체계적으로 관리하기 위해 ES6 class문법을 사용해 바뀌는 요소들을 컴포넌트화 하였습니다.
```

<small><i>"개발자 황준일 Vanilla Javascript로 웹 컴포넌트 만들기"</i> 를 참고하였습니다.</small>

```javascript
export default class Component {
  target; // 컴포넌트가 마운트 될 DOM입니다.
  state;
  props; // 부모컴포넌트의 상태, 메서드를 넘겨받을 수 있습니다.

  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {}
  // 컴포넌트의 초기 상태를 설정하는 함수입니다.
  // 서버로부터 데이터를 받아와 컴포넌트의 초기상태값을 설정할때 사용하였습니다.

  setEvent() {}
  // 컴포넌트에 이벤트를 등록하는 함수입니다.

  mounted() {}
  // 컴포넌트가 DOM에 마운트 된 후 실행되는 함수입니다.
  // DOM에 마운트 된 이후 그래프를 렌더링 할때 사용하였습니다.

  template() {
    return ``;
  }
  // 템플릿으로 사용할 문자열을 반환하는 함수입니다.
  // js Template Literals로 HTML element를 생성했습니다.

  render() {
    const template = this.tempate();
    if (template) {
      this.target.innerHTML = template;
      this.mounted();
    }
  }
  // 컴포넌트를 화면에 렌더링하는 함수입니다.
  // 'innerHTML'로 요소를 변경합니다.

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.render();
  }
  // 컴포넌트의 상태를 변경하는 함수입니다.
  // 상태가 변경후 render함수를 호출해 상태에 따른 리렌더링이 자동화됩니다.
  // 렌더링이 필요할때 상태만 변경하면 되기때문에,
  // 데이터가 없는 경우 UI, Loading UI등을 매우 편리하게 다룰 수 있었습니다.
}
```

```
컴포넌트를 추상화한뒤 상속을 받아 사용했습니다.
```

<br>

### <b>2. API 호출</b>

```javascript
import { API_SERVER } from "../../API_SERVER.js";

export async function fetchBigKidsData(date) {
  const TIME_OUT = { timeout: 10000 };
  const API_URL = `API_SERVER/${date}`;
  const MESSAGE =
    "데이터를 불러오는데 실패했습니다. 새로고침후 다시 시도해 주세요!";

  try {
    const res = await fetchWithTimeout(API_URL, TIME_OUT);
    const json = await res.json();
    return json;
  } catch (err) {
    throw new Error(alert(MESSAGE));
  }
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout } = options;
  const abortController = new AbortController();
  const id = setTimeout(() => abortController.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: abortController.signal,
  });
  clearTimeout(id);
  return response;
}
```

날짜를 파라미터로 요청합니다.

timeout을 10초를 설정했습니다.

\*---- timeout 원리 추가하기 ----\*

<br>

### <b>3. D3.js Word Cloud, Network Graph</b>

<br>

### <b>4. jsPDF, html2canvas </b>

<br>

### <b>5. 반응형 그래프</b>

\*---- SVG 개념 및 viewBox 개념 추가하기 ----\*

<br>

### <b>+ 이벤트리스너 버그</b>

```
현재 컴포넌트에 이벤트를 등록할때 `onclick`을 사용하고있습니다.

`onclick`은 간편하게 이벤트를 등록할 수 있지만,

한번에 하나의 핸들러만 연결할 수 있기때문에 좋은 해결책이 아닐것입니다.

그럼에도 `onclick`을 사용한 이유는 처음에 이벤트를 등록할떄 `template()`의 반환값인 문자열에 이벤트를 등록하는 것이 아닌

실제 DOM 객체인 `target`속성에 이벤트를 등록하고 있기때문에 자식요소가 리렌더링 되어도 `target`은 리렌더링 되지 않기때문에 이벤트 리스너가 중첩되서 추가되는 현상이 발생했습니다.
```

<img src="./image/evt.png" />

```
이를 해결하기 위해 `target`에 이벤트를 등록하는 대신 `template()`이 반환하는 html에 직접
이벤트를 등록할 수도 있지만,

해당 엘리먼트를 찾기위해 `document.querySelector`로 탐색을 한번 더 해야하기도하고 ,

click이외에 다른 추가적인 이벤트가 필요하지 않은 상황이므로 더 간편한 해결책인 `onclick`을 사용했습니다.
```

<br>

### <b>+ setState 날짜 변경 버그 </b>
