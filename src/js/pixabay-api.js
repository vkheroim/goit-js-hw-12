import iziToast from 'izitoast'; // Імпорт бібліотеки для відображення сповіщень
import 'izitoast/dist/css/iziToast.min.css';

import { createGalleryMarkup } from './render-functions'; // Імпорт функції для створення розмітки галереї

export default function onSearch(searchQuery) {
  const KEY_API = '43217946-108b18fb86fe71a4135c25a24'; // Ключ API
  const BASE_URL = 'https://pixabay.com/api/'; // Базова URL-адреса API
  const searchParams = new URLSearchParams({
    // Параметри пошуку
    key: KEY_API,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  fetch(`${BASE_URL}?${searchParams}`) // Виконання HTTP-запиту
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText); // Обробка помилок HTTP-відповіді
      }
      return response.json();
    })
    .then(data => {
      if (!data.total) {
        // Перевірка наявності результатів пошуку
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message:
            'Вибачте, за вашим пошуковим запитом не знайдено зображень. Спробуйте ще раз!',
        });
      }
      createGalleryMarkup(data.hits); // Створення розмітки галереї з отриманими даними
    })
    .catch(err => {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: `Упс! Щось пішло не так!`,
      });
    })
    .finally(() => (loader.hidden = true)); // Приховання елемента завантаження після завершення запиту
}
