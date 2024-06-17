import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector, handleDeleteClick) {
    super({ popupSelector });
    this._deleteButton = document.querySelector(".modal__button_delete");
    this._handleDeleteClick = handleDeleteClick;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick;
    });
  }
}
