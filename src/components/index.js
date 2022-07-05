// import { openPopup, closePopup } from './modal.js';
// import {
//   initProfile,
//   getAvatar,
//   getName,
//   getAbout,
//   updateProfile,
//   updateAvatar
// } from './profile.js';
// import { addAppendCard, addPrependCard  } from './card.js';
// import { enableValidation, toggleButtonState } from './validate.js';
// import { validationOptions } from './utils/constants.js';
import Api from './Api.js';
import { apiOptions } from './utils/constants.js';
import UserInfo from './UserInfo.js';

const api = new Api(apiOptions);
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__description',
  api
});

userInfo.initialize();

// const formEditElement = document.querySelector('#form-edit-profile');
// const nameInput = formEditElement.name;
// const jobInput = formEditElement.description;

// const formEditAvatar = document.querySelector('#form-edit-avatar');
// const avatarInput = formEditAvatar.avatar;

// const formAddElement = document.querySelector('#form-add-card');
// const titleInput = formAddElement.title;
// const imageInput = formAddElement.image;

// const buttonEditProfile = document.querySelector('.profile__edit-button');
// const buttonAvatar = document.querySelector('.profile__avatar');
// const buttonAddCard = document.querySelector('.profile__add-button');

// const popupEditCardElement = document.querySelector('#popup-edit-profile');
// const popupEditAvatarElement = document.querySelector('#popup-edit-avatar');
// const popupAddCardElement = document.querySelector('#popup-add-card');

// function initCards() {
//   return new Promise((resolve, reject) => {
//     getCards()
//       .then((cards = []) => {
//         cards.forEach(addAppendCard);
//         resolve();
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// function updateCard(name, link) {
//   return new Promise((resolve, reject) => {
//     postCard(name, link)
//       .then((data) => {
//         addPrependCard(data);
//         resolve();
//       })
//       .catch((err) => {
//         reject(err)
//       });
//   });
// }

// function handleFormEdit(evt) {
//   const submitButton = evt.target.querySelector(validationOptions.submitButtonSelector);

//   submitButton.textContent = 'Сохранение...';
//   updateProfile(nameInput.value, jobInput.value)
//     .then(() => {
//       closePopup(popupEditCardElement);
//     })
//     .catch((err) => {
//       console.error(err);
//     })
//     .finally(() => {
//       submitButton.textContent = 'Сохранить';
//     });
// }

// function handleAvatarEdit(evt) {
//   const submitButton = evt.target.querySelector(validationOptions.submitButtonSelector);

//   submitButton.textContent = 'Сохранение...';
//   updateAvatar(avatarInput.value)
//     .then(() => {
//       closePopup(popupEditAvatarElement);
//     })
//     .catch((err) => {
//       console.error(err);
//     })
//     .finally(() => {
//       submitButton.textContent = 'Сохранить';
//     });
// }

// function handleFormAddCard(evt) {
//   const submitButton = evt.target.querySelector(validationOptions.submitButtonSelector);

//   submitButton.textContent = 'Сохранение...';
//   updateCard(titleInput.value, imageInput.value)
//     .then(() => {
//       evt.target.reset();
//       closePopup(popupAddCardElement);

//       toggleButtonState(
//         Array.from(evt.target.querySelectorAll(validationOptions.inputSelector)),
//         submitButton,
//         validationOptions
//       );
//     })
//     .catch((err) => {
//       console.error(err);
//     })
//     .finally(() => {
//       submitButton.textContent = 'Сохранить';
//     });
// }

// function handleEditButton() {
//   nameInput.value = getName();
//   jobInput.value = getAbout();

//   openPopup(popupEditCardElement);
// }

// function handleAvatarEditButton() {
//   avatarInput.value = getAvatar();

//   openPopup(popupEditAvatarElement);
// }

// function handleAddCardButton() {
//   openPopup(popupAddCardElement);
// }

// buttonEditProfile.addEventListener('click', handleEditButton);
// buttonAvatar.addEventListener('click', handleAvatarEditButton);
// buttonAddCard.addEventListener('click', handleAddCardButton);

// formEditElement.addEventListener('submit', handleFormEdit);
// formEditAvatar.addEventListener('submit', handleAvatarEdit);
// formAddElement.addEventListener('submit', handleFormAddCard);

// Promise.all([initProfile(), initCards()]).catch((err) => {
//   console.error(err);
// });

// enableValidation(validationOptions);
