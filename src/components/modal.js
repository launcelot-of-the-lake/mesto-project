const popupElements = document.querySelectorAll('.popup');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  toggleEscape()
  document.addEventListener('keydown', handleEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupElements.forEach((popup) => {
  const closeButtonElement = popup.querySelector('.popup__close');
  const contentElement = popup.querySelector('.popup__container');

  popup.addEventListener('mousedown', () => closePopup(popup));
  contentElement.addEventListener('mousedown', (evt) => evt.stopPropagation());
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') closePopup(popup);
  });

  if (!closeButtonElement) return;

  closeButtonElement.addEventListener('click', () => closePopup(popup));
});
