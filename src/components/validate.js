function showInputError(
  formElement,
  inputElement,
  errorMessage,
  {
    errorClass,
    inputErrorClass
  }
) {
  inputElement.classList.add(errorClass);

  const formError = inputElement.nextElementSibling;
  formError.textContent = errorMessage;
  formError.classList.add(inputErrorClass);
}

function hideInputError(
  formElement,
  inputElement,
  {
    errorClass,
    inputErrorClass
  }
) {
  inputElement.classList.remove(errorClass);

  const formError = inputElement.nextElementSibling;
  formError.classList.remove(inputErrorClass);
  formError.textContent = '';
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function isValid(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(
  formElement,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, { inactiveButtonClass });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, { inputErrorClass, errorClass });
      toggleButtonState(inputList, buttonElement, { inactiveButtonClass });
    });
  });
}

export function enableValidation ({
  formSelector,
  ...options
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.setAttribute('novalidate', '');

    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}
