import axios from "axios"
const BASE_URL = "https://pixabay.com/api/";
const API = "28460995-5acfdb805ab0c27f2bf717abb";


export async function loadImages(query, page = 1, perPage = 15) {
  const params = new URLSearchParams({
    key: API,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page,
    per_page: perPage,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}
