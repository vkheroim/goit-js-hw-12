import axios from 'axios';

export async function getPhotos(inputValue, currentPage) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const params = {
    key: '43217946-108b18fb86fe71a4135c25a24',
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
  };
  const url = `${BASE_URL}${END_POINT}`;
  const res = await axios.get(url, { params });
  return res.data;
}
