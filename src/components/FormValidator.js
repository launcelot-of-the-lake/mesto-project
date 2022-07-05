class FormValidator {
  constructor(options, selector) {
    this._options = options;
    this._selector = selector;
  }

  enableValidation() {
    this._element = document.querySelector(this._selector);

    this._element.setAttribute('novalidate', '');
    this._setEventListeners();
  }

  _showInputError(
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

  _hideInputError(
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

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _isValid(formElement, inputElement, options) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, options);
    } else {
      this._hideInputError(formElement, inputElement, options);
    }
  }

  _toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    } = this._options;
    const inputList = Array.from(this._element.querySelectorAll(inputSelector));
    const buttonElement = this._element.querySelector(submitButtonSelector);

    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._toggleButtonState(inputList, buttonElement, { inactiveButtonClass });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._element, inputElement, { inputErrorClass, errorClass });
        this._toggleButtonState(inputList, buttonElement, { inactiveButtonClass });
      });
    });
  }
}

export default FormValidator;
