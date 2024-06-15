import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector, handleDelete) {
    super({ popupSelector });
    this._deleteButton = document.querySelector(".modal__button_delete");
    this._handleDelete = handleDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete;
    });
  }
}
