(()=>{"use strict";class t{target;state;props;constructor(t,e){this.target=t,this.props=e,this.setup(),this.render(),this.setEvent()}setup(){}setEvent(){}mounted(){}template(){return""}render(){""!==this.template()&&(this.target.innerHTML=this.template()),this.mounted()}setState(t){this.state={...this.state,...t},this.render()}}class e extends t{template(){if(!this.props?.KEYWORD_DATA)return'\n      <h3>오늘의 키워드</h3>\n      <div class="keyword">\n        <div id="prev_keyword" class="off_keyword"><div class=\'spinner2\'></div></div>\n        <div class="arr"><img src="./image/next-2.png" alt="arr"></div>\n        <div id="today_keyword" class="on_keyword"><div class=\'spinner2\'></div></div>\n        <div class="arr"><img src="./image/next-2.png" alt="arr"></div>\n        <div id="next_keyword" class="off_keyword"><div class=\'spinner2\'></div></div>\n      </div>\n    ';const{prev:t,today:e,next:n}=this.props?.KEYWORD_DATA,[r,a,s]=e.date.split("-").map((t=>parseInt(t)));return`\n      <h3>오늘의 키워드</h3>\n      <div class="keyword">\n          <div id="prev_keyword" class="off_keyword prev">${t.word}</div>\n          <div class="arr"><img class="prev" src="./image/next-2.png" alt="arr"></div>\n          <div id="today_keyword" class="on_keyword">${e.word}</div>\n          <div class="arr"><img src="./image/next-2.png" alt="arr"></div>\n          <div id="next_keyword" class="off_keyword">${n.word}</div>\n      </div>\n      <div class="key_times">\n        <p id="period">기간 : ${new Date(r,a-1,s-1).toLocaleDateString().slice(0,-1)} \n          ~\n          ${new Date(r,a-1,s+1).toLocaleDateString().slice(0,-1)}</p>\n      </div>\n    `}setEvent(){this.target.addEventListener("click",(t=>{if(t.target.classList.contains("prev")){t.stopImmediatePropagation();const[e,n,r]=this.props.date.split("-").map((t=>parseInt(t))),a=new Date(e,n-1,r).toISOString().substring(0,10);this.props.fetchData(a),this.props.date=a}}))}}class n extends t{template(){return this.props.WORD_CLOUD_DATA?this.props.WORD_CLOUD_DATA===[]?"<div><strong>데이터가 존재하지 않습니다.</strong></div>":"<div id='WORD_CLOUD'></div></div>":"<div id='WORD_CLOUD_Loader'><div class='spinner2'></div></div>"}mounted(){this.props.renderWordCloud(this.props.WORD_CLOUD_DATA)}}class r extends t{template(){return this.props.NETWORK_DATA?this.props.NETWORK_DATA===[]?"<div><strong>데이터가 존재하지 않습니다.</strong></div>":'<svg id="NETWORK_GRAPH"></svg>':"\n        <div id=\"NETWORK_Loader\">\n          <div class='spinner2'></div>\n        </div>\n      "}mounted(){this.props.renderNetworkGraph(this.props.NETWORK_DATA)}}function a(t){const e=["일","월","화","수","목","금","토"][new Date(t).getDay()];return`\n      <div class="x-label-wrap">\n      <div class="x-label ${"일"===e?"__sun":"토"===e?"__sat":null}">${e}</div>\n      <div class="x-date-label">${t.split("-")[1]}.${t.split("-")[2]}</div>\n      </div>`}class s extends t{template(){const{LINE_CHART_DATA:t}=this.props;if(!t)return"<div id=\"NETWORK_Loader\"><div class='spinner2'></div></div>";if(t===[])return"<div><strong>데이터가 존재하지 않습니다.</strong></div>";const e=t?.map((t=>t.date));return`\n      <canvas id="myChart"></canvas>\n      <div class="xAxis">${e.map(a).join(" ")}</div>\n    `}mounted(){const{LINE_CHART_DATA:t}=this.props;this.props.renderLineChart(t)}}class d extends t{template(){const{NEWS_DATA:t}=this.props;return t?t===[]?"<div><strong>데이터가 존재하지 않습니다.</strong></div>":`\n      ${t.map((t=>{const{date:e,media:n,title:r,link:a}=t;return`\n          <tr>\n            <td>${e.split("-").join(". ")}</td>\n            <td>${n}</td>\n            <td>${r}</td>\n            <td><a href="${a}" target="_blank">${a}<a></td>\n          </tr>\n        `})).join("")}\n    `:"<div id=\"NEWS_Loader\"><div class='spinner2'></div></div>"}}const i=[12,16,22,28];new class extends t{setup(){this.state={date:(new Date).toISOString().substring(0,10),BIGKIDS_DATA:null},this.fetchData(this.state.date)}mounted(){let t,a,i,o,l=null;this.state.BIGKIDS_DATA&&this.state.date&&(t=this.state.BIGKIDS_DATA.keyword,a=this.state.BIGKIDS_DATA.wordcloud,i=this.state.BIGKIDS_DATA.network,o=this.state.BIGKIDS_DATA.linechart,l=this.state.BIGKIDS_DATA.news);const c=document.getElementById("keyword_wrap"),p=document.getElementById("word_cloud"),h=document.getElementById("network_wrap"),u=document.getElementById("lineChart_wrap"),v=document.getElementById("news_table");new e(c,{date:this.state.date,KEYWORD_DATA:t,fetchData:this.fetchData.bind(this)}),new n(p,{WORD_CLOUD_DATA:a,renderWordCloud:this.renderWordCloud.bind(this)}),new r(h,{NETWORK_DATA:i,renderNetworkGraph:this.renderNetworkGraph.bind(this)}),new s(u,{LINE_CHART_DATA:o,renderLineChart:this.renderLineChart.bind(this)}),new d(v,{NEWS_DATA:l})}renderWordCloud(t){!function(t){if(!t)return null;const e=document.getElementById("WORD_CLOUD").offsetWidth;d3.layout.cloud().words(t.map((t=>({text:t.text,size:1.3*i[~~(10*Math.random())%i.length],color:t.color})))).padding(5).rotate((()=>90*~~(0*Math.random()))).fontSize((t=>t.size)).on("end",(function(t){d3.select("#WORD_CLOUD").append("svg").attr("viewBox",`0 0 ${e} ${e}`).append("g").attr("transform",`translate(${e/2}, ${e/2})`).selectAll("text").data(t).enter().append("text").style("font-size",(t=>t.size)).style("fill",(t=>t.color)).attr("text-anchor","middle").attr("transform",(t=>`translate(${[t.x,t.y]}) rotate(${t.rotate}) scale(0.9)`)).text((t=>t.text))})).start()}(t)}renderNetworkGraph(t){!function(t,e){if(!t||!e)return null;const n={createGraph:function(){const r=t.nodes.map((t=>Object.create(t))),a=e.map((t=>Object.create(t))),s=1.3*parseInt(document.getElementById("network_wrap").offsetWidth),d=t.nodes[0].id,i="#FF8E7E",o=d3.forceSimulation(r).force("link",d3.forceLink(a).id((t=>t.id))).force("charge",d3.forceManyBody().strength(-100)).force("center",d3.forceCenter(s/2,s/2)).force("collide",d3.forceCollide().radius((t=>15*t.value))),l=d3.select("#NETWORK_GRAPH").attr("viewBox",`0 0 ${s} ${s}`),c=l.append("g").attr("class","g-holder"),p=c.append("g").attr("stroke","#929292").selectAll("line").data(a).join("line").attr("stroke-linecap","round"),h=c.append("g").attr("class","circle-node-holder").selectAll("g").data(r).enter().append("g").each((function(t){d3.select(this).append("circle").attr("r",Math.min(9*t.value,30)).attr("fill",t.id===d?i:"white").attr("stroke",t.id===d?i:null).attr("stroke-width",(t=>Math.sqrt(t.value))),d3.select(this).append("text").text(t.id).attr("dy",6).style("text-anchor","middle").style("font-size","18px").style("font-weight",800).attr("class","node-label")})).call(n.drag(o));return o.on("tick",(()=>{p.attr("x1",(t=>t.source.x)).attr("y1",(t=>t.source.y)).attr("x2",(t=>t.target.x)).attr("y2",(t=>t.target.y)),h.attr("transform",(t=>`translate(${t.x}, ${t.y})`))})),l.node()},drag:function(t){return d3.drag().on("start",(function(e){d3.event.active||t.alphaTarget(.3).restart(),e.fx=e.x,e.fy=e.y})).on("drag",(function(t){t.fx=d3.event.x,t.fy=d3.event.y})).on("end",(function(e){d3.event.active||t.alphaTarget(0),e.fx=null,e.fy=null}))}};n.createGraph()}(t,function(t){if(!t)return null;t=t.nodes;const e=[];for(let n=0;n<t.length;n++){const{id:r,value:a}=t[n];for(let s=n;s<t.length;s++){const{id:n,value:d}=t[s];n!=r&&a===d&&e.push({source:r,target:n,value:a})}}return e}(t))}renderLineChart(t){return function(t){if(!t)return null;const e={type:"line",data:{labels:["","","","","","",""],datasets:[{label:"  조회수 ",data:t.map((t=>t.value)),borderColor:"#b8e4ff",backgroundColor:"#b8e4ff",borderJoinStyle:"round",tension:.1,pointBorderWidth:10,drawActiveElementsOnTop:!1,categoryPercentage:.8}]},options:{barPercentage:1,categoryPercentage:.8,plugins:{legend:{display:!1}},scales:{x:{display:!1},y:{display:!1}}}};return Chart.defaults.font.family="NanumSquareRound",Chart.defaults.font.size=20,new Chart(document.getElementById("myChart"),e)}(t)}async fetchData(t){this.setState({BIGKIDS_DATA:null});try{const e=await async function(t){try{const e=await async function(t,e={}){const{timeout:n=3500}=e,r=new AbortController,a=setTimeout((()=>r.abort()),n),s=await fetch(t,{...e,signal:r.signal});return clearTimeout(a),s}(`http://127.0.0.1:8000/api/${t}`,{timeout:3e3});return await e.json()}catch(t){throw new Error(alert("데이터를 불러오는데 실패했습니다. 새로고침후 다시 시도해 주세요."))}}(t);this.setState({date:t,BIGKIDS_DATA:e})}catch(t){console.log(t)}}}(document.getElementById("wrap"))})();