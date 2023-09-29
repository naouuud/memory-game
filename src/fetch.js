async function fetchMedia(count) {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=bUrjOxOkPWX1ZHK5sGsZSOShGQuqliqicKl74csl&count=${count}`,
    {
      method: "GET",
    }
  );
  return response.json();
}

export default async function fetchImages(count) {
  const list = await fetchMedia(count);
  const filteredList = list.filter((item) => /\.jpg$/.test(item["url"]));
  const urlList = filteredList.map((item) => item["url"]);
  while (filteredList.length < count) {
    const [extraImage] = await fetchMedia(1);
    if (
      /\.jpg$/.test(extraImage["url"]) &&
      !urlList.includes(extraImage["url"])
    ) {
      filteredList.push(extraImage);
      urlList.push(extraImage["url"]);
    }
  }
  return filteredList;
}
