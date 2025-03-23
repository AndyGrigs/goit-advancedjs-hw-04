import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createPthotsHtml } from './js/render-functions';
import { loadImages } from './js/pixabay-api';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('#loader'),
  loadMoreBtn: document.querySelector('#load-more'),
};

let lightbox = null;
let currentQuery = '';
let currentPage = 1;
const perPage = 5;
let totalHits = 0;

refs.loadMoreBtn.style.display = 'none';

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  currentQuery = e.currentTarget.elements.search.value.trim();

  if (!currentQuery) {
    iziToast.warning({
      title: 'Stop!',
      message: 'The field must be filled up!!!',
    });
    return;
  }

  resetSearch();
  showLoader();

  try {
    const data = await loadImages(currentQuery, currentPage, perPage);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No results!',
        message: 'Sorry, no images match your query. Try again!',
      });
      return;
    }

    totalHits = data.totalHits;
    refs.gallery.innerHTML = createPthotsHtml(data.hits);
    initializeLightbox();

    if (data.hits.length < perPage || totalHits <= perPage) {
      refs.loadMoreBtn.style.display = 'none';
    } else {
      refs.loadMoreBtn.style.display = 'block';
      setLoadMoreButtonState(false);
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
}

async function onLoadMore() {
  setLoadMoreButtonState(true);
  showLoader();
  currentPage += 1;

  try {
    const data = await loadImages(currentQuery, currentPage, perPage);
    hideLoader();

    if (data.hits.length === 0) {
      refs.loadMoreBtn.style.display = 'none';
      iziToast.warning({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }

    const imagesHtml = createPthotsHtml(data.hits);
    refs.gallery.insertAdjacentHTML('beforeend', imagesHtml);
    lightbox.refresh();
    smoothScroll();

    if (currentPage * perPage >= totalHits) {
      refs.loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End of results',
        message: "You've reached the end of available images.",
      });
    } else {
      setLoadMoreButtonState(false);
    }
  } catch (error) {
    hideLoader();
    setLoadMoreButtonState(false);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
}

function resetSearch() {
  currentPage = 1;
  totalHits = 0;
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';
  refs.form.reset();
}

function showLoader() {
  refs.loader.classList.add('visible');
}

function hideLoader() {
  refs.loader.classList.remove('visible');
}

function initializeLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

function smoothScroll() {
  const { height } = refs.gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

function setLoadMoreButtonState(isLoading) {
  if (isLoading) {
    refs.loadMoreBtn.disabled = true;
    refs.loadMoreBtn.textContent = 'Loading...';
  } else {
    refs.loadMoreBtn.disabled = false;
    refs.loadMoreBtn.textContent = 'Load more';
  }
}
