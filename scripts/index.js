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

const formEditElement = document.querySelector('.form-edit-profile');
const nameInput = formEditElement.querySelector('.form-edit-profile__name');
const jobInput = formEditElement.querySelector('.form-edit-profile__job');

const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');

const formAddElement = document.querySelector('.form-popup-add-card');
const titleInput = formAddElement.querySelector('.form-popup-add-card__title');
const imageInput = formAddElement.querySelector('.form-popup-add-card__image');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const cardsWrapperElement = document.querySelector('.elements');
const templateCardElement = document.querySelector('#element-template');

const popupElements = document.querySelectorAll('.popup');
const popupEditCardElement = document.querySelector('#popup-edit-profile');
const popupAddCardElement = document.querySelector('#popup-add-card');
const popupGalleryElement = document.querySelector('#popup-gallery');

const galleryImageElement = document.querySelector('.gallery__image');
const galleryCaptionElement = document.querySelector('.gallery__caption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

function setGallery(data) {
  const { name, link } = data;

  if (galleryImageElement.src !== link) galleryImageElement.src = '';
  galleryImageElement.src = link;
  galleryImageElement.alt = name;
  galleryCaptionElement.textContent = name;
}

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

function addPrependCard(item) {
  cardsWrapperElement.prepend(createCard(item));
}

function addAppendCard(item) {
  cardsWrapperElement.append(createCard(item));
}

function removeCard(cardElement) {
  cardElement.remove();
}

function updateCards() {
  initialCards.forEach(addAppendCard);
}

function handleFormEdit(evt) {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(popupEditCardElement);
}

function handleFormAddCard(evt) {
  evt.preventDefault();

  addPrependCard({
    name: titleInput.value,
    link: imageInput.value
  });
  evt.target.reset();
  closePopup(popupAddCardElement);
}

function handleEditButton() {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  openPopup(popupEditCardElement);
}

function handleAddCardButton() {
  openPopup(popupAddCardElement);
}

popupElements.forEach((popup) => {
  const closeButtonElement = popup.querySelector('.popup__close');

  if (!closeButtonElement) return;

  closeButtonElement.addEventListener('click', () => closePopup(popup));
});

updateCards();

buttonEditProfile.addEventListener('click', handleEditButton);
buttonAddCard.addEventListener('click', handleAddCardButton);

formEditElement.addEventListener('submit', handleFormEdit);
formAddElement.addEventListener('submit', handleFormAddCard);
