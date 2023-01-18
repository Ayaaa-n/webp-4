export async function fetchImages(series) {
  const response = await fetch(
    `https://www.amiiboapi.com/api/amiibo/?amiiboSeries=${series}`
  );
  const data = await response.json();
  return data.amiibo;
}
