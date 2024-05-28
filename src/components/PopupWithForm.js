import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [...this._popupElement.querySelectorAll(".modal__input")];
  }

  _getInputValues() {
    const formValue = {};
    this._inputList.forEach((input) => {
      formValue[input.name] = input.value;
    });

    return formValue;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formValues = this._getInputValues();
      this._handleFormSubmit(formValues);
      this._popupForm.reset();
    });

    super.setEventListeners();
  }

  close() {
    super.close();
  }
}

export default PopupWithForm;
