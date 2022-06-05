import { openPopup, closePopup } from './modal.js';
import { addPrependCard, updateCards } from './card.js';
import { enableValidation, toggleButtonState } from './validate.js';
import { validationOptions } from './utils/constants.js';

const formEditElement = document.querySelector('#form-edit-profile');
const nameInput = formEditElement.name;
const jobInput = formEditElement.description;

const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');

const formAddElement = document.querySelector('#form-add-card');
const titleInput = formAddElement.title;
const imageInput = formAddElement.image;

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const popupEditCardElement = document.querySelector('#popup-edit-profile');
const popupAddCardElement = document.querySelector('#popup-add-card');

function handleFormEdit() {
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(popupEditCardElement);
}

function handleFormAddCard(evt) {
  addPrependCard({
    name: titleInput.value,
    link: imageInput.value
  });
  evt.target.reset();
  closePopup(popupAddCardElement);

  toggleButtonState(
    Array.from(evt.target.querySelectorAll(validationOptions.inputSelector)),
    evt.target.querySelector(validationOptions.submitButtonSelector),
    validationOptions
  );
}

function handleEditButton() {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  openPopup(popupEditCardElement);
}

function handleAddCardButton() {
  openPopup(popupAddCardElement);
}

buttonEditProfile.addEventListener('click', handleEditButton);
buttonAddCard.addEventListener('click', handleAddCardButton);

formEditElement.addEventListener('submit', handleFormEdit);
formAddElement.addEventListener('submit', handleFormAddCard);

updateCards();

enableValidation(validationOptions);
