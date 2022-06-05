import { openPopup, closePopup } from './modal.js';
import { addPrependCard, updateCards } from './card.js';
import { enableValidation } from './validate.js';

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

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input-error_active',
  errorClass: 'form__input_type_error'
});
