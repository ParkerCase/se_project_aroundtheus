import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [...this._popupElement.querySelectorAll(".modal__input")];
    this._submitBtn = this._popupElement.querySelector(".modal__button_submit");
    this._submitBtnText = this._submitBtn.textContent;
  }

  renderLoading(isLoading, loadingTextContent = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingTextContent;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
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
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
    });

    super.setEventListeners();
  }

  close() {
    super.close();
  }
}

export default PopupWithForm;
