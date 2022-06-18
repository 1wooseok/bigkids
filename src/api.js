export async function fetchBigKidsData(date) {
  try {
    const today = new Date().toISOString().substring(0, 10);
    const res = await fetchWithTimeout(`http://toch.kr:8000/api/${date || today}`, {
      timeout: 3000,
    });
    const json = await res.json();
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
