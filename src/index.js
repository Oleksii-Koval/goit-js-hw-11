import './styles.css';
import { fetchPhotos } from './js/photo-api';
import { createMarkup} from './js/markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const elements = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadBtnEl: document.querySelector('.load-more'),
};

export const { formEl, galleryEl, loadBtnEl } = elements;

let page = 1;
loadBtnEl.classList.add('is-hidden');

formEl.addEventListener('submit', handlerSearch);
loadBtnEl.addEventListener('click', handlerLoad);

function handlerSearch(evt) {
  evt.preventDefault();
  const searchValue = elements.formEl.searchQuery.value.trim();
  page = 1;
  fetchPhotos(searchValue, page)
    .then(resp => {
      galleryEl.innerHTML = '';
      const response = resp.data.hits;

      if (response.length === 0) {
        noResults();
      } else if (response.length < 40) {
        showLoadMore(false);
        successSearch(resp);
      } else {
        successSearch(resp);
        showLoadMore(true)
      }
      
      galleryEl.insertAdjacentHTML('afterbegin', createMarkup(response))
      lightBox();
    })
    .catch((error) => console.log(error));
};

function handlerLoad() {
  const searchValue = elements.formEl.searchQuery.value.trim();
  page += 1;
  fetchPhotos(searchValue, page)
    .then(resp => {
      const response = resp.data.hits;
      if (response.length < 40) {
        showLoadMore(false)
        onEndOfResults()
      }
      galleryEl.insertAdjacentHTML('beforeend', createMarkup(response));
      lightBox();
      scrollDown();
      
    })
    .catch((error) => console.log(error));
};

function lightBox() {
  const gallery = new SimpleLightbox('.gallery a', {
    captionPosition: 'bottom',
    enableKeyboard: true,
    swipeClose: true,
    swipeTolerance: 50,
  });
  gallery.refresh()
};

function scrollDown() {
  const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

function successSearch(resp) {
  const totalHits = resp.data.totalHits;
  Notify.success(`Hooray! We found ${totalHits} images.`,
    {
      position: 'center-top',
      distance: '100px',
      width: '250px',
      clickToClose: true,
      timeout: 2500,
      cssAnimation: true,
      cssAnimationStyle: 'from-top',
    }
  );
};

function noResults() {
  loadBtnEl.classList.replace('load-more', 'is-hidden');
  Notify.failure("Sorry, there are no images matching your search query. Please try again.",
    {
      position: 'center-center',
      width: '400px',
      clickToClose: true,
      timeout: 5000,
      cssAnimation: true,
      cssAnimationStyle: 'from-top',
    }
  );
};

function onEndOfResults() {
  Notify.info("We're sorry, but you've reached the end of search results.",
    {
      position: 'center-top',
      width: '400px',
      clickToClose: true,
      timeout: 2000,
      cssAnimation: true,
      cssAnimationStyle: 'from-top',
    }
  );
}

function showLoadMore(show) {
  if (show) {
 loadBtnEl.classList.replace('is-hidden','load-more');
  } else {
 loadBtnEl.classList.replace('load-more', 'is-hidden');
  };
};

