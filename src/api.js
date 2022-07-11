import { API_SERVER } from "../API_SERVER";

export async function fetchBigKidsData(date) {
  const TIME_OUT = { timeout: 10000 };
  const API_URL = `API_SERVER/${date}`;
  const MESSAGE = "데이터를 불러오는데 실패했습니다. 새로고침후 다시 시도해 주세요!";
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