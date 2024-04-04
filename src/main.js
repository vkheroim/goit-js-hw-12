import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

import onSearch from './js/pixabay-api'; // Імпорт функції для виконання пошуку

const form = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', onFormSubmit);
loader.hidden = true; // Приховання елемента завантаження за замовчуванням

function onFormSubmit(evt) {
  evt.preventDefault();
  galleryList.innerHTML = ''; // Очищення списку галереї перед новим запитом
  loader.hidden = false; // Відображення елемента завантаження
  const { searchRequest } = evt.currentTarget.elements; // Отримання значення пошукового запиту з форми
  let searchQuery = searchRequest.value; // Збереження пошукового запиту
  onSearch(searchQuery);
  form.reset();
}
