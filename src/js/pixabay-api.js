import axios from 'axios';

const API_KEY = '44790936-a9a83b9ad64ff44b33786cafe';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

async function searchPhoto(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`;
  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Error(response.status);
  }
  return response.data;
}

export { searchPhoto };
