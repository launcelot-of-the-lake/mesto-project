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

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const elementsCardWrapper = document.querySelector('.elements');

const popupElements = document.querySelectorAll('.popup');

const galleryImage = document.querySelector('.gallery__image');
const galleryCaption = document.querySelector('.gallery__caption');

function openPopup(id) {
  const popup = document.querySelector(`#${id}`);

  if (!popup) return;

  popup.classList.add('popup_opened');
  setTimeout(() => popup.classList.add('popup_visible'), 0);
}

function closePopup(id) {
  const popup = document.querySelector(`#${id}`);

  if (!popup) return;

  popup.classList.remove('popup_visible');
  popup.addEventListener('transitionend', () =>
    (popup.classList.remove('popup_opened')), { once: true });
}

function formEditSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup('popup-edit-profile');
}

function formAddCardSubmitHandler(evt) {
  evt.preventDefault();

  addCard({
    name: titleInput.value,
    link: imageInput.value
  });
  evt.target.reset();
  closePopup('popup-add-card');
}

function handleEditButton() {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  openPopup('popup-edit-profile');
}

function handleAddCardButton() {
  openPopup('popup-add-card');
}

function setGallery(data) {
  const { name, link } = data;

  galleryImage.src = link;
  galleryCaption.textContent = name;
}

function setEventsCard(card) {
  const favoriteButton = card.querySelector('.element__favorite');
  const removeButton = card.querySelector('.element__remove');
  const linkImage = card.querySelector('.element__image-link');

  favoriteButton.addEventListener('click', handleFavoriteButton);
  removeButton.addEventListener('click', handleRemoveButton);
  linkImage.addEventListener('click', handleLinkImage);
}

function handleFavoriteButton(evt) {
  const button = evt.currentTarget;

  button.classList.toggle('element__favorite_active');
}

function handleRemoveButton(evt) {
  const button = evt.currentTarget;
  const parrent = button.closest('.element');

  parrent.remove();
}

function handleLinkImage(evt) {
  evt.preventDefault();

  const image = evt.target;

  setGallery({
    name: image.alt,
    link: image.src
  });
  openPopup('popup-gallery');
}

function addCard(data) {
  elementsCardWrapper.insertAdjacentHTML(
    'afterbegin',
    templateCard(data)
  );

  const card = document.querySelector('.element');
  setEventsCard(card);
}

function updateCards() {
  elementsCardWrapper.textContent = '';

  elementsCardWrapper.insertAdjacentHTML(
    'beforeend',
    initialCards.map(templateCard).join('')
  );

  const cardElements = document.querySelectorAll('.element');
  cardElements.forEach(setEventsCard);
}

function templateCard(data) {
  const { name, link } = data;

  return (
    `
    <article class="element">
      <a class="element__image-link" href="${link}" target="_blank">
        <img class="element__image" src="${link}" alt="${name}">
      </a>

      <footer class="element__footer">
        <h3 class="element__title">${name}</h3>

        <button class="element__favorite" type="button" title="Добавить в избранное">
          <svg class="element__favorite-icon" width="22" height="19" viewBox="0 0 22 19" fill="none">
            <path d="M19.7717 2.21518L19.7744 2.21779C21.7404 4.14248 21.7442 7.30216 19.7717 9.25255L10.9804 17.9453L2.21428 9.27757C1.27432 8.32745 0.75 7.0739 0.75 5.74496C0.75 4.4081 1.25733 3.15857 2.21143 2.21517L2.21144 2.21518L2.21408 2.21254C4.16486 0.264365 7.37312 0.260595 9.35012 2.23477L9.35011 2.23478L9.35274 2.23737L10.453 3.32531L10.9857 3.85202L11.513 3.31996L12.6105 2.21262C14.5865 0.26161 17.7969 0.262461 19.7717 2.21518Z" stroke="black" stroke-width="1.5"/>
          </svg>
        </button>
      </footer>

      <button class="element__remove">
        <img class="element__remove-icon" src="images/trash.svg" alt="">
      </button>
    </article>
    `
  );
}

popupElements.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');

  if (!closeButton || !popup.id) return;

  closeButton.addEventListener('click', () => closePopup(popup.id));
});

updateCards();

editButton.addEventListener('click', handleEditButton);
addCardButton.addEventListener('click', handleAddCardButton);

formEditElement.addEventListener('submit', formEditSubmitHandler);
formAddElement.addEventListener('submit', formAddCardSubmitHandler);
