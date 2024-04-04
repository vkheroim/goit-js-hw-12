import SimpleLightbox from 'simplelightbox'; // Імпорт бібліотеки для перегляду зображень
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createGalleryMarkup(arr) {
  const galleryList = document.querySelector('.gallery');
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
   <div class="galleryItem-wrapper">
        <div class="galleryCard-wrapper">
            <li class="gallery_items">
                <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" class="galleryItems-photo"></a>
                <div class="gallery-textWrapper">
                    <ul class="galleryItems-list">
                        <li class="galleryItem">
                            <h2>Likes</h2>
                            <p>${likes}</p>
                        </li>
                        <li class="galleryItem">
                            <h2>Views</h2>
                            <p>${views}</p>
                        </li>
                        <li class="galleryItem">
                            <h2>Comments</h2>
                            <p>${comments}</p>
                        </li>
                        <li class="galleryItem">
                            <h2>Downloads</h2>
                            <p>${downloads}</p>
                        </li>
                    </ul>
                </div>
                
            </li>
        </div>
    </div>`
    )
    .join('');

  galleryList.insertAdjacentHTML('afterbegin', markup); // Вставка розмітки в початок контейнера галереї
  let gallery = new SimpleLightbox('.gallery a', {
    // Ініціалізація SimpleLightbox
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
    widthRatio: 0.9,
    heightRatio: 0.8,
  });
  gallery.refresh(); // Оновлення галереї після додавання нових елементів
}
