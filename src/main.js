import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos } from './js/pixabay-api';
import { photosTemplate } from './js/render-functions';

//===============================змінні=================================
const searchForm = document.querySelector('.form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.btn');
const loader = document.querySelector('.loader');

let searchValue; // Змінна для зберігання значення введеного користувачем
let currentPage = 1; // Поточна сторінка результатів пошуку
let maxPages = 0; // Максимальна кількість сторінок результатів
const resultsPerPage = 15; // Кількість елементів на сторінці

// Створюємо об'єкт SimpleLightbox для галереї зображень
let lightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Подія, яка спрацьовує перед показом зображення в галереї
lightboxGallery.on('show.simplelightbox', function () {});

// Функція для перевірки статусу кнопки "Завантажити ще"
function checkLoadMoreButtonStatus() {
  if (currentPage >= maxPages) {
    hideLoadMoreButton(); // Ховаємо кнопку "Завантажити ще"
    iziToast.warning({
      // Повідомлення користувачеві про досягнення кінця результатів
      message: 'Вибачте, але ви дійшли до кінця результатів пошуку.',
      color: 'blue',
      position: 'topRight',
    });
  } else {
    showLoadMoreButton();
  }
}

// Функція для прокрутки сторінки
function scrollToTop() {
  const firstImageHeight =
    galleryContainer.firstChild.getBoundingClientRect().height; // Отримуємо висоту першого елемента в галереї
  console.log(firstImageHeight);
  scrollBy({
    top: firstImageHeight * 2,
    behavior: 'smooth',
  });
}

// Функція для показу кнопки "Завантажити ще"
function showLoadMoreButton() {
  return loadMoreButton.classList.remove('is-hidden');
}

// Функція для приховання кнопки "Завантажити ще"
function hideLoadMoreButton() {
  return loadMoreButton.classList.add('is-hidden');
}

// Функція для показу loader
function showLoader() {
  return loader.classList.remove('is-hidden'); // Видаляємо клас, який приховує прелоадер
}

// Функція для приховування loader
function hideLoader() {
  return loader.classList.add('is-hidden');
}

// default settings
hideLoader();
hideLoadMoreButton();

// Подія відправлення форми
searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  searchValue = e.target.elements.search.value.trim(); // Отримуємо значення, введене користувачем в поле пошуку
  if (searchValue === '') {
    return iziToast.warning({
      message: 'Будь ласка, заповніть поле!',
      color: 'red',
      position: 'topRight',
    });
  }
  galleryContainer.innerHTML = '';
  currentPage = 1;
  showLoader();
  try {
    const photosData = await getPhotos(searchValue, currentPage); // Отримання фотографій за введеним запитом
    maxPages = Math.ceil(photosData.totalHits / resultsPerPage); // Обчислення максимальної кількості сторінок результатів
    const photosMarkup = photosTemplate(photosData.hits); // Генерація розмітки для отриманих фотографій
    if (photosData.hits.length === 0) {
      iziToast.error({
        message:
          'На жаль, за вашим запитом не знайдено зображень. Будь ласка, спробуйте ще раз!',
        position: 'topRight',
        color: 'red',
      });
    } else {
      galleryContainer.insertAdjacentHTML('beforeend', photosMarkup); // Додавання розмітки фотографій до контейнера галереї
      lightboxGallery.refresh(); // Оновлення галереї зображень
      checkLoadMoreButtonStatus();
    }
  } catch (error) {
    iziToast.error({
      message:
        'На жаль, за вашим запитом не знайдено зображень. Будь ласка, спробуйте ще раз!',
      position: 'topRight',
      color: 'red',
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
});

// Подія кліку на кнопку "Завантажити ще"
loadMoreButton.addEventListener('click', async e => {
  showLoader();
  currentPage += 1;
  const photosData = await getPhotos(searchValue, currentPage); // Отримання фотографій для наступної сторінки
  const photosMarkup = photosTemplate(photosData.hits); // Генерація розмітки для отриманих фотографій
  galleryContainer.insertAdjacentHTML('beforeend', photosMarkup); // Додавання розмітки фотографій до контейнера галереї
  scrollToTop();
  lightboxGallery.refresh();
  hideLoader();
  checkLoadMoreButtonStatus();
});
