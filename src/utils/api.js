import { TIME_OUT, MESSAGE } from "./constant";
import { API_SERVER } from "../../API_SERVER.js";

const cache = {};

async function request(url) {
  if (cache[url]) {
    return cache[url];
  }

  const res = await fetchWithTimeout(url, TIME_OUT);

  if (res.ok) {
    const json = await res.json();
    cache[url] = json;
    return json;
  }

  throw new Error(alert(MESSAGE));
}

async function fetchWithTimeout(url, options = {}) {
  const { timeout } = options;
  const abortController = new AbortController();
  const id = setTimeout(() => abortController.abort(), timeout);
  const response = await fetch(url, {
    ...options,
    signal: abortController.signal,
  });
  clearTimeout(id);
  return response;
}

export async function fetchBigKidsData(date) {
  return request(`${API_SERVER}/${date}`);
}