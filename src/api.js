export async function fetchBigKidsData(date) {
    try {
      const today = new Date().toISOString().substring(0, 10);
      const res = await fetch(`http://toch.kr:8000/api/${date || today}`);
      const json = await res.json();
      return json;
    } catch (err) {
      throw new Error(
        alert("데이터를 불러오는데 실패했습니다. 새로고침후 다시 시도해 주세요.")
      );
    }
  }