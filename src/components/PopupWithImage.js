import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(".modal__image");
    this._previewTitle = this._popupElement.querySelector(".modal__card_title");
  }

  open(data) {
    this._previewImage.src = data.url;
    this._previewImage.alt = data.title;
    this._previewTitle.textContent = data.title;

    super.open();
  }

  close() {
    super.close();
  }
}

export default PopupWithImage;
