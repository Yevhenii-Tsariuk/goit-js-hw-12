
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { searchPhoto } from "./js/pixabay-api.js";
import { renderImages, clearGallery } from "./js/render-functions.js";

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const gallery = document.querySelector(".gallery");
  const loader = document.querySelector('.loader');
  const loadMoreBtn = document.querySelector('.load-more');

  let currentPage = 1;
  let currentQuery = '';

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  searchForm.addEventListener('submit', handleSearch);
  loadMoreBtn.addEventListener('click', handleLoadMore);

  async function handleSearch(event) {
    event.preventDefault();

    const form = event.currentTarget;
    currentQuery = form.elements.query.value.toLowerCase();
    currentPage = 1;

    clearGallery(gallery);
    loadMoreBtn.classList.add('hidden');
    showLoader();

    try {
      const response = await searchPhoto(currentQuery, currentPage);
      const { hits, totalHits } = response;

      if (hits.length === 0) {
        iziToast.warning({
          position: 'center',
            messageSize: '16',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            backgroundColor: '#EF4040',
            messageColor: '#FAFAFB',
            maxWidth: 450
        });
      } else {
        renderImages(gallery, hits);
        lightbox.refresh();

        if (hits.length < totalHits) {
          loadMoreBtn.classList.remove('hidden');
        }
      }
    } catch (err) {
      iziToast.error({
        position: 'center',
          messageSize: '16',
          title: 'Error',
          message: `Something went wrong: ${err.message}`,
          backgroundColor: '#EF4040',
          messageColor: '#FAFAFB',
      });
    } finally {
      form.reset();
      hideLoader();
    }
  }

  async function handleLoadMore() {
    currentPage += 1;
    showLoader();

    try {
      const response = await searchPhoto(currentQuery, currentPage);
      const { hits, totalHits } = response;

      renderImages(gallery, hits);
      lightbox.refresh();

      if (currentPage * 15 >= totalHits) {
        loadMoreBtn.classList.add('hidden');
        iziToast.info({
          position: 'center',
          messageSize: '16',
          message: "We're sorry, but you've reached the end of search results.",
          backgroundColor: '#FFA000',
          messageColor: '#FAFAFB',
        });
      }
      
      const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
      
    } catch (err) {
      iziToast.error({
        position: 'center',
        title: 'Error',
        messageSize: '16',
        message: `Something went wrong: ${err.message}`,
        backgroundColor: '#EF4040',
          messageColor: '#FAFAFB',
      });
    } finally {
      hideLoader();
    }
  }

  function showLoader() {
    loader.classList.add('visible');
  }

  function hideLoader() {
    loader.classList.remove('visible');
  }
});













