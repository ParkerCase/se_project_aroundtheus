import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(".modal__image");
    this._previewTitle = this._popupElement.querySelector(".modal__card_title");
  }

  // Figure this out
  open({ title, url }) {
    this._previewImage.src = url.link;
    this._previewImage.alt = title.title;
    this._previewTitle.textContent = title.title;

    super.open();
  }

  close() {
    super.close();
  }
}

export default PopupWithImage;
