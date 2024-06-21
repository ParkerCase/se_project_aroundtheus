import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._deleteBtn = this._popupElement.querySelector(".modal__button_delete");
    this._deleteBtnText = this._deleteBtn.textContent;
  }

  handleDelete(handleDeleteSubmit) {
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  renderDeleting(isLoading, loadingTextContent = "Loading...") {
    if (isLoading) {
      this._deleteBtn.textContent = loadingTextContent;
    } else {
      this._deleteBtn.textContent = this._deleteBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleteSubmit();
    });
  }
}
