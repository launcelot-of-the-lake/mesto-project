const popupElements = document.querySelectorAll('.popup');

function handleEscape(evt) {
  if (evt.code !== 'Escape') return;

  const currentPopup = document.querySelector('.popup_opened');
  closePopup(currentPopup);
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

popupElements.forEach((popup) => {
  const closeButtonElement = popup.querySelector('.popup__close');
  const contentElement = popup.querySelector('.popup__container');

  popup.addEventListener('mousedown', () => closePopup(popup));
  contentElement.addEventListener('mousedown', (evt) => evt.stopPropagation());

  if (!closeButtonElement) return;

  closeButtonElement.addEventListener('click', () => closePopup(popup));
});
