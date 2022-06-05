import { setGallery } from './gallery.js';
import { openPopup } from './modal.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

const cardsWrapperElement = document.querySelector('.elements');
const templateCardElement = document.querySelector('#element-template');
const popupGalleryElement = document.querySelector('#popup-gallery');

function handleFavoriteButton(evt) {
  const buttonElement = evt.currentTarget;

  buttonElement.classList.toggle('element__favorite_active');
}

function handleRemoveButton(evt) {
  const buttonElement = evt.currentTarget;
  const parrentElement = buttonElement.closest('.element');

  removeCard(parrentElement);
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

function createCard(item) {
  const { name, link } = item;
  const cardElement = templateCardElement.content.cloneNode(true);
  const imageLinkElement = cardElement.querySelector('.element__image-link');
  const imageElement = cardElement.querySelector('.element__image');
  const imageTitleElement = cardElement.querySelector('.element__title');

  const favoriteButton = cardElement.querySelector('.element__favorite');
  const removeButton = cardElement.querySelector('.element__remove');
  const linkImage = cardElement.querySelector('.element__image-link');

  imageLinkElement.href = link;
  imageElement.src = link;
  imageElement.alt = name;
  imageTitleElement.textContent = name;

  favoriteButton.addEventListener('click', handleFavoriteButton);
  removeButton.addEventListener('click', handleRemoveButton);
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

export function updateCards() {
  initialCards.forEach(addAppendCard);
}
