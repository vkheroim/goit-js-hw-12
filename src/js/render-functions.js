export function photosTemplate(photos) {
  return photos
    .map(
      photo => `<li class="gallery-item">
      <a class="gallery-link" href="${photo.largeImageURL}">
        <img class="gallery-image" src="${photo.webformatURL}" alt="${photo.tags}" />
      </a>
      <ul class="img-description">
        <li>
          <h3>Likes</h3>
          <p>${photo.likes}</p>
        </li>
        <li>
          <h3>Views</h3>
          <p>${photo.views}</p>
        </li>
        <li>
          <h3>Comments</h3>
          <p>${photo.comments}</p>
        </li>
        <li>
          <h3>Downloads</h3>
          <p>${photo.downloads}</p>
        </li>
      </ul>
    </li>`
    )
    .join('');
}
