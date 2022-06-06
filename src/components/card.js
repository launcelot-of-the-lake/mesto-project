import { getCards, postCard, deleteCard, putLike, deleteLike } from './api.js';
import { getId } from './profile.js';
import { setGallery } from './gallery.js';
import { openPopup } from './modal.js';

const cardsWrapperElement = document.querySelector('.elements');
const templateCardElement = document.querySelector('#element-template');
const popupGalleryElement = document.querySelector('#popup-gallery');

function toggleFavorite(favoriteElement) {
  favoriteElement.classList.toggle('element__favorite_active');
}

function handleLinkImage(evt) {
  evt.preventDefault();

  const imageElement = evt.target;

  setGallery({
    name: imageElement.alt,
    link: imageElement.src
  });

  openPopup(popupGalleryElement);
}

function createCard({ _id: idCard, likes = [], name = '', link = '', owner = {} }) {
  const id = getId();
  const { _id: ownerId } = owner;
  let isLiked = likes.some((like) => like._id === id);

  const cardElement = templateCardElement.content.cloneNode(true);
  const imageLinkElement = cardElement.querySelector('.element__image-link');
  const imageElement = cardElement.querySelector('.element__image');
  const imageTitleElement = cardElement.querySelector('.element__title');
  const likeElement = cardElement.querySelector('.element__favorite-counter');

  const favoriteButton = cardElement.querySelector('.element__favorite');
  const removeButton = cardElement.querySelector('.element__remove');
  const linkImage = cardElement.querySelector('.element__image-link');

  imageLinkElement.href = link;
  imageElement.src = link;
  imageElement.alt = name;
  imageTitleElement.textContent = name;
  likeElement.textContent = likes.length;

  if (isLiked) toggleFavorite(favoriteButton);

  favoriteButton.addEventListener('click', () => {
    if (isLiked) {
      deleteLike(idCard)
        .then(({ likes = [] }) => {
          isLiked = false;
          likeElement.textContent = likes.length;
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      putLike(idCard)
        .then(({ likes = [] }) => {
          isLiked = true;
          likeElement.textContent = likes.length;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    toggleFavorite(favoriteButton);
  });

  if (id !== ownerId) {
    removeButton.remove();
  } else {
    removeButton.addEventListener('click', (evt) => {
      const buttonElement = evt.currentTarget;
      const parrentElement = buttonElement.closest('.element');

      deleteCard(idCard)
        .then(() => {
          removeCard(parrentElement);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  linkImage.addEventListener('click', handleLinkImage);

  return cardElement;
}

export function addPrependCard(item) {
  cardsWrapperElement.prepend(createCard(item));
}

function addAppendCard(item) {
  cardsWrapperElement.append(createCard(item));
}

function removeCard(cardElement) {
  cardElement.remove();
}

export function initCards() {
  return new Promise((resolve, reject) => {
    getCards()
      .then((cards = []) => {
        cards.forEach(addAppendCard);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateCard(name, link) {
  return new Promise((resolve, reject) => {
    postCard(name, link)
      .then((data) => {
        addPrependCard(data);
        resolve();
      })
      .catch((err) => {
        reject(err)
      });
  });
}
