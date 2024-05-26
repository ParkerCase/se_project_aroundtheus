import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [...this._popupElement.querySelectorAll(".modal__input")];
  }

  _getInputValues() {
    this._formValue = {};
    this._inputList.forEach((input) => {
      this._formValue[input.name] = input.value;
    });

    return this._formValue;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._formValues = this._getInputValues();
      this._handleFormSubmit(this._formValues);
      this._popupForm.reset();
    });

    super.setEventListeners();
  }

  close() {
    super.close();
  }
}

export default PopupWithForm;
