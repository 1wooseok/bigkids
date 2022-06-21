export async function fetchBigKidsData(date) {
  console.log('Fetch Start...');
  try {
    const today = new Date().toISOString().substring(0, 10);
    const res = await fetch(`http://127.0.0.1:8000/api/${date || today}`, {
    // const res = await fetch(`http://127.0.0.1:8000/api/2022-05-06`, {
    // const res = await fetchWithTimeout(`http://114.30.164.217:8000/api/${date || today}`, {
    // const res = await fetchWithTimeout(`http://220.149.53.11:8080/api/${date}`, {  
      timeout: 3000,
    });
    const json = await res.json();
    console.log({json})
    return json;
  } catch (err) {
    throw new Error(
      alert("데이터를 불러오는데 실패했습니다. 새로고침후 다시 시도해 주세요.")
    );
  }
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 3500 } = options;

  const abortController = new AbortController();
  const id = setTimeout(() => abortController.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: abortController.signal,
  });
  clearTimeout(id);
  return response;
}
