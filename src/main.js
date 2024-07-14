import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function searchPhoto(query) {
  const API_KEY = '44790936-a9a83b9ad64ff44b33786cafe';
  return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const gallery = document.querySelector(".gallery");

  if (!gallery) {
    console.error('Gallery element not found');
    return;
  }

  searchForm.addEventListener('submit', handleSearch);

  function handleSearch(event) {
    event.preventDefault();

    const form = event.currentTarget; // посилання на елемент форми
    const queryValue = form.elements.query.value.toLowerCase(); // значення, яке написав користувач

    searchPhoto(queryValue) // робимо запит на сервер та отримуємо відповідь
      .then((response) => {
        if (response.hits.length === 0) {
          iziToast.warning({
            title: 'No Images Found',
            message: 'Sorry, there are no images matching your search query. Please try again!',
          });
        } else {
          clearGallery();
          addImagesToGallery(response.hits);
        }
      })
      .catch(err => {
        iziToast.error({
          title: 'Error',
          message: `Something went wrong: ${err.message}`,
        });
      })
      .finally(() => form.reset());
  }

  function clearGallery() {
    gallery.innerHTML = '';
  }

  function addImagesToGallery(images) {
    const markup = createPhotoCard(images);
    gallery.insertAdjacentHTML("afterbegin", markup);
  }

  function createPhotoCard(arr) {
    return arr
      .map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}" onclick="event.preventDefault()">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
            width="360"
            height="200"
          />
          <ul class="gallery-info">
            <li  class="gallery-item-text"><p>Likes ${likes}</p></li>
            <li class="gallery-item-text"><p>Views ${views}</p></li>
            <li class="gallery-item-text"><p>Comments ${comments}</p></li>
            <li  class="gallery-item-text"><p>Downloads ${downloads}</p></li>
          </ul>
        </a>
      </li>`
      )
      .join('');
  }
});

let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
gallery.refresh();